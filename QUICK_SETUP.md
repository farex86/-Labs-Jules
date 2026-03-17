# Quick Setup - Copy & Paste Instructions

## Complete Setup in 5 Minutes

### Step 1: Create Auth Users (Supabase Dashboard)

1. Open https://supabase.com/dashboard/project/eetzwdpfffdpnllqbisl
2. Go to **Authentication** → **Users** → **Add User**
3. Create three users:

**Admin User:**
- Email: `admin@demo.local`
- Password: `Admin123!`
- ✓ Auto confirm

**Beneficiary User:**
- Email: `beneficiary@demo.local`
- Password: `Beneficiary123!`
- ✓ Auto confirm

**Vendor User:**
- Email: `vendor@demo.local`
- Password: `Vendor123!`
- ✓ Auto confirm

### Step 2: Get User IDs

1. Go to **SQL Editor**
2. Copy and paste:

```sql
SELECT id, email FROM auth.users WHERE email IN ('admin@demo.local', 'beneficiary@demo.local', 'vendor@demo.local');
```

3. Run and note down the three UUIDs:
   - Admin UUID: `_______________________________`
   - Beneficiary UUID: `_______________________________`
   - Vendor UUID: `_______________________________`

### Step 3: Create Database Schema

1. Go to **SQL Editor** → New Query
2. Open `SCHEMA_SETUP.sql` from your project folder
3. Copy entire contents
4. Paste into SQL Editor
5. Click **Run**

### Step 4: Create Demo Users

1. Open `DEMO_USERS_SETUP.sql` from your project folder
2. Replace (use your UUIDs from Step 2):
   - Line with `'admin_uuid_here'` → replace with admin UUID
   - Line with `'beneficiary_uuid_here'` → replace with beneficiary UUID
   - Line with `'vendor_uuid_here'` → replace with vendor UUID

Example:
```sql
-- Before:
INSERT INTO profiles (id, email, full_name, role, phone)
VALUES (
  'admin_uuid_here',
  'admin@demo.local',
  ...

-- After (with actual UUID):
INSERT INTO profiles (id, email, full_name, role, phone)
VALUES (
  'a1b2c3d4-e5f6-7890-1234-567890abcdef',
  'admin@demo.local',
  ...
```

3. Go to **SQL Editor** → New Query
4. Copy entire updated SQL
5. Paste into Editor
6. Click **Run**

### Step 5: Start Application

```bash
npm run dev
```

Visit: http://localhost:5173

---

## Login Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@demo.local | Admin123! |
| Beneficiary | beneficiary@demo.local | Beneficiary123! |
| Vendor | vendor@demo.local | Vendor123! |

---

## System URLs After Setup

- **Login**: http://localhost:5173/login
- **Admin Dashboard**: http://localhost:5173/admin
- **Beneficiary Portal**: http://localhost:5173/beneficiary
- **Vendor Portal**: http://localhost:5173/vendor

---

## Verification Steps

After completing setup, verify everything works:

1. **Login as Admin**
   - Go to http://localhost:5173/login
   - Email: admin@demo.local
   - Password: Admin123!
   - Should redirect to http://localhost:5173/admin

2. **Login as Beneficiary**
   - Logout from admin
   - Email: beneficiary@demo.local
   - Password: Beneficiary123!
   - Should redirect to http://localhost:5173/beneficiary

3. **Login as Vendor**
   - Logout from beneficiary
   - Email: vendor@demo.local
   - Password: Vendor123!
   - Should redirect to http://localhost:5173/vendor

---

## Troubleshooting

### "User profile not found" Error
- Make sure `DEMO_USERS_SETUP.sql` was executed
- Verify UUIDs were replaced correctly (all 36 characters with hyphens)

### "Invalid email or password" Error
- Check email and password are exactly as specified above (case-sensitive)
- Verify user was created in Supabase Auth

### Can't access Supabase Dashboard
- Project URL: https://supabase.com/dashboard/project/eetzwdpfffdpnllqbisl
- Ensure you're logged into the correct Supabase account

### Application won't start
- Verify `.env` file has:
  - `VITE_SUPABASE_URL=https://eetzwdpfffdpnllqbisl.supabase.co`
  - `VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

---

## What Gets Created

**Database Tables:**
- profiles (user accounts)
- beneficiaries (beneficiary records)
- vendors (merchant accounts)
- voucher_programs (campaigns)
- vouchers (individual vouchers)
- transactions (redemptions)
- vendor_payments (payment tracking)
- audit_logs (system logs)

**Demo Users:**
- 1 Admin with full system access
- 1 Beneficiary with sample data
- 1 Vendor with sample data

**Security:**
- Row Level Security enabled on all tables
- Role-based access control
- User data isolation

---

## Next Steps

After setup:

1. **Admin**: Create more beneficiaries and vendors in the admin panel
2. **Admin**: Create new voucher programs
3. **Admin**: Issue vouchers to beneficiaries
4. **Beneficiary**: View and display QR codes for redemption
5. **Vendor**: Scan and redeem vouchers
6. **Admin**: Monitor transactions and process payments
