import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'ВАШ_URL',
  'ВАШ_ANON_KEY'
)

export function useProducts() {
  async function getProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: false })
    
    if (error) throw error
    return data
  }
  
  async function createProduct(product) {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
    
    if (error) throw error
    return data
  }
  
  return { getProducts, createProduct }
}