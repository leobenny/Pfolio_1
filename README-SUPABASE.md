# Supabase Setup Instructions

## 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign up/login
2. Create a new project
3. Wait for the project to be fully provisioned

## 2. Set Up Database Tables

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy and paste the contents of `supabase-schema.sql`
3. Click **Run** to execute the SQL script
4. This will create:
   - `messages` table (for contact form submissions)
   - `projects` table (for managing projects)
   - `experiences` table (for managing experiences)
   - Row Level Security (RLS) policies

## 3. Get Your API Keys

1. In Supabase dashboard, go to **Settings** → **API**
2. Copy your **Project URL** and **anon/public key**
3. Create a `.env.local` file in the root of your project (copy from `.env.local.example`)
4. Paste your credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## 4. Set Up Authentication (Optional but Recommended)

For the admin interface to work securely, you should set up authentication:

1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Enable Email provider (or your preferred auth method)
3. Create a user account for yourself
4. Update the admin page to check for authenticated users

## 5. Test the Setup

1. Start your development server: `npm run dev`
2. Visit `http://localhost:3000` and try submitting a message via the contact form
3. Visit `http://localhost:3000/admin` to access the admin dashboard

## Notes

- The contact form allows anyone to submit messages (no auth required)
- The admin interface currently doesn't require authentication - you should add this for production
- Projects and experiences can be managed through the admin interface
- All data is stored in Supabase and can be viewed in the Supabase dashboard under **Table Editor**
