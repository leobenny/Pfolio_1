# Quick Setup Instructions

## Step 1: Create Tables in Supabase

1. Go to your Supabase project dashboard: https://app.supabase.com/project/tnopqkwqeqqqhxgwmnsi
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the **entire contents** of `supabase-schema.sql` file
5. Paste it into the SQL Editor
6. Click **Run** (or press Ctrl+Enter)
7. You should see "Success. No rows returned" - this means the tables were created!

## Step 2: Verify Tables Were Created

1. In Supabase dashboard, go to **Table Editor** in the left sidebar
2. You should see three tables:
   - `messages`
   - `projects`
   - `experiences`

## Step 3: Test Your Application

1. Start your dev server: `npm run dev`
2. Visit `http://localhost:3000`
3. Try submitting a message via the contact form
4. Visit `http://localhost:3000/admin` to manage projects and experiences

## Troubleshooting

### If you get "table not found" error:

1. Make sure you ran the SQL schema in Supabase SQL Editor
2. Check that your `.env.local` has the correct Supabase URL and key
3. Verify tables exist in Supabase Table Editor
4. Try refreshing your browser cache

### If policies fail to create:

The SQL file now includes `DROP POLICY IF EXISTS` statements, so you can run it multiple times safely.

### Quick Test Endpoint

You can also test if tables are accessible by calling:
```
POST http://localhost:3000/api/init-db
```

This will verify all three tables exist and are accessible.
