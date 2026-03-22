import { supabase } from '../lib/supabase'

export const getNotes = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    return { data: null, error: error.message }
  }
}

export const createNote = async (userId, title, content) => {
  try {
    const { data, error } = await supabase
      .from('notes')
      .insert([{ user_id: userId, title, content }])
      .select()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    return { data: null, error: error.message }
  }
}

export const updateNote = async (noteId, title, content) => {
  try {
    const { data, error } = await supabase
      .from('notes')
      .update({ title, content })
      .eq('id', noteId)
      .select()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    return { data: null, error: error.message }
  }
}

export const deleteNote = async (noteId) => {
  try {
    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', noteId)

    if (error) throw error
    return { error: null }
  } catch (error) {
    return { error: error.message }
  }
}
