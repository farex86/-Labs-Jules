# Voucher Management System - Setup Guide

## Quick Start URLs

After setting up, access the system using these links:

### Admin Dashboard
- **URL**: http://localhost:5173/login
- **Email**: admin@demo.local
- **Password**: Admin123!
- **Dashboard**: http://localhost:5173/admin

### Beneficiary Portal
- **URL**: http://localhost:5173/login
- **Email**: beneficiary@demo.local
- **Password**: Beneficiary123!
- **Portal**: http://localhost:5173/beneficiary

### Vendor Portal
- **URL**: http://localhost:5173/login
- **Email**: vendor@demo.local
- **Password**: Vendor123!
- **Portal**: http://localhost:5173/vendor

---

## Database Setup Instructions

### Step 1: Create Database Schema

Go to your Supabase Dashboard SQL Editor and execute the SQL in `SCHEMA_SETUP.sql`

### Step 2: Create Demo Users

Execute the SQL in `DEMO_USERS_SETUP.sql` in the Supabase SQL Editor

### Step 3: Verify Setup

Run the verification SQL in `VERIFY_SETUP.sql` to ensure everything is working

---

## System Features

### Admin Features
- Dashboard with system overview
- Beneficiary management (add, edit, suspend)
- Vendor management (approve, monitor)
- Voucher program creation and tracking
- Transaction monitoring
- Vendor payment processing
- Audit logs

### Beneficiary Features
- View assigned vouchers
- Check balance
- View transaction history
- QR code display for voucher redemption

### Vendor Features
- Scan and redeem vouchers
- View redemption history
- Sync transaction data
- Check pending payments
- View payment history

---

## Database Schema

### Core Tables
- **profiles**: User accounts with roles
- **beneficiaries**: Beneficiary records
- **vendors**: Merchant accounts
- **voucher_programs**: Voucher campaign management
- **vouchers**: Individual vouchers issued to beneficiaries
- **transactions**: Transaction records
- **vendor_payments**: Payment tracking
- **audit_logs**: System audit trail

---

## Security Features

- Row Level Security (RLS) enabled on all tables
- Role-based access control (admin, beneficiary, vendor)
- User data isolation
- Secure authentication with Supabase Auth
