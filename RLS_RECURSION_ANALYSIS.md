# RLS Infinite Recursion Analysis

## Executive Summary

Your Supabase database has multiple RLS policies that create circular dependencies, causing infinite recursion errors during user authentication. This document explains the technical details of the problem and how the provided fix resolves it.

---

## Problem Deep Dive

### What is Row Level Security (RLS)?

RLS is a PostgreSQL feature that allows you to define policies that control which rows users can access. In Supabase, RLS policies are evaluated every time a user performs a database operation (SELECT, INSERT, UPDATE, DELETE).

### The Recursion Pattern

The recursion occurs when:

1. **User attempts to authenticate** (query profiles table to verify account)
2. **Supabase evaluates RLS policies** on the profiles table
3. **A policy on profiles table queries the profiles table** to check user role
4. **This triggers RLS policy evaluation again** on the same table
5. **The cycle repeats infinitely** = infinite recursion error

### Current Problematic Policies

#### Example 1: Direct Recursion on Profiles Table

```sql
CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles  -- <-- QUERIES profiles TABLE
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
```

**Why this causes recursion:**
- When Supabase evaluates this policy during user login (querying profiles table)
- It executes: `SELECT FROM profiles WHERE id = auth.uid()`
- This SELECT on profiles triggers the same policy again
- The policy needs to check if the user is admin
- Which requires querying profiles table again
- Infinite loop!

#### Example 2: Indirect Recursion through Other Tables

```sql
CREATE POLICY "Beneficiaries can view own data"
  ON beneficiaries FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM profiles  -- <-- QUERIES profiles TABLE
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
```

**Why this causes recursion (during login):**
1. User logs in, triggers auth token check
2. Auth system needs to fetch user's profiles record
3. Supabase evaluates policies on profiles table
4. Policy on profiles queries profiles (direct recursion)

---

## Technical Timeline of the Error

### Sequence of Events During Login:

```
1. User submits login credentials
   ↓
2. Supabase auth verifies password
   ↓
3. Supabase queries "SELECT * FROM profiles WHERE id = $1"
   ↓
4. RLS evaluates "Admins can view all profiles" policy
   ↓
5. Policy executes: "SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'"
   ↓
6. This SELECT on profiles triggers RLS evaluation again
   ↓
7. Back to step 4 → INFINITE LOOP
   ↓
8. Database times out and returns:
   "infinite recursion detected in policy for relation \"profiles\""
```

---

## Why Other Policies Also Cause Problems

Even policies on OTHER tables can trigger the recursion when:

1. **Beneficiaries table policy queries profiles**:
   - During user lookup, Supabase might check beneficiaries table
   - The policy queries profiles for admin check
   - This can cascade to profiles table recursion

2. **Vendors table policy queries profiles**:
   - Similar issue when accessing vendor data

3. **All policies with role checks query profiles**:
   - Any policy that checks `role = 'admin'` via profiles query can trigger the issue

---

## The Fix: Breaking the Recursion

### Core Strategy

**Remove all recursive queries from RLS policies.**

Instead of:
```sql
-- BAD: Queries profiles table
WHERE EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
```

Use:
```sql
-- GOOD: Direct comparison, no table query
WHERE user_id = auth.uid()
```

### How the Fix Works

#### Removed Policies (Recursive)

1. **Admins can view all profiles** (ON profiles)
   - Queries profiles table during profiles table policy evaluation
   - No safe way to check role without recursion

2. **All "Admins can manage X"** policies
   - All query profiles table for role check
   - Safe removal because admin functionality can be implemented at app level

3. **All admin/role-check policies on other tables**
   - All indirectly cause profiles table recursion
   - Simplify to user_id-based access control

#### New Policies (Non-Recursive)

1. **Beneficiaries can view own data**
   ```sql
   USING (user_id = auth.uid())  -- Simple comparison, no table queries
   ```

2. **Vendors can view own data**
   ```sql
   USING (user_id = auth.uid())  -- Simple comparison, no table queries
   ```

3. **Anyone can view active programs**
   ```sql
   USING (status = 'active')  -- Status column check only, no joins
   ```

4. **Beneficiaries can view own vouchers**
   ```sql
   USING (
     beneficiary_id IN (
       SELECT id FROM beneficiaries WHERE user_id = auth.uid()
     )
   )
   ```
   - Queries beneficiaries table (NOT profiles)
   - Beneficiaries table has no recursive policy checks
   - Safe because it breaks the circular dependency

### Why This Works

The key insight: **We never query the profiles table in any policy.**

Since profiles table policies don't reference profiles table:
- No circular dependency
- No infinite recursion
- Clean base case for recursion to terminate

---

## Policy Comparison: Before vs After

### Profiles Table

**BEFORE (Problematic):**
```sql
-- This causes recursion
CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );
```

**AFTER (Fixed):**
```sql
-- Only "Users can view own profile" policy remains
-- It uses direct comparison, no table queries
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);
```

### Beneficiaries Table

**BEFORE (Problematic):**
```sql
CREATE POLICY "Beneficiaries can view own data"
  ON beneficiaries FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM profiles  -- <-- Causes recursion
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
```

**AFTER (Fixed):**
```sql
CREATE POLICY "Beneficiaries can view own data"
  ON beneficiaries FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());  -- Only non-recursive check
```

---

## Impact Analysis

### What Still Works

✓ Users can log in successfully
✓ Users can view their own profile
✓ Beneficiaries can view their own data
✓ Vendors can view their own data
✓ Users can view active voucher programs
✓ All user-specific data access works

### What Changes

✗ Admin users cannot use RLS for privileged access
✗ Admin access must be implemented at application level
✗ Cannot query all profiles/beneficiaries/vendors through RLS

### Admin Functionality

After the fix, admin features must be implemented using:

1. **Application-level checks** (Frontend/Backend)
   ```javascript
   // Check if user is admin before allowing operation
   if (user.role !== 'admin') {
     throw new Error('Unauthorized');
   }
   // Proceed with admin operation
   ```

2. **Service Role Key** (Backend only)
   ```javascript
   // Use Supabase service role key (never expose to frontend)
   const { data } = await supabase.from('profiles')
     .select('*')  // No RLS restrictions with service role
     .using('service_role_key');
   ```

3. **Custom Policies** (After system stabilizes)
   - Add boolean `is_admin` column to profiles
   - Use: `USING (is_admin = true)` (no table query needed)
   - Or use JWT claims instead

---

## Migration Strategy

### Step 1: Immediate Fix (Current)
- Remove all recursive policies
- Install non-recursive policies
- Restore user authentication

### Step 2: Verify Functionality (After Fix)
- Test user login
- Test data access control
- Verify no more recursion errors

### Step 3: Implement Admin Features (Optional)
- Add `is_admin` column to profiles table
- Create non-recursive admin policies
- Or use JWT claims for admin checks

### Step 4: Enhance Security (Advanced)
- Add audit logging for admin actions
- Implement role-based resource access
- Add field-level security if needed

---

## Prevention for Future Development

### Best Practices

1. **Never query the same table in its own RLS policy**
   ```sql
   -- BAD:
   ON table_x USING (EXISTS (SELECT FROM table_x ...))

   -- GOOD:
   ON table_x USING (user_id = auth.uid())
   ```

2. **Avoid indirect recursion chains**
   ```sql
   -- BAD: table_a → table_b → table_a
   -- GOOD: Direct comparisons only
   ```

3. **Use column-level checks when possible**
   ```sql
   -- GOOD:
   USING (status = 'active' AND user_id = auth.uid())

   -- LESS GOOD (but acceptable if no recursion):
   USING (EXISTS (SELECT FROM other_table ...))
   ```

4. **Document policy dependencies**
   - Keep track of which policies query which tables
   - Visualize the dependency graph
   - Check for cycles

### RLS Design Pattern for Multi-Role Systems

```sql
-- Option A: Role column in table (simplest)
CREATE POLICY "role_based"
  ON table_x FOR SELECT
  TO authenticated
  USING (role = 'admin');  -- No recursion!

-- Option B: Separate mapping table
CREATE TABLE user_roles (
  user_id uuid,
  role text
);

CREATE POLICY "role_based"
  ON table_x FOR SELECT
  TO authenticated
  USING (
    user_id IN (
      SELECT user_id FROM user_roles WHERE role = 'admin'
    )
  );  -- Queries separate table, not profiles

-- Option C: JWT claims (Supabase-specific)
CREATE POLICY "role_based"
  ON table_x FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');  -- No table query needed!
```

---

## Verification Queries

After applying the fix, run these queries to verify:

```sql
-- Check 1: Verify policies are dropped
SELECT policyname FROM pg_policies
WHERE tablename IN ('profiles', 'beneficiaries', 'vendors')
AND policyname LIKE '%Admin%';
-- Expected result: Empty set

-- Check 2: Verify non-recursive policies exist
SELECT policyname, qual FROM pg_policies
WHERE tablename = 'beneficiaries'
ORDER BY policyname;
-- Expected result: Simple policies without profile table queries

-- Check 3: Count all policies by table
SELECT tablename, COUNT(*) as policy_count
FROM pg_policies
GROUP BY tablename
ORDER BY tablename;

-- Check 4: Test user can query their own data
SELECT * FROM beneficiaries WHERE user_id = auth.uid();
-- Expected result: User can see their own beneficiary records
```

---

## References

- [Supabase RLS Documentation](https://supabase.com/docs/guides/auth/row-level-security)
- [PostgreSQL Policies Documentation](https://www.postgresql.org/docs/current/sql-createpolicy.html)
- [PostgreSQL RLS Performance](https://wiki.postgresql.org/wiki/Partition_Constraint_Exclusion)
- [Supabase Performance Tips](https://supabase.com/docs/guides/database/performance-tuning)

---

## Questions & Answers

**Q: Will this break admin functionality?**
A: RLS-level admin access is removed, but admin features can be implemented at the application level using service role keys or custom authorization logic.

**Q: Can I re-add admin policies later?**
A: Yes! After the system stabilizes, you can safely add admin policies using non-recursive approaches (boolean columns, JWT claims, or separate tables).

**Q: Will removing these policies affect performance?**
A: Likely improves performance by eliminating recursive policy evaluation.

**Q: What about audit logs?**
A: The audit logging still works. Admin access to audit logs will need to be handled at the application level or using service role keys.

**Q: Can users see each other's data now?**
A: No. The policies still restrict users to their own data based on `user_id = auth.uid()` comparisons.

**Q: What if I have custom RLS policies?**
A: Ensure they follow the same pattern - avoid querying tables that have their own RLS policies to prevent recursion.
