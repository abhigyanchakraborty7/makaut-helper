import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://kbvemcucrehepivfnoty.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtidmVtY3VjcmVoZXBpdmZub3R5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2Njk1ODUsImV4cCI6MjA5MTI0NTU4NX0.AyQrXB90k7mCiE_cerFJa7_qZyVotqsOyN8dq2GaphI'
)