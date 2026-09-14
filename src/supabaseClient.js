import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://vnvexshobuklitzayokm.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZudmV4c2hvYnVrbGl0emF5b2ttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkzNDU5MzQsImV4cCI6MjEwNDkyMTkzNH0.I-leT2bs14ZFuhNaQ46NJ7LhBGMLYeanb1IvfnvBzFA";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
