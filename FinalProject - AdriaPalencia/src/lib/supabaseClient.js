import { createClient } from '@supabase/supabase-js'

const ApiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhubXFsZmVvenl3bHZ4d2ZocW1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI0MTQ0MTIsImV4cCI6MTk5Nzk5MDQxMn0.evxB-ffgShLO7R9KHh2xfsaYyeDrwGVg7FnjVco1JaA";

export const supabase = createClient("https://xnmqlfeozywlvxwfhqmn.supabase.co", ApiKey);
