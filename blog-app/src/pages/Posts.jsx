import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getPosts, createPost, deletePost } from '../utils/posts'
import { getUserRole } from '../utils/auth'

export default function Posts({ user }) {
  const [posts, setPosts] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    image_url: '',
    video_url: '',
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }
    loadUserRole()
    loadPosts()
  }, [user])

  const loadUserRole = async () => {
    const { role } = await getUserRole(user.id)
    setIsAdmin(role === 'admin')
  }

  const loadPosts = async () => {
    if (!user) return
    
    const { data, error: err } = await getPosts()
    if (err) {
      setError('Failed to load posts')
    } else {
      setPosts(data || [])
      setError('')
    }
    setLoading(false)
  }

  const handleCreate = async (e) => {
    e.preventDefault()

    if (!newPost.title.trim() || !newPost.content.trim()) {
      setError('Title and content are required')
      return
    }

    const { error: err } = await createPost(
      user.id,
      newPost.title,
      newPost.content,
      newPost.image_url || null,
      newPost.video_url || null
    )

    if (err) {
      setError('Failed to create post')
    } else {
      setNewPost({ title: '', content: '', image_url: '', video_url: '' })
      setShowForm(false)
      setError('')
      loadPosts()
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Delete this post?')) {
      const { error: err } = await deletePost(id)
      if (err) {
        setError('Failed to delete post')
      } else {
        loadPosts()
      }
    }
  }

  const extractYouTubeId = (url) => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/
    const match = url?.match(regex)
    return match ? match[1] : null
  }

  if (loading) {
    return <div className="min-h-[calc(100vh-100px)] flex items-center justify-center text-secondary">Loading...</div>
  }

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-100px)] bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md text-center card p-8">
          <h1 className="text-4xl font-bold text-primary mb-4">Vlog Posts</h1>
          <p className="text-secondary mb-6">
            Sign in to view and discuss vlog posts. Only the admin can create posts.
          </p>
          <Link to="/login" className="btn-primary inline-block mb-4">
            Login to View Posts
          </Link>
          <p className="text-secondary text-sm">
            Don't have an account? <Link to="/signup" className="text-primary font-semibold hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-100px)] bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-primary">Vlog Posts</h1>
          {isAdmin && (
            <button
              onClick={() => setShowForm(!showForm)}
              className="btn-primary"
            >
              {showForm ? 'Cancel' : 'New Post'}
            </button>
          )}
        </div>

        {!isAdmin && user && (
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-6">
            📖 You can view posts here. Only the admin can create new posts.
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Create Post Form - Only for Admin */}
        {showForm && isAdmin && (
          <div className="card p-8 mb-8">
            <h2 className="text-2xl font-bold text-primary mb-6">Create New Post</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-primary mb-2">Title</label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  className="input-field"
                  placeholder="Post title..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">Content</label>
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  className="input-field h-40"
                  placeholder="Write your post here..."
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">Image URL (Optional)</label>
                <input
                  type="url"
                  value={newPost.image_url}
                  onChange={(e) => setNewPost({ ...newPost, image_url: e.target.value })}
                  className="input-field"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">YouTube URL (Optional)</label>
                <input
                  type="url"
                  value={newPost.video_url}
                  onChange={(e) => setNewPost({ ...newPost, video_url: e.target.value })}
                  className="input-field"
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>

              <button type="submit" className="btn-primary">
                Publish Post
              </button>
            </form>
          </div>
        )}

        {/* Posts List */}
        {posts.length === 0 ? (
          <div className="card p-8 text-center text-secondary">
            No posts yet. Create your first vlog post above!
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => {
              const youtubeId = extractYouTubeId(post.video_url)
              return (
                <div key={post.id} className="card overflow-hidden">
                  {post.image_url && (
                    <div className="w-full h-64 bg-gray-200 overflow-hidden">
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        onError={(e) => (e.target.style.display = 'none')}
                      />
                    </div>
                  )}

                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-primary mb-2">{post.title}</h2>
                    <p className="text-sm text-gray-400 mb-4">
                      {new Date(post.created_at).toLocaleDateString()}
                    </p>
                    <p className="text-secondary mb-6 leading-relaxed">{post.content}</p>

                    {youtubeId && (
                      <div className="mb-6 aspect-video">
                        <iframe
                          width="100%"
                          height="100%"
                          src={`https://www.youtube.com/embed/${youtubeId}`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title={post.title}
                        ></iframe>
                      </div>
                    )}

                    {isAdmin && (
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                      >
                        Delete Post
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
