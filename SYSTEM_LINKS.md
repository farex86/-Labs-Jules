# Voucher Management System - Quick Reference Links

## Local Development URLs

### Main Application
- **Base URL**: http://localhost:5173
- **Login**: http://localhost:5173/login

---

## Admin Account

### Access URL
- **Dashboard**: http://localhost:5173/admin

### Credentials
- **Email**: admin@demo.local
- **Password**: Admin123!

### Admin Features
- **Dashboard**: http://localhost:5173/admin (Overview & Analytics)
- **Beneficiaries**: http://localhost:5173/admin/beneficiaries (Manage beneficiaries)
- **Vendors**: http://localhost:5173/admin/vendors (Manage vendors)
- **Programs**: http://localhost:5173/admin/programs (Manage voucher programs)
- **Transactions**: http://localhost:5173/admin/transactions (Monitor transactions)
- **Payments**: http://localhost:5173/admin/payments (Manage vendor payments)
- **Reports**: http://localhost:5173/admin/reports
- **Settings**: http://localhost:5173/admin/settings

---

## Beneficiary Account

### Access URL
- **Portal**: http://localhost:5173/beneficiary

### Credentials
- **Email**: beneficiary@demo.local
- **Password**: Beneficiary123!

### Beneficiary Features
- **Home**: http://localhost:5173/beneficiary (Balance & Overview)
- **Vouchers**: http://localhost:5173/beneficiary/vouchers (View & Display QR)
- **History**: http://localhost:5173/beneficiary/history (Transaction History)
- **Support**: http://localhost:5173/beneficiary/support

---

## Vendor Account

### Access URL
- **Portal**: http://localhost:5173/vendor

### Credentials
- **Email**: vendor@demo.local
- **Password**: Vendor123!

### Vendor Features
- **Dashboard**: http://localhost:5173/vendor (Overview)
- **Redeem**: http://localhost:5173/vendor/redeem (Scan & Redeem)
- **Details**: http://localhost:5173/vendor/details (Voucher Details)
- **Confirmation**: http://localhost:5173/vendor/confirmation (Redemption Confirmation)
- **History**: http://localhost:5173/vendor/history (Transaction History)
- **Sync**: http://localhost:5173/vendor/sync (Data Sync)
- **Settings**: http://localhost:5173/vendor/settings

---

## Supabase Project Links

- **Project URL**: https://eetzwdpfffdpnllqbisl.supabase.co
- **Dashboard**: https://supabase.com/dashboard/project/eetzwdpfffdpnllqbisl
- **SQL Editor**: https://supabase.com/dashboard/project/eetzwdpfffdpnllqbisl/sql
- **Authentication**: https://supabase.com/dashboard/project/eetzwdpfffdpnllqbisl/auth/users
- **Database**: https://supabase.com/dashboard/project/eetzwdpfffdpnllqbisl/editor

---

## Quick Login Info

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@demo.local | Admin123! |
| Beneficiary | beneficiary@demo.local | Beneficiary123! |
| Vendor | vendor@demo.local | Vendor123! |

---

## Setup Files to Execute

1. **Database Schema**: `SCHEMA_SETUP.sql`
   - Creates all tables and indexes
   - Enables RLS and creates policies

2. **Demo Data**: `DEMO_USERS_SETUP.sql`
   - Creates user profiles
   - Creates sample beneficiary and vendor records
   - Creates sample voucher program

3. **Verification**: `VERIFY_SETUP.sql`
   - Check user creation
   - Verify table structure
   - Confirm RLS policies
   - Validate data integrity

---

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Preview production build
npm run preview
```

---

## Key Features by Role

### Admin Features
- Full system access
- Create and manage beneficiaries
- Create and manage vendors
- Create voucher programs
- Issue vouchers
- Monitor all transactions
- Process vendor payments
- View audit logs

### Beneficiary Features
- View assigned vouchers
- Display QR codes for redemption
- Check account balance
- View transaction history
- Track voucher usage

### Vendor Features
- Scan and redeem vouchers
- View redemption confirmation
- Check transaction history
- Sync data with central system
- View pending payments
- Track payment history

---

## Database Tables

- **profiles**: User accounts (admin, beneficiary, vendor)
- **beneficiaries**: Beneficiary records
- **vendors**: Vendor/merchant records
- **voucher_programs**: Voucher campaign management
- **vouchers**: Individual vouchers
- **transactions**: Redemption transactions
- **vendor_payments**: Payment records
- **audit_logs**: System audit trail

---

## Environment Variables

Located in `.env`:
- `VITE_SUPABASE_URL`: Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Supabase anonymous key

These are already configured in your project.
