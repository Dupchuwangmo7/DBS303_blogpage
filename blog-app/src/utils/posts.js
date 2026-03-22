import { supabase } from '../lib/supabase'

export const getPosts = async () => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    return { data: null, error: error.message }
  }
}

export const createPost = async (userId, title, content, imageUrl = null, videoUrl = null) => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .insert([{
        user_id: userId,
        title,
        content,
        image_url: imageUrl,
        video_url: videoUrl,
      }])
      .select()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    return { data: null, error: error.message }
  }
}

export const updatePost = async (postId, title, content, imageUrl = null, videoUrl = null) => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .update({ title, content, image_url: imageUrl, video_url: videoUrl })
      .eq('id', postId)
      .select()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    return { data: null, error: error.message }
  }
}

export const deletePost = async (postId) => {
  try {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', postId)

    if (error) throw error
    return { error: null }
  } catch (error) {
    return { error: error.message }
  }
}
