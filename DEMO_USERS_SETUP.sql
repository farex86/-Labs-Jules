-- ============================================================================
-- VOUCHER MANAGEMENT SYSTEM - DEMO USERS SETUP
-- ============================================================================
-- Execute this SQL in your Supabase Dashboard SQL Editor
-- This creates three demo users with different roles
-- ============================================================================

-- NOTE: Users must be created via Supabase Auth first
-- Go to Supabase Dashboard > Authentication > Users > Add User
-- Create the following users:
-- 1. Email: admin@demo.local, Password: Admin123!
-- 2. Email: beneficiary@demo.local, Password: Beneficiary123!
-- 3. Email: vendor@demo.local, Password: Vendor123!

-- Then execute the SQL below to set up profiles and related data

-- ============================================================================
-- IMPORTANT: Replace the UUID values below with actual user IDs from Auth
-- ============================================================================

-- Get the actual UUIDs from your auth.users table:
-- SELECT id, email FROM auth.users;

-- Example UUIDs (REPLACE WITH YOUR ACTUAL UUIDs):
-- Admin UUID: (replace with actual UUID)
-- Beneficiary UUID: (replace with actual UUID)
-- Vendor UUID: (replace with actual UUID)

-- After creating users in Supabase Auth, run this query to get their IDs:
-- SELECT id, email FROM auth.users WHERE email IN ('admin@demo.local', 'beneficiary@demo.local', 'vendor@demo.local');

-- Then replace the UUIDs below and execute:

-- ============================================================================
-- ADMIN USER - Replace admin_uuid with actual UUID from auth.users
-- ============================================================================

INSERT INTO profiles (id, email, full_name, role, phone)
VALUES (
  'admin_uuid_here',
  'admin@demo.local',
  'System Administrator',
  'admin',
  '+1234567890'
) ON CONFLICT (id) DO UPDATE SET
  role = 'admin',
  updated_at = now();

-- ============================================================================
-- BENEFICIARY USER - Replace beneficiary_uuid with actual UUID from auth.users
-- ============================================================================

INSERT INTO profiles (id, email, full_name, role, phone)
VALUES (
  'beneficiary_uuid_here',
  'beneficiary@demo.local',
  'John Demo Beneficiary',
  'beneficiary',
  '+1234567891'
) ON CONFLICT (id) DO UPDATE SET
  role = 'beneficiary',
  updated_at = now();

-- Create beneficiary record
INSERT INTO beneficiaries (user_id, national_id, family_size, address, status, total_balance)
VALUES (
  'beneficiary_uuid_here',
  'NID-001-2024',
  4,
  '123 Demo Street, Demo City',
  'active',
  5000.00
) ON CONFLICT (national_id) DO UPDATE SET
  updated_at = now();

-- ============================================================================
-- VENDOR USER - Replace vendor_uuid with actual UUID from auth.users
-- ============================================================================

INSERT INTO profiles (id, email, full_name, role, phone)
VALUES (
  'vendor_uuid_here',
  'vendor@demo.local',
  'Demo Store Owner',
  'vendor',
  '+1234567892'
) ON CONFLICT (id) DO UPDATE SET
  role = 'vendor',
  updated_at = now();

-- Create vendor record
INSERT INTO vendors (user_id, business_name, business_license, category, address, status, total_redeemed, pending_payment)
VALUES (
  'vendor_uuid_here',
  'Demo General Store',
  'LICENSE-001-2024',
  'grocery',
  '456 Commerce Avenue, Business District',
  'active',
  0.00,
  0.00
) ON CONFLICT (business_license) DO UPDATE SET
  updated_at = now();

-- ============================================================================
-- SAMPLE VOUCHER PROGRAM
-- ============================================================================

INSERT INTO voucher_programs (name, description, amount_per_voucher, valid_from, valid_until, status, total_budget, used_budget)
VALUES (
  'Winter Relief Program 2024',
  'Emergency food assistance for families in need',
  500.00,
  now(),
  now() + interval '6 months',
  'active',
  100000.00,
  0.00
);

-- ============================================================================
-- HELPFUL QUERIES FOR VERIFICATION
-- ============================================================================

-- View all users and their roles:
-- SELECT id, email, full_name, role FROM profiles;

-- View beneficiary details:
-- SELECT b.*, p.email FROM beneficiaries b JOIN profiles p ON b.user_id = p.id;

-- View vendor details:
-- SELECT v.*, p.email FROM vendors v JOIN profiles p ON v.user_id = p.id;

-- View voucher programs:
-- SELECT * FROM voucher_programs;
