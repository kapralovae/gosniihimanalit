import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async () => {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseKey) {
    return []
  }
  
  const supabase = createClient(supabaseUrl, supabaseKey)
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
  
  if (error) {
    console.error('Ошибка Supabase:', error.message)
    return []
  }
  
  return data || []
})