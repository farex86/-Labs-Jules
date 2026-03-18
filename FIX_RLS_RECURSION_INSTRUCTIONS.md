# Fix for RLS Infinite Recursion Error

## Problem Summary

You're experiencing an infinite recursion error with the message:
```
infinite recursion detected in policy for relation "profiles"
```

This error prevents users from authenticating and causes the application to fail.

### Root Cause

The RLS policies in your Supabase database have a circular dependency issue:

1. **On the `profiles` table**: The "Admins can view all profiles" policy queries the `profiles` table to check if the user is an admin
2. **On other tables** (beneficiaries, vendors, etc.): Policies query the `profiles` table to verify user role
3. **The recursion**: When Supabase evaluates policies on the `profiles` table during user authentication, it triggers policy evaluation on the `profiles` table itself, creating an infinite loop

**Affected Policies:**
- `profiles` - "Admins can view all profiles"
- `beneficiaries` - "Beneficiaries can view own data", "Admins can manage beneficiaries"
- `vendors` - "Vendors can view own data", "Admins can manage vendors"
- `voucher_programs` - "Anyone can view active programs", "Admins can manage programs"
- `vouchers` - All admin/view policies
- `transactions` - All admin policies
- `vendor_payments` - All admin policies
- `audit_logs` - All admin access policies

## Solution

The fix removes all policies that query the `profiles` table and replaces them with simpler, non-recursive alternatives that:

1. **Use direct comparisons**: `user_id = auth.uid()` instead of profile role checks
2. **Use table-based subqueries**: Query `beneficiaries` or `vendors` directly, not `profiles`
3. **Simplify access rules**: Remove role-based admin access from RLS (can be implemented at application level)

## How to Apply the Fix

### Option 1: Using Supabase Dashboard (Recommended for immediate fix)

1. Go to your Supabase project dashboard: https://app.supabase.com
2. Navigate to the **SQL Editor** section
3. Create a new query
4. Copy the entire contents of `FIX_RLS_INFINITE_RECURSION.sql`
5. Paste it into the SQL editor
6. Click **Run** button
7. Wait for the command to complete
8. Verify the fix by testing user authentication

### Option 2: Using Supabase CLI

If you have the Supabase CLI installed:

```bash
# Install/update Supabase CLI if needed
npm install -g supabase@latest

# Create a new migration file
supabase migration new fix_rls_infinite_recursion

# The migration will be created in supabase/migrations/
# Copy the contents of FIX_RLS_INFINITE_RECURSION.sql to the new migration file

# Deploy the migration
supabase db push
```

### Option 3: Using Docker/Local Supabase

If running Supabase locally:

```bash
# If using docker-compose
docker-compose exec db psql -U postgres -d postgres -f FIX_RLS_INFINITE_RECURSION.sql

# Or connect to your local Supabase database directly
psql -h localhost -U postgres -d postgres -f FIX_RLS_INFINITE_RECURSION.sql
```

## What Changes

### Policies Being Removed
The following problematic policies are DROPPED:
- "Admins can view all profiles" (on profiles table)
- "Admins can manage beneficiaries" (on beneficiaries table)
- "Admins can manage vendors" (on vendors table)
- "Admins can manage programs" (on voucher_programs table)
- "Admins can manage vouchers" (on vouchers table)
- "Admins can manage transactions" (on transactions table)
- "Admins can manage payments" (on vendor_payments table)
- "Admins can view audit logs" (on audit_logs table)

**NOT Removed (these don't cause recursion):**
- "Users can view own profile" (on profiles table)
- "Users can update own profile" (on profiles table)

### Policies Being Added

**Beneficiaries Table:**
- `Beneficiaries can view own data` - SELECT using `user_id = auth.uid()`
- `Beneficiaries can update own data` - UPDATE using `user_id = auth.uid()`

**Vendors Table:**
- `Vendors can view own data` - SELECT using `user_id = auth.uid()`
- `Vendors can update own data` - UPDATE using `user_id = auth.uid()`

**Voucher Programs Table:**
- `Anyone can view active programs` - SELECT only active programs (`status = 'active'`)

**Vouchers Table:**
- `Beneficiaries can view own vouchers` - SELECT own beneficiary vouchers
- `Vendors can view vouchers for redemption` - SELECT all vouchers (simplified)

**Transactions Table:**
- `Users can view related transactions` - SELECT own transactions
- `Vendors can create transactions` - INSERT for own vendor
- `Vendors can update own transactions` - UPDATE own transactions

**Vendor Payments Table:**
- `Vendors can view own payments` - SELECT own vendor payments

## Impact on Admin Access

After applying this fix:

- **Admin users can still perform admin tasks** through:
  1. Application-level authorization checks in your frontend/backend
  2. Server-side API endpoints with admin verification
  3. Supabase service role key (for backend operations only)

- **RLS-level admin access is removed** but can be re-implemented later without causing recursion by:
  1. Adding an `is_admin` boolean column to profiles table
  2. Using JWT claims in Supabase auth
  3. Creating a separate admin access control table

## Testing the Fix

After applying the migration:

1. **Test user login**: Try logging in with a test account
   - Should succeed without infinite recursion error
   - Should be able to view own profile, beneficiary data, or vendor data

2. **Test data access**: Verify users can see their own data
   - Beneficiaries should see their own beneficiary record
   - Vendors should see their own vendor record
   - Users should see active voucher programs

3. **Test restricted access**: Verify users cannot see others' data
   - Try querying another user's beneficiary record (should fail)
   - Try viewing another vendor's data (should fail)

## Rollback

If you need to revert this change:

```sql
-- Revert to original policies by running the original schema migration
-- The original migration file: supabase/migrations/20260315123257_create_core_schema.sql

-- First drop the new policies
DROP POLICY IF EXISTS "Beneficiaries can view own data" ON beneficiaries;
DROP POLICY IF EXISTS "Beneficiaries can update own data" ON beneficiaries;
-- ... (drop all newly created policies)

-- Then re-create the original policies from the first migration
-- (copy policy creation blocks from 20260315123257_create_core_schema.sql)
```

## Next Steps for Admin Features

Once the system is stable with this fix, you can implement admin policies using one of these approaches:

### Recommended: JWT Claims (Best Practice)
```javascript
// In your auth signup/login handler:
const { data, error } = await supabase.auth.signUp({
  email: email,
  password: password,
  options: {
    data: {
      role: 'admin' // or 'beneficiary', 'vendor'
    }
  }
});

// Then use JWT claim in RLS policies:
-- Example admin policy (non-recursive):
CREATE POLICY "Admin actions"
  ON profiles FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'user_metadata' ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'user_metadata' ->> 'role' = 'admin');
```

### Alternative: Boolean Column
```sql
-- Add is_admin column to profiles
ALTER TABLE profiles ADD COLUMN is_admin boolean DEFAULT false;

-- Create admin policy (non-recursive):
CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (is_admin = true);
```

## Support

If you encounter any issues:

1. Check the Supabase dashboard logs for error messages
2. Verify all policies were properly created
3. Test basic queries in the SQL editor
4. Contact Supabase support if RLS issues persist

For questions about this fix, refer to:
- Supabase RLS Documentation: https://supabase.com/docs/guides/auth/row-level-security
- PostgreSQL Documentation: https://www.postgresql.org/docs/current/sql-createpolicy.html
