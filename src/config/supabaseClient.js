import { createClient } from "@supabase/supabase-js";

const supabaseAnonKey = process.env.REACT_APP_API_KEY;
const supabaseUrl = process.env.REACT_APP_BASE_URL;

const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;