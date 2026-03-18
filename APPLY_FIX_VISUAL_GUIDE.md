# Visual Guide: How to Apply the RLS Fix

This guide walks you through applying the fix with screenshots/descriptions of each step.

---

## Step 1: Open Your Supabase Project

```
Go to: https://app.supabase.com

┌─────────────────────────────────────────┐
│         Supabase Dashboard              │
│  ┌─────────────────────────────────────┐│
│  │ My Projects                         ││
│  │ ┌─────────────────────────────────┐││
│  │ │ [Your Project Name]             │││
│  │ │ Region: [your-region]           │││
│  │ │ Status: Active                  │││
│  │ └─────────────────────────────────┘││
│  └─────────────────────────────────────┘│
└─────────────────────────────────────────┘

Click on your project name to open it.
```

---

## Step 2: Navigate to SQL Editor

```
Left Sidebar Menu:
┌──────────────────────┐
│ Project Name         │
├──────────────────────┤
│ 📊 Dashboard         │
│ 📋 SQL Editor      ← Click here!
│ 📡 API Docs          │
│ ⚙️  Settings         │
│ 🔐 Authentication    │
│ 📁 Storage           │
│ ...                  │
└──────────────────────┘

Click on "SQL Editor" in the left sidebar.
```

---

## Step 3: Create a New Query

```
SQL Editor Page:
┌─────────────────────────────────────────────┐
│ SQL Editor                                  │
│ ┌─────────────────────────────────────────┐│
│ │ [+ New Query] [Run] [Format] [...]      ││
│ ├─────────────────────────────────────────┤│
│ │ SELECT * FROM profiles;                 ││
│ │                                         ││
│ │                                         ││
│ │                                         ││
│ └─────────────────────────────────────────┘│
└─────────────────────────────────────────────┘

Click "[+ New Query]" or the "+" button to create new query.
```

---

## Step 4: Copy the Fix SQL

```
In Your Text Editor:

1. Open: FIX_RLS_INFINITE_RECURSION.sql
2. Select All: Ctrl+A (or Cmd+A on Mac)
3. Copy: Ctrl+C (or Cmd+C on Mac)

File will look like:
┌──────────────────────────────────────┐
│ FIX_RLS_INFINITE_RECURSION.sql       │
├──────────────────────────────────────┤
│ /*                                   │
│   Fix RLS Infinite Recursion Issue   │
│   ...                                │
│ */                                   │
│                                      │
│ -- Drop all recursive policies       │
│ DROP POLICY IF EXISTS ...            │
│ DROP POLICY IF EXISTS ...            │
│ ...                                  │
│                                      │
│ CREATE POLICY "Policy Name"          │
│   ON table_name FOR SELECT           │
│   ...                                │
└──────────────────────────────────────┘

Make sure you select and copy EVERYTHING.
```

---

## Step 5: Paste into Supabase SQL Editor

```
SQL Editor:
┌─────────────────────────────────────────────┐
│ SQL Editor                                  │
│ ┌─────────────────────────────────────────┐│
│ │ [+ New Query] [Run] [Format] [...]      ││
│ ├─────────────────────────────────────────┤│
│ │ /*                                      ││
│ │   Fix RLS Infinite Recursion Issue      ││
│ │   ...                                   ││
│ │ */                                      ││
│ │                                         ││
│ │ -- Drop all recursive policies          ││
│ │ DROP POLICY IF EXISTS ...               ││
│ │ ...                                     ││
│ │                                         ││
│ │ CREATE POLICY "Policy Name"             ││
│ │   ON table_name FOR SELECT              ││
│ │   ...                                   ││
│ └─────────────────────────────────────────┘│
└─────────────────────────────────────────────┘

1. Click in the query editor area
2. Paste: Ctrl+V (or Cmd+V on Mac)
3. Verify the SQL is there
```

---

## Step 6: Review the SQL (Optional)

```
Quick review checklist:

┌─────────────────────────────────────────────┐
│ Look for these sections (scroll down):      │
├─────────────────────────────────────────────┤
│ ✓ DROP POLICY IF EXISTS...                 │
│   (Many DROP statements, should see ~16)    │
│                                             │
│ ✓ -- Non-recursive beneficiaries policies  │
│   CREATE POLICY "Beneficiaries can..."     │
│                                             │
│ ✓ -- Non-recursive vendors policies        │
│   CREATE POLICY "Vendors can..."           │
│                                             │
│ ✓ -- Non-recursive transactions policies   │
│   CREATE POLICY "Users can..."             │
│                                             │
│ ✓ -- And more CREATE POLICY sections       │
└─────────────────────────────────────────────┘

All these sections should be present.
No need to understand every line, just verify it looks reasonable.
```

---

## Step 7: Execute the Query

```
SQL Editor with Ready-to-Run Query:
┌─────────────────────────────────────────────┐
│ SQL Editor                                  │
│ ┌─────────────────────────────────────────┐│
│ │ [+ New] [▶ Run] [Format] [...]          ││ ← Click [▶ Run]
│ ├─────────────────────────────────────────┤│
│ │ /* Fix RLS Infinite Recursion Issue */  ││
│ │ ...                                     ││
│ │ [Your pasted SQL here]                  ││
│ │ ...                                     ││
│ └─────────────────────────────────────────┘│
│                                             │
│ Results:                                    │
│ ┌─────────────────────────────────────────┐│
│ │ [Executing query...]                    ││
│ └─────────────────────────────────────────┘│
└─────────────────────────────────────────────┘

1. Click the blue [▶ Run] button
2. Wait for the query to execute (should take 10-30 seconds)
3. See results appear below
```

---

## Step 8: Check for Success

```
Expected Success Message:

┌─────────────────────────────────────────────┐
│ Results                                     │
│ ┌─────────────────────────────────────────┐│
│ │ ✓ Query executed successfully            ││
│ │                                          ││
│ │ Rows affected: 0                         ││
│ │ Execution time: 0.234s                   ││
│ └─────────────────────────────────────────┘│
└─────────────────────────────────────────────┘

This is GOOD! The "Rows affected: 0" is expected because
we're only modifying policies, not data.

Look for:
✓ Green checkmark or success message
✓ No red error messages
✓ Execution completed without errors
```

---

## Step 9: Verify No Errors

```
If you see an error message:

┌─────────────────────────────────────────────┐
│ Results                                     │
│ ┌─────────────────────────────────────────┐│
│ │ ERROR: Permission denied               ││
│ │ ERROR: Syntax error...                  ││
│ └─────────────────────────────────────────┘│
└─────────────────────────────────────────────┘

Common Issues:

❌ "Permission denied"
   → You don't have admin access to the database
   → Solution: Log in with admin/service role credentials

❌ "Syntax error in line X"
   → The SQL pasted incorrectly
   → Solution: Delete and re-copy the entire SQL file

❌ "Policy 'X' does not exist"
   → This is usually OK - means that specific policy wasn't there
   → The "IF EXISTS" clause handles this

✓ If you see multiple "notice: policy ... does not exist"
   → This is NORMAL and expected
   → Means those policies were already gone or named differently
```

---

## Step 10: Test the Fix

### Test 1: Login

```
In Your App:

1. Go to login page
2. Enter test user credentials
3. Click Login

Expected Result:
✓ Login succeeds
✓ No "infinite recursion" error
✓ User dashboard loads
✓ No console errors

If this works, the fix is successful!
```

### Test 2: View User Data

```
After logging in:

1. Navigate to user profile page
2. Should see: User's own profile data
3. Check: User's beneficiary data (if applicable)
4. Check: User's vendor data (if applicable)

Expected Result:
✓ All user's own data loads
✓ No "Permission denied" errors
✓ Data displays correctly
```

### Test 3: View Active Programs

```
In Your App:

1. Navigate to programs/vouchers page
2. Check: Can see active programs
3. Try: Search/filter programs

Expected Result:
✓ Active programs visible
✓ No permission errors
✓ Beneficiaries see their vouchers
✓ Vendors can view vouchers
```

---

## Step 11: Verification in SQL Editor (Optional)

```
If you want to verify the policies changed, run this query:

Copy and paste into SQL Editor:

SELECT policyname, tablename
FROM pg_policies
WHERE tablename IN ('profiles', 'beneficiaries', 'vendors', 'vouchers', 'transactions')
ORDER BY tablename, policyname;

Expected result shows policies like:
┌─────────────────────────────────────────────┐
│ policyname                    │ tablename   │
├───────────────────────────────┼─────────────┤
│ Users can view own profile    │ profiles    │
│ Users can update own profile  │ profiles    │
│ Beneficiaries can...          │ beneficiaries
│ Vendors can view own data     │ vendors     │
│ ...                           │ ...         │
└─────────────────────────────────────────────┘

Note the absence of:
✓ "Admins can view all profiles" (REMOVED)
✓ "Admins can manage..." policies (REMOVED)
```

---

## Decision Tree: Troubleshooting

```
                           Did the SQL run?
                                  |
                    ┌─────────────┴──────────────┐
                    |                            |
                   YES                          NO
                    |                            |
                    |                      Did you see
                    |                      an error?
                    |                            |
                    |                    ┌───────┴────────┐
                    |                    |                |
                    |               YES (error)      NO (nothing
                    |                    |           happened)
                    |                    |                |
              Can users log in?    Fix the error:    Paste SQL again
                    |              - Check syntax    and click Run
              ┌─────┴─────┐        - Check perms
              |           |
             YES         NO
              |           |
         Continue   See Step 9:
         to test    Common Issues
         more
              |
         Can users see
         their own data?
              |
          ┌───┴────┐
         YES       NO
          |        |
        FIXED!   Check:
          ✓       - User IDs match
                  - Records exist
                  - Run queries in SQL editor
```

---

## Success Checklist

After applying the fix, verify all these are true:

```
Database Level:
□ SQL query executed without critical errors
□ Policy count changed (should have ~13 total)
□ No "infinite recursion" policies remain

Application Level:
□ Users can log in
□ No infinite recursion errors in logs
□ Users see their own profile
□ Users see their own data
□ No permission errors for legitimate access

Admin Features:
□ Admin users are identified (still works or planned)
□ Admin access implemented at app level
□ Or admin features disabled (acceptable for now)

Performance:
□ Login page loads faster (no recursive policy eval)
□ Data queries work quickly
□ No timeout errors
```

All checked? You're done! The fix is successful.

---

## Before & After: What You'll See

### Before Fix (Broken)

```
USER TRIES TO LOGIN
        ↓
[Loading spinner...]
        ↓
[5 seconds pass...]
        ↓
ERROR: "infinite recursion detected in policy
        for relation 'profiles'"
        ↓
USER CANNOT LOG IN ✗
```

### After Fix (Working)

```
USER TRIES TO LOGIN
        ↓
[Loading spinner...]
        ↓
[2 seconds pass...]
        ↓
[Redirects to dashboard]
        ↓
USER LOGGED IN SUCCESSFULLY ✓
```

---

## Time Breakdown

| Step | Task | Time |
|------|------|------|
| 1-3 | Navigate to Supabase | 1 min |
| 4-5 | Copy & Paste SQL | 1 min |
| 6 | Review SQL (optional) | 1 min |
| 7-8 | Run & Verify | 1 min |
| 9 | Fix errors (if any) | 0-5 min |
| 10-11 | Test the fix | 2 min |
| **Total** | **Complete Fix** | **~6 min** |

---

## Quick Copy-Paste Commands

If using CLI instead of UI:

```bash
# Copy this to your terminal (after authenticating with Supabase CLI):

supabase db push

# Then navigate to your migration file:
supabase/migrations/20260318002858_fix_rls_infinite_recursion.sql

# And paste the contents of: FIX_RLS_INFINITE_RECURSION.sql
```

---

## Visual: Policy Flow Before and After

### Before (Broken - Infinite Loop)

```
User Login
    ↓
[Query profiles table]
    ↓
[Evaluate policies on profiles]
    ↓
[Policy: "Admins can view all profiles"]
    ↓
[Check: SELECT FROM profiles WHERE admin]
    ↓
[Query profiles table again!]
    ↓
[Evaluate policies on profiles again!]
    ↓
[LOOP DETECTED - RECURSION ERROR] ✗
    ↓
[Timeout/Error]
    ↓
[User cannot log in]
```

### After (Fixed - No Loop)

```
User Login
    ↓
[Query profiles table]
    ↓
[Evaluate policies on profiles]
    ↓
[Policy: "Users can view own profile"]
    ↓
[Check: auth.uid() = id]
    ↓
[No table queries - direct comparison]
    ↓
[Policy evaluation completes]
    ↓
[User data returned]
    ↓
[Login successful] ✓
```

---

## That's It!

You've successfully applied the RLS fix!

**Next Steps:**
1. Inform your team the issue is fixed
2. Ask them to test the app
3. Monitor logs for any issues
4. Read `RLS_RECURSION_ANALYSIS.md` if interested in why it happened

**Questions?**
- See: `QUICK_FIX_REFERENCE.md`
- See: `FIX_RLS_RECURSION_INSTRUCTIONS.md`
- See: `RLS_RECURSION_ANALYSIS.md`

---

*Visual Guide Complete*
