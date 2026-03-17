# Voucher Management System - Complete Setup Instructions

## System Access Links

After completing setup, access the system using these links:

### Login Page
- **URL**: http://localhost:5173/login
- Shows demo credentials for all user types

### Admin Dashboard
- **URL**: http://localhost:5173/admin
- **Email**: admin@demo.local
- **Password**: Admin123!
- **Features**: User management, voucher programs, transaction monitoring, vendor payments

### Beneficiary Portal
- **URL**: http://localhost:5173/beneficiary
- **Email**: beneficiary@demo.local
- **Password**: Beneficiary123!
- **Features**: View vouchers, check balance, transaction history, QR codes

### Vendor Portal
- **URL**: http://localhost:5173/vendor
- **Email**: vendor@demo.local
- **Password**: Vendor123!
- **Features**: Redeem vouchers, view transactions, sync data, check payments

---

## Step-by-Step Setup

### Step 1: Create Demo Users in Supabase Auth

1. Go to [Supabase Dashboard](https://supabase.com/dashboard/project/eetzwdpfffdpnllqbisl)
2. Navigate to **Authentication** → **Users**
3. Click **Add User**
4. Create three users with these credentials:

   **User 1 - Admin**
   - Email: `admin@demo.local`
   - Password: `Admin123!`
   - Auto confirm: Check this box

   **User 2 - Beneficiary**
   - Email: `beneficiary@demo.local`
   - Password: `Beneficiary123!`
   - Auto confirm: Check this box

   **User 3 - Vendor**
   - Email: `vendor@demo.local`
   - Password: `Vendor123!`
   - Auto confirm: Check this box

### Step 2: Get User IDs

1. Go to **SQL Editor** in Supabase Dashboard
2. Run this query to get the UUIDs:
```sql
SELECT id, email FROM auth.users WHERE email IN ('admin@demo.local', 'beneficiary@demo.local', 'vendor@demo.local');
```
3. Copy the three UUIDs (these are needed for the next step)

### Step 3: Setup Database Schema

1. Go to **SQL Editor** in Supabase Dashboard
2. Copy the entire contents of `SCHEMA_SETUP.sql` from your project folder
3. Paste into the SQL Editor
4. Click **Run** to execute
5. Wait for completion confirmation

### Step 4: Setup Demo Users and Data

1. Open `DEMO_USERS_SETUP.sql` from your project folder
2. Replace these placeholders with the UUIDs from Step 2:
   - `admin_uuid_here` → actual admin UUID
   - `beneficiary_uuid_here` → actual beneficiary UUID
   - `vendor_uuid_here` → actual vendor UUID
3. Go to **SQL Editor** in Supabase Dashboard
4. Paste the updated SQL
5. Click **Run** to execute

### Step 5: Verify Setup

1. Go to **SQL Editor** in Supabase Dashboard
2. Copy the entire contents of `VERIFY_SETUP.sql`
3. Paste into the SQL Editor
4. Run individual queries to verify:
   - Check auth users exist
   - Check profiles are created
   - Check beneficiaries are created
   - Check vendors are created

### Step 6: Test the Application

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open http://localhost:5173
3. You'll be redirected to the login page
4. Try logging in with one of the demo credentials

---

## Database Schema Overview

### Core Tables

**profiles**
- User accounts linked to Supabase Auth
- Fields: id, email, full_name, role, phone, created_at, updated_at
- Roles: admin, beneficiary, vendor

**beneficiaries**
- Beneficiary records
- Fields: id, user_id, national_id, family_size, address, status, total_balance
- Status: active, inactive, suspended

**vendors**
- Merchant/vendor accounts
- Fields: id, user_id, business_name, business_license, category, address, status, total_redeemed, pending_payment
- Categories: food, pharmacy, grocery, other
- Status: active, inactive, suspended

**voucher_programs**
- Voucher campaign management
- Fields: id, name, description, amount_per_voucher, valid_from, valid_until, status, total_budget, used_budget
- Status: active, inactive, completed

**vouchers**
- Individual vouchers issued to beneficiaries
- Fields: id, code, beneficiary_id, program_id, amount, remaining_amount, status, issued_at, expires_at
- Status: active, used, expired, cancelled

**transactions**
- Transaction records for voucher redemptions
- Fields: id, voucher_id, vendor_id, beneficiary_id, amount, transaction_type, status, notes, synced_at, created_at
- Type: redemption, refund
- Status: pending, completed, failed, synced

**vendor_payments**
- Payment tracking for vendors
- Fields: id, vendor_id, amount, period_start, period_end, status, payment_method, payment_reference, paid_at
- Status: pending, processing, paid, failed

**audit_logs**
- System audit trail
- Fields: id, user_id, action, entity_type, entity_id, changes, ip_address, created_at

---

## Security Features

### Row Level Security (RLS)
All tables have RLS enabled with role-based policies:

**Admin Access**
- Can view and manage all data
- Full access to beneficiaries, vendors, programs, vouchers, transactions, and payments

**Beneficiary Access**
- Can only view their own profile and vouchers
- Can view their own transaction history
- Cannot access other users' data

**Vendor Access**
- Can only view their own business data
- Can only see vouchers they've redeemed
- Can only view their own transactions and payments
- Can create and update transactions for their business

### Policies
- Users can only update their own profiles
- Beneficiaries can only access their own data
- Vendors cannot see other vendors' data
- All administrative functions require admin role

---

## Troubleshooting

### Login Not Working
- **Verify**: Check that users are created in Supabase Auth
- **Check**: Ensure profiles table exists and has data
- **Review**: Check browser console for error messages

### Profile Not Found Error
- Run `DEMO_USERS_SETUP.sql` to create profiles
- Ensure UUIDs match the auth users

### RLS Permission Errors
- This means the user doesn't have permission to access that data
- Verify the user's role is set correctly
- Check RLS policies are created

### Database Connection Issues
- Verify `.env` file has correct SUPABASE_URL and SUPABASE_ANON_KEY
- Check Supabase project is active and accessible

---

## Demo Scenarios

### Admin Workflow
1. Login as admin@demo.local
2. Create new beneficiary or vendor
3. Create voucher program
4. Issue vouchers to beneficiaries
5. Monitor transactions
6. Process vendor payments

### Beneficiary Workflow
1. Login as beneficiary@demo.local
2. View assigned vouchers
3. Check balance
4. View transaction history
5. Use QR code for redemption

### Vendor Workflow
1. Login as vendor@demo.local
2. Scan/redeem vouchers
3. View redemption history
4. Check pending payments
5. Sync transaction data

---

## Support

For issues or questions, refer to:
- Supabase Documentation: https://supabase.com/docs
- Project README: `README.md`
- Database schema comments: `SCHEMA_SETUP.sql`
