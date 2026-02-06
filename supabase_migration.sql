-- Add missing columns to orders table
-- Run this in Supabase SQL Editor

-- Add shipping_method column if it doesn't exist
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS shipping_method TEXT;

-- Add total_price column if it doesn't exist
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS total_price NUMERIC;

-- Verify the columns were added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'orders';
