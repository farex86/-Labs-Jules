# Initialize Demo Users - Manual Setup Required

## Problem
The auth users don't exist yet in Supabase. You're getting "Invalid email or password" because the system is trying to authenticate against non-existent users.

## Solution: Create Users in Supabase Dashboard

### Method 1: Via Supabase Dashboard (Easiest)

1. **Open Supabase Dashboard**
   - Go to: https://supabase.com/dashboard/project/eetzwdpfffdpnllqbisl

2. **Navigate to Authentication**
   - Click: **Authentication** in left sidebar
   - Click: **Users** tab

3. **Create Admin User**
   - Click: **Add user** button
   - Fill in:
     - Email: `admin@demo.local`
     - Password: `Admin123!`
   - Check: **Auto confirm user** checkbox
   - Click: **Save**

4. **Create Beneficiary User**
   - Click: **Add user** button
   - Fill in:
     - Email: `beneficiary@demo.local`
     - Password: `Beneficiary123!`
   - Check: **Auto confirm user** checkbox
   - Click: **Save**

5. **Create Vendor User**
   - Click: **Add user** button
   - Fill in:
     - Email: `vendor@demo.local`
     - Password: `Vendor123!`
   - Check: **Auto confirm user** checkbox
   - Click: **Save**

### Step 2: Get User IDs for Database Setup

1. **Go to SQL Editor**
   - In Supabase Dashboard, click: **SQL Editor** (or go to https://supabase.com/dashboard/project/eetzwdpfffdpnllqbisl/sql)

2. **Run this query:**
   ```sql
   SELECT id, email FROM auth.users;
   ```

3. **Copy the three UUIDs** - you'll need them in the next step

### Step 3: Setup Database Schema

1. **Still in SQL Editor, create a new query**

2. **Copy the entire contents of `SCHEMA_SETUP.sql` from your project**

3. **Paste and click Run**

### Step 4: Create Profiles for Users

1. **Still in SQL Editor, create a new query**

2. **Open `DEMO_USERS_SETUP.sql` and replace:**
   - `'admin_uuid_here'` with your admin UUID
   - `'beneficiary_uuid_here'` with your beneficiary UUID
   - `'vendor_uuid_here'` with your vendor UUID

   Example - if your admin UUID is `a1b2c3d4-e5f6-7890-1234-567890abcdef`:
   ```sql
   INSERT INTO profiles (id, email, full_name, role, phone)
   VALUES (
     'a1b2c3d4-e5f6-7890-1234-567890abcdef',  <-- Replace this line
     'admin@demo.local',
     'System Administrator',
     'admin',
     '+1234567890'
   ) ON CONFLICT (id) DO UPDATE SET
     role = 'admin',
     updated_at = now();
   ```

3. **Paste updated SQL and click Run**

### Step 5: Test Login

Now try logging in again:
- Go to: http://localhost:5173/login
- Try: admin@demo.local / Admin123!
- Should redirect to: http://localhost:5173/admin

---

## Why This Happens

Supabase Auth and the database are separate systems:
- **Auth** stores user credentials (email/password)
- **Database** stores user profiles and data
- Both need to be set up separately

You successfully created the database tables, but the auth users still need to be created manually in the Supabase Auth system.

---

## Quick Checklist

- [ ] Created admin@demo.local in Supabase Auth
- [ ] Created beneficiary@demo.local in Supabase Auth
- [ ] Created vendor@demo.local in Supabase Auth
- [ ] Ran SCHEMA_SETUP.sql
- [ ] Got the three UUIDs from auth.users
- [ ] Replaced UUIDs in DEMO_USERS_SETUP.sql
- [ ] Ran updated DEMO_USERS_SETUP.sql
- [ ] Tested login with admin@demo.local

Once all checked, login should work!
