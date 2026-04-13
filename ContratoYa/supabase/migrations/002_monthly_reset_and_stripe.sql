-- Monthly counter reset function
-- Run this in your Supabase SQL Editor
-- Then set up a Supabase Cron Job to run it on the 1st of each month

-- Function to reset monthly document counters
CREATE OR REPLACE FUNCTION public.reset_monthly_counters()
RETURNS void AS $$
BEGIN
  UPDATE public.users SET documents_generated_this_month = 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable pg_cron extension (needed for scheduled jobs)
-- Note: You need to enable this in Supabase Dashboard → Database → Extensions → pg_cron
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule monthly reset on the 1st of each month at midnight UTC
SELECT cron.schedule(
  'reset-monthly-doc-counters',
  '0 0 1 * *',
  'SELECT public.reset_monthly_counters()'
);

-- Function to upgrade user to Pro (called by Stripe webhook or manually)
CREATE OR REPLACE FUNCTION public.upgrade_user_to_pro(user_email TEXT, duration_months INT DEFAULT 1)
RETURNS void AS $$
BEGIN
  UPDATE public.users
  SET subscription_tier = 'pro',
      subscription_expires_at = now() + (duration_months || ' months')::interval
  WHERE email = user_email;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check and downgrade expired subscriptions
CREATE OR REPLACE FUNCTION public.check_expired_subscriptions()
RETURNS void AS $$
BEGIN
  UPDATE public.users
  SET subscription_tier = 'free',
      subscription_expires_at = NULL
  WHERE subscription_tier = 'pro'
    AND subscription_expires_at IS NOT NULL
    AND subscription_expires_at < now();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Schedule daily check for expired subscriptions
SELECT cron.schedule(
  'check-expired-subscriptions',
  '0 2 * * *',
  'SELECT public.check_expired_subscriptions()'
);
