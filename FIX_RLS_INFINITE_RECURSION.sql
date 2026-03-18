/*
  Fix RLS Infinite Recursion Issue

  PROBLEM:
  The current RLS policies cause infinite recursion when users try to authenticate.
  Multiple policies query the profiles table while being evaluated on the profiles
  table itself, creating circular dependencies:

  1. "Admins can view all profiles" policy on profiles table queries profiles table
  2. "Beneficiaries can view own data" queries profiles for admin check
  3. "Vendors can view own data" queries profiles for admin check
  4. Multiple other policies have the same pattern

  When a user logs in and Supabase evaluates policies on the profiles table,
  it triggers the policy checks on profiles table recursively.

  SOLUTION:
  Replace all recursive policies with simpler, non-recursive alternatives:
  - Remove all policies that check user role via profiles table queries
  - For beneficiaries/vendors: Use only user_id = auth.uid() comparisons
  - For active programs: Use only status checks
  - Admin policies are removed (can be re-added with alternative approaches)

  This breaks the circular dependency and allows users to authenticate successfully.

  ============================================================================
  EXECUTE THIS SCRIPT IN YOUR SUPABASE SQL EDITOR
  ============================================================================
*/

-- Drop all problematic recursive policies
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Beneficiaries can view own data" ON beneficiaries;
DROP POLICY IF EXISTS "Admins can manage beneficiaries" ON beneficiaries;
DROP POLICY IF EXISTS "Vendors can view own data" ON vendors;
DROP POLICY IF EXISTS "Admins can manage vendors" ON vendors;
DROP POLICY IF EXISTS "Anyone can view active programs" ON voucher_programs;
DROP POLICY IF EXISTS "Admins can manage programs" ON voucher_programs;
DROP POLICY IF EXISTS "Beneficiaries can view own vouchers" ON vouchers;
DROP POLICY IF EXISTS "Vendors can view vouchers for redemption" ON vouchers;
DROP POLICY IF EXISTS "Admins can manage vouchers" ON vouchers;
DROP POLICY IF EXISTS "Users can view related transactions" ON transactions;
DROP POLICY IF EXISTS "Vendors can create transactions" ON transactions;
DROP POLICY IF EXISTS "Vendors can update own transactions" ON transactions;
DROP POLICY IF EXISTS "Admins can manage transactions" ON transactions;
DROP POLICY IF EXISTS "Vendors can view own payments" ON vendor_payments;
DROP POLICY IF EXISTS "Admins can manage payments" ON vendor_payments;
DROP POLICY IF EXISTS "Admins can view audit logs" ON audit_logs;

-- Note: Keep "Users can view own profile" and "Users can update own profile" policies on profiles table
-- as they don't create recursion (they only check auth.uid() = id)

-- ============================================================================
-- NON-RECURSIVE BENEFICIARIES POLICIES
-- ============================================================================

CREATE POLICY "Beneficiaries can view own data"
  ON beneficiaries FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Beneficiaries can update own data"
  ON beneficiaries FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- ============================================================================
-- NON-RECURSIVE VENDORS POLICIES
-- ============================================================================

CREATE POLICY "Vendors can view own data"
  ON vendors FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Vendors can update own data"
  ON vendors FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- ============================================================================
-- NON-RECURSIVE VOUCHER_PROGRAMS POLICIES
-- ============================================================================

CREATE POLICY "Anyone can view active programs"
  ON voucher_programs FOR SELECT
  TO authenticated
  USING (status = 'active');

-- ============================================================================
-- NON-RECURSIVE VOUCHERS POLICIES
-- ============================================================================

CREATE POLICY "Beneficiaries can view own vouchers"
  ON vouchers FOR SELECT
  TO authenticated
  USING (
    beneficiary_id IN (
      SELECT id FROM beneficiaries WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Vendors can view vouchers for redemption"
  ON vouchers FOR SELECT
  TO authenticated
  USING (true);

-- ============================================================================
-- NON-RECURSIVE TRANSACTIONS POLICIES
-- ============================================================================

CREATE POLICY "Users can view related transactions"
  ON transactions FOR SELECT
  TO authenticated
  USING (
    beneficiary_id IN (
      SELECT id FROM beneficiaries WHERE user_id = auth.uid()
    )
    OR vendor_id IN (
      SELECT id FROM vendors WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Vendors can create transactions"
  ON transactions FOR INSERT
  TO authenticated
  WITH CHECK (
    vendor_id IN (
      SELECT id FROM vendors WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Vendors can update own transactions"
  ON transactions FOR UPDATE
  TO authenticated
  USING (
    vendor_id IN (
      SELECT id FROM vendors WHERE user_id = auth.uid()
    )
  )
  WITH CHECK (
    vendor_id IN (
      SELECT id FROM vendors WHERE user_id = auth.uid()
    )
  );

-- ============================================================================
-- NON-RECURSIVE VENDOR_PAYMENTS POLICIES
-- ============================================================================

CREATE POLICY "Vendors can view own payments"
  ON vendor_payments FOR SELECT
  TO authenticated
  USING (
    vendor_id IN (
      SELECT id FROM vendors WHERE user_id = auth.uid()
    )
  );

-- ============================================================================
-- NOTES FOR FUTURE ADMIN POLICY IMPLEMENTATION
-- ============================================================================
/*
To implement admin-specific policies without causing recursion, consider these approaches:

OPTION 1: Create a separate "is_admin" column
- Add boolean column to profiles table
- Index it for performance
- Use simpler: (auth.uid() = id AND is_admin = true)
- This avoids recursive queries

OPTION 2: Use JWT claims (recommended for Supabase)
- Add admin role/claim to user's JWT token during signup
- Check JWT claim directly: (auth.jwt() ->> 'role' = 'admin')
- Requires custom authentication logic

OPTION 3: Implement admin policies after main functionality works
- First stabilize the system with non-admin policies
- Add admin policies separately once authentication works
- Admin access can be managed through application code

Current implementation prioritizes system stability by removing admin RLS policies.
Admin users can perform administrative tasks through:
- Application-level authorization checks
- Server-side API endpoints with admin verification
- Service role key operations (from backend only)
*/
