-- ============================================================================
-- VOUCHER MANAGEMENT SYSTEM - VERIFICATION QUERIES
-- ============================================================================
-- Run these queries in Supabase Dashboard SQL Editor to verify setup
-- ============================================================================

-- ============================================================================
-- 1. CHECK USERS IN AUTH SYSTEM
-- ============================================================================
-- Run this to get the UUIDs for your auth users - you'll need these!
SELECT id, email, created_at FROM auth.users ORDER BY created_at DESC;

-- ============================================================================
-- 2. CHECK PROFILES TABLE
-- ============================================================================
SELECT id, email, full_name, role, created_at FROM profiles ORDER BY created_at DESC;

-- ============================================================================
-- 3. CHECK BENEFICIARIES
-- ============================================================================
SELECT
  b.id,
  p.email,
  p.full_name,
  b.national_id,
  b.family_size,
  b.status,
  b.total_balance,
  b.created_at
FROM beneficiaries b
JOIN profiles p ON b.user_id = p.id
ORDER BY b.created_at DESC;

-- ============================================================================
-- 4. CHECK VENDORS
-- ============================================================================
SELECT
  v.id,
  p.email,
  p.full_name,
  v.business_name,
  v.business_license,
  v.category,
  v.status,
  v.total_redeemed,
  v.pending_payment,
  v.created_at
FROM vendors v
JOIN profiles p ON v.user_id = p.id
ORDER BY v.created_at DESC;

-- ============================================================================
-- 5. CHECK VOUCHER PROGRAMS
-- ============================================================================
SELECT
  id,
  name,
  amount_per_voucher,
  valid_from,
  valid_until,
  status,
  total_budget,
  used_budget,
  created_at
FROM voucher_programs
ORDER BY created_at DESC;

-- ============================================================================
-- 6. CHECK ROLES DISTRIBUTION
-- ============================================================================
SELECT
  role,
  COUNT(*) as count
FROM profiles
GROUP BY role;

-- ============================================================================
-- 7. CHECK ROW LEVEL SECURITY STATUS
-- ============================================================================
SELECT
  tablename,
  COUNT(*) as policy_count
FROM pg_policies
WHERE tablename IN ('profiles', 'beneficiaries', 'vendors', 'voucher_programs', 'vouchers', 'transactions', 'vendor_payments', 'audit_logs')
GROUP BY tablename
ORDER BY tablename;

-- ============================================================================
-- 8. CHECK INDEXES
-- ============================================================================
SELECT
  indexname,
  tablename
FROM pg_indexes
WHERE tablename IN ('beneficiaries', 'vendors', 'vouchers', 'transactions', 'vendor_payments', 'audit_logs')
ORDER BY tablename;

-- ============================================================================
-- 9. CHECK TABLE RECORD COUNTS
-- ============================================================================
SELECT 'profiles' as table_name, COUNT(*) as count FROM profiles
UNION ALL
SELECT 'beneficiaries', COUNT(*) FROM beneficiaries
UNION ALL
SELECT 'vendors', COUNT(*) FROM vendors
UNION ALL
SELECT 'voucher_programs', COUNT(*) FROM voucher_programs
UNION ALL
SELECT 'vouchers', COUNT(*) FROM vouchers
UNION ALL
SELECT 'transactions', COUNT(*) FROM transactions
UNION ALL
SELECT 'vendor_payments', COUNT(*) FROM vendor_payments
UNION ALL
SELECT 'audit_logs', COUNT(*) FROM audit_logs;

-- ============================================================================
-- 10. TEST ADMIN PROFILE VIEW
-- ============================================================================
-- After login, run this query with a specific admin UUID to verify RLS:
-- SELECT * FROM profiles WHERE id = 'your-admin-uuid';
