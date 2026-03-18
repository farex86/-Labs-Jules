# Quick Fix Reference - RLS Infinite Recursion

## TL;DR - Apply This Fix Now

**Error:** `infinite recursion detected in policy for relation "profiles"`

**Cause:** RLS policies query the profiles table while being evaluated on the profiles table

**Solution:** Execute SQL from `FIX_RLS_INFINITE_RECURSION.sql`

---

## How to Apply (60 seconds)

### Quick Steps:

1. **Go to Supabase Dashboard**
   - URL: https://app.supabase.com
   - Select your project

2. **Open SQL Editor**
   - Click "SQL Editor" in left sidebar

3. **Create New Query**
   - Click "New Query" or "+"

4. **Copy & Paste SQL**
   - Open: `FIX_RLS_INFINITE_RECURSION.sql`
   - Copy entire contents
   - Paste into SQL editor

5. **Run Query**
   - Click the "Run" button (blue play icon)
   - Wait for success message

6. **Test Authentication**
   - Try logging in to your app
   - Should work without recursion error

---

## What Gets Changed

### Dropped (Problematic Policies)
- ✗ All policies that check user role via profiles table queries
- ✗ All "Admins can..." policies
- ✗ Removes: 16 recursive policies

### Added (Fixed Policies)
- ✓ Simple user-based access controls
- ✓ Adds: 13 non-recursive policies
- ✓ Users see only their own data

---

## Files Provided

### 1. `FIX_RLS_INFINITE_RECURSION.sql`
The actual SQL to fix the issue. Copy and run in Supabase SQL editor.

### 2. `FIX_RLS_RECURSION_INSTRUCTIONS.md`
Detailed step-by-step instructions with:
- Problem explanation
- Multiple application methods
- Testing procedures
- Rollback instructions

### 3. `RLS_RECURSION_ANALYSIS.md`
Deep technical analysis including:
- Why recursion happens
- Policy-by-policy breakdown
- Design patterns to avoid recursion
- Prevention strategies

### 4. `QUICK_FIX_REFERENCE.md` (this file)
Quick reference for busy developers.

---

## Testing After Fix

```javascript
// Test 1: Can user login?
await supabase.auth.signInWithPassword({ email, password })
// Should succeed ✓

// Test 2: Can user see their profile?
await supabase.from('profiles').select('*').eq('id', uid)
// Should return their profile ✓

// Test 3: Can user see their beneficiary data?
await supabase.from('beneficiaries').select('*').eq('user_id', uid)
// Should return their beneficiary record ✓

// Test 4: Can user see others' data?
await supabase.from('beneficiaries').select('*').eq('user_id', OTHER_UID)
// Should return empty/forbidden ✓
```

---

## What Still Works

| Feature | Status |
|---------|--------|
| User login | ✓ Works |
| View own profile | ✓ Works |
| View own beneficiary data | ✓ Works |
| View own vendor data | ✓ Works |
| View active programs | ✓ Works |
| View own transactions | ✓ Works |
| Create transactions | ✓ Works (vendors) |
| View own payments | ✓ Works (vendors) |

---

## What Needs Changes

| Feature | Previous | Now |
|---------|----------|-----|
| Admin sees all profiles | RLS | Application level |
| Admin manages beneficiaries | RLS | Application level |
| Admin manages vendors | RLS | Application level |
| Admin views audit logs | RLS | Application level |

**Solution:** Check admin status in your app code before allowing operations, or use Supabase service role key from backend.

---

## Common Issues After Fix

### Issue: Login still fails
**Solution:**
- Refresh browser cache
- Clear all browser cookies for your domain
- Try in private/incognito browser window

### Issue: Users can't see their data
**Solution:**
- Verify user_id matches profiles.id
- Check that beneficiary/vendor records exist for the user
- Run test queries in SQL editor

### Issue: Admin features don't work
**Solution:**
- Admin features need app-level authorization
- Use Supabase service role key from backend for admin operations
- Example: `supabase.from('profiles').select('*').using('service_role_key')`

---

## For Advanced Users

### If you need admin policies:

**Option 1: Add is_admin column (Simplest)**
```sql
ALTER TABLE profiles ADD COLUMN is_admin boolean DEFAULT false;

CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (is_admin = true);
```

**Option 2: Use JWT claims (Recommended)**
```sql
CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');
```

**Option 3: Service role key (Backend only)**
```javascript
const { data } = await supabase.from('profiles')
  .select('*')
  .using('service_role_key');  // No RLS restrictions
```

---

## Rollback (If Needed)

If you need to undo the fix:

```sql
-- Drop fixed policies
DROP POLICY IF EXISTS "Beneficiaries can view own data" ON beneficiaries;
DROP POLICY IF EXISTS "Beneficiaries can update own data" ON beneficiaries;
DROP POLICY IF EXISTS "Vendors can view own data" ON vendors;
DROP POLICY IF EXISTS "Vendors can update own data" ON vendors;
-- ... drop all the new policies ...

-- Re-run the original schema migration:
-- Copy policy creation blocks from: supabase/migrations/20260315123257_create_core_schema.sql
```

---

## Need More Help?

1. **Technical Details:** See `RLS_RECURSION_ANALYSIS.md`
2. **Step-by-Step Guide:** See `FIX_RLS_RECURSION_INSTRUCTIONS.md`
3. **The SQL Fix:** See `FIX_RLS_INFINITE_RECURSION.sql`
4. **Supabase Docs:** https://supabase.com/docs/guides/auth/row-level-security

---

## Summary

| Step | Action | Time |
|------|--------|------|
| 1 | Open Supabase SQL Editor | 30 sec |
| 2 | Copy SQL from FIX_RLS_INFINITE_RECURSION.sql | 30 sec |
| 3 | Paste into editor | 10 sec |
| 4 | Click Run | 10 sec |
| 5 | Wait for success | 20 sec |
| **Total** | **Complete Fix** | **~2 minutes** |

Your users should be able to log in immediately after the fix is applied.
