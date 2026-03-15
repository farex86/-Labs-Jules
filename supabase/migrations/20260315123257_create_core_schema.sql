/*
  # Create Voucher Management System Core Schema

  1. New Tables
    - `profiles`
      - `id` (uuid, references auth.users, primary key)
      - `email` (text, unique)
      - `full_name` (text)
      - `role` (text: 'admin', 'beneficiary', 'vendor')
      - `phone` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `beneficiaries`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `national_id` (text, unique)
      - `family_size` (integer)
      - `address` (text)
      - `status` (text: 'active', 'inactive', 'suspended')
      - `total_balance` (decimal)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `vendors`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `business_name` (text)
      - `business_license` (text, unique)
      - `category` (text: 'food', 'pharmacy', 'grocery', 'other')
      - `address` (text)
      - `status` (text: 'active', 'inactive', 'suspended')
      - `total_redeemed` (decimal)
      - `pending_payment` (decimal)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `voucher_programs`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `amount_per_voucher` (decimal)
      - `valid_from` (timestamptz)
      - `valid_until` (timestamptz)
      - `status` (text: 'active', 'inactive', 'completed')
      - `total_budget` (decimal)
      - `used_budget` (decimal)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `vouchers`
      - `id` (uuid, primary key)
      - `code` (text, unique)
      - `beneficiary_id` (uuid, references beneficiaries)
      - `program_id` (uuid, references voucher_programs)
      - `amount` (decimal)
      - `remaining_amount` (decimal)
      - `status` (text: 'active', 'used', 'expired', 'cancelled')
      - `issued_at` (timestamptz)
      - `expires_at` (timestamptz)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `transactions`
      - `id` (uuid, primary key)
      - `voucher_id` (uuid, references vouchers)
      - `vendor_id` (uuid, references vendors)
      - `beneficiary_id` (uuid, references beneficiaries)
      - `amount` (decimal)
      - `transaction_type` (text: 'redemption', 'refund')
      - `status` (text: 'pending', 'completed', 'failed', 'synced')
      - `notes` (text)
      - `synced_at` (timestamptz)
      - `created_at` (timestamptz)
    
    - `vendor_payments`
      - `id` (uuid, primary key)
      - `vendor_id` (uuid, references vendors)
      - `amount` (decimal)
      - `period_start` (date)
      - `period_end` (date)
      - `status` (text: 'pending', 'processing', 'paid', 'failed')
      - `payment_method` (text)
      - `payment_reference` (text)
      - `paid_at` (timestamptz)
      - `created_at` (timestamptz)
    
    - `audit_logs`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `action` (text)
      - `entity_type` (text)
      - `entity_id` (uuid)
      - `changes` (jsonb)
      - `ip_address` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for role-based access control
    - Admins can access everything
    - Beneficiaries can only access their own data
    - Vendors can only access their own data and transactions

  3. Indexes
    - Add indexes on foreign keys and frequently queried columns
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  role text NOT NULL CHECK (role IN ('admin', 'beneficiary', 'vendor')),
  phone text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create beneficiaries table
CREATE TABLE IF NOT EXISTS beneficiaries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  national_id text UNIQUE NOT NULL,
  family_size integer DEFAULT 1,
  address text,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  total_balance decimal(10, 2) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create vendors table
CREATE TABLE IF NOT EXISTS vendors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  business_name text NOT NULL,
  business_license text UNIQUE NOT NULL,
  category text DEFAULT 'grocery' CHECK (category IN ('food', 'pharmacy', 'grocery', 'other')),
  address text,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  total_redeemed decimal(10, 2) DEFAULT 0,
  pending_payment decimal(10, 2) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create voucher_programs table
CREATE TABLE IF NOT EXISTS voucher_programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  amount_per_voucher decimal(10, 2) NOT NULL,
  valid_from timestamptz NOT NULL,
  valid_until timestamptz NOT NULL,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'completed')),
  total_budget decimal(12, 2) NOT NULL,
  used_budget decimal(12, 2) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create vouchers table
CREATE TABLE IF NOT EXISTS vouchers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  beneficiary_id uuid REFERENCES beneficiaries(id) ON DELETE CASCADE,
  program_id uuid REFERENCES voucher_programs(id) ON DELETE CASCADE,
  amount decimal(10, 2) NOT NULL,
  remaining_amount decimal(10, 2) NOT NULL,
  status text DEFAULT 'active' CHECK (status IN ('active', 'used', 'expired', 'cancelled')),
  issued_at timestamptz DEFAULT now(),
  expires_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  voucher_id uuid REFERENCES vouchers(id) ON DELETE CASCADE,
  vendor_id uuid REFERENCES vendors(id) ON DELETE CASCADE,
  beneficiary_id uuid REFERENCES beneficiaries(id) ON DELETE CASCADE,
  amount decimal(10, 2) NOT NULL,
  transaction_type text DEFAULT 'redemption' CHECK (transaction_type IN ('redemption', 'refund')),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'synced')),
  notes text,
  synced_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Create vendor_payments table
CREATE TABLE IF NOT EXISTS vendor_payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id uuid REFERENCES vendors(id) ON DELETE CASCADE,
  amount decimal(10, 2) NOT NULL,
  period_start date NOT NULL,
  period_end date NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'paid', 'failed')),
  payment_method text,
  payment_reference text,
  paid_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Create audit_logs table
CREATE TABLE IF NOT EXISTS audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  action text NOT NULL,
  entity_type text NOT NULL,
  entity_id uuid,
  changes jsonb,
  ip_address text,
  created_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_beneficiaries_user_id ON beneficiaries(user_id);
CREATE INDEX IF NOT EXISTS idx_beneficiaries_status ON beneficiaries(status);
CREATE INDEX IF NOT EXISTS idx_vendors_user_id ON vendors(user_id);
CREATE INDEX IF NOT EXISTS idx_vendors_status ON vendors(status);
CREATE INDEX IF NOT EXISTS idx_vouchers_beneficiary_id ON vouchers(beneficiary_id);
CREATE INDEX IF NOT EXISTS idx_vouchers_program_id ON vouchers(program_id);
CREATE INDEX IF NOT EXISTS idx_vouchers_status ON vouchers(status);
CREATE INDEX IF NOT EXISTS idx_vouchers_code ON vouchers(code);
CREATE INDEX IF NOT EXISTS idx_transactions_voucher_id ON transactions(voucher_id);
CREATE INDEX IF NOT EXISTS idx_transactions_vendor_id ON transactions(vendor_id);
CREATE INDEX IF NOT EXISTS idx_transactions_beneficiary_id ON transactions(beneficiary_id);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON transactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_vendor_payments_vendor_id ON vendor_payments(vendor_id);
CREATE INDEX IF NOT EXISTS idx_vendor_payments_status ON vendor_payments(status);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at DESC);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE beneficiaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE voucher_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE vouchers ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Beneficiaries policies
CREATE POLICY "Beneficiaries can view own data"
  ON beneficiaries FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage beneficiaries"
  ON beneficiaries FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Vendors policies
CREATE POLICY "Vendors can view own data"
  ON vendors FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Vendors can update own data"
  ON vendors FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can manage vendors"
  ON vendors FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Voucher programs policies
CREATE POLICY "Anyone can view active programs"
  ON voucher_programs FOR SELECT
  TO authenticated
  USING (status = 'active' OR EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Admins can manage programs"
  ON voucher_programs FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Vouchers policies
CREATE POLICY "Beneficiaries can view own vouchers"
  ON vouchers FOR SELECT
  TO authenticated
  USING (
    beneficiary_id IN (
      SELECT id FROM beneficiaries WHERE user_id = auth.uid()
    )
    OR EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Vendors can view vouchers for redemption"
  ON vouchers FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('vendor', 'admin')
    )
  );

CREATE POLICY "Admins can manage vouchers"
  ON vouchers FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Transactions policies
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
    OR EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
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

CREATE POLICY "Admins can manage transactions"
  ON transactions FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Vendor payments policies
CREATE POLICY "Vendors can view own payments"
  ON vendor_payments FOR SELECT
  TO authenticated
  USING (
    vendor_id IN (
      SELECT id FROM vendors WHERE user_id = auth.uid()
    )
    OR EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage payments"
  ON vendor_payments FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Audit logs policies
CREATE POLICY "Admins can view audit logs"
  ON audit_logs FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "System can create audit logs"
  ON audit_logs FOR INSERT
  TO authenticated
  WITH CHECK (true);