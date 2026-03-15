-- Create admin user
-- Email: admin@voucher.local
-- Password: Admin123!

-- This script should be run in your Supabase SQL Editor

-- Step 1: Sign up normally at the login page with:
--   Email: admin@voucher.local
--   Password: Admin123!

-- Step 2: Then run this SQL to make that user an admin:
UPDATE profiles
SET role = 'admin'
WHERE email = 'admin@voucher.local';
