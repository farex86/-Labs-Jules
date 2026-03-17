# Voucher Management System

A comprehensive voucher and assistance program management system built with React, Vite, Supabase, and Tailwind CSS.

## Quick Start

**For first-time setup:** See `QUICK_SETUP.md` for step-by-step instructions (5 minutes)

**After setup, start the app:**
```bash
npm run dev
```

Visit: http://localhost:5173

---

## System Links

### Admin Dashboard
- **URL**: http://localhost:5173/admin
- **Email**: admin@demo.local
- **Password**: Admin123!

### Beneficiary Portal
- **URL**: http://localhost:5173/beneficiary
- **Email**: beneficiary@demo.local
- **Password**: Beneficiary123!

### Vendor Portal
- **URL**: http://localhost:5173/vendor
- **Email**: vendor@demo.local
- **Password**: Vendor123!

---

## Documentation

- **QUICK_SETUP.md** - Fast setup guide (copy & paste)
- **SETUP_INSTRUCTIONS.md** - Detailed setup with explanations
- **SYSTEM_LINKS.md** - All system URLs and credentials
- **SCHEMA_SETUP.sql** - Database schema (run in Supabase)
- **DEMO_USERS_SETUP.sql** - Demo user creation (run in Supabase)
- **VERIFY_SETUP.sql** - Verification queries

---

## Features

### Admin
- Dashboard with analytics
- Beneficiary management
- Vendor management
- Voucher program creation
- Transaction monitoring
- Vendor payment processing
- Audit logs

### Beneficiary
- View vouchers
- Check account balance
- Display QR codes
- Transaction history

### Vendor
- Scan and redeem vouchers
- View redemption history
- Sync transaction data
- Check pending payments

---

## Technology Stack

- **Frontend**: React 19, Vite, Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Routing**: React Router
- **Icons**: Lucide React
- **QR Code**: qrcode.react

---

## Database Schema

- **profiles** - User accounts with roles
- **beneficiaries** - Beneficiary records
- **vendors** - Merchant accounts
- **voucher_programs** - Campaign management
- **vouchers** - Individual vouchers
- **transactions** - Redemption records
- **vendor_payments** - Payment tracking
- **audit_logs** - System audit trail

All tables have Row Level Security enabled with role-based policies.

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

## Project Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Follow `QUICK_SETUP.md` for database configuration
4. Run `npm run dev` to start

---

## Support

For detailed information, see the documentation files in the project root.
