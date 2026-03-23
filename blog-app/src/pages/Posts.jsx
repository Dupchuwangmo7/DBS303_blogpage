import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getPosts, createPost, deletePost, updatePost } from '../utils/posts'
import { getUserRole } from '../utils/auth'

export default function Posts({ user }) {
  const [posts, setPosts] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [expandedId, setExpandedId] = useState(null)
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    image_url: '',
    video_url: '',
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [editPost, setEditPost] = useState({
    title: '',
    content: '',
    image_url: '',
    video_url: '',
  })
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

  const handleStartEdit = (post) => {
    setEditingId(post.id)
    setEditPost({
      title: post.title,
      content: post.content,
      image_url: post.image_url || '',
      video_url: post.video_url || '',
    })
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditPost({ title: '', content: '', image_url: '', video_url: '' })
  }

  const handleUpdatePost = async (e) => {
    e.preventDefault()

    if (!editPost.title.trim() || !editPost.content.trim()) {
      setError('Title and content are required')
      return
    }

    const { error: err } = await updatePost(
      editingId,
      editPost.title,
      editPost.content,
      editPost.image_url || null,
      editPost.video_url || null
    )

    if (err) {
      setError('Failed to update post')
    } else {
      handleCancelEdit()
      setError('')
      loadPosts()
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

        {/* Edit Post Form */}
        {editingId && isAdmin && (
          <div className="card p-8 mb-8 border-l-4 border-blue-500">
            <h2 className="text-2xl font-bold text-primary mb-6">Edit Post</h2>
            <form onSubmit={handleUpdatePost} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-primary mb-2">Title</label>
                <input
                  type="text"
                  value={editPost.title}
                  onChange={(e) => setEditPost({ ...editPost, title: e.target.value })}
                  className="input-field"
                  placeholder="Post title..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">Content</label>
                <textarea
                  value={editPost.content}
                  onChange={(e) => setEditPost({ ...editPost, content: e.target.value })}
                  className="input-field h-40"
                  placeholder="Write your post here..."
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">Image URL (Optional)</label>
                <input
                  type="url"
                  value={editPost.image_url}
                  onChange={(e) => setEditPost({ ...editPost, image_url: e.target.value })}
                  className="input-field"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">YouTube URL (Optional)</label>
                <input
                  type="url"
                  value={editPost.video_url}
                  onChange={(e) => setEditPost({ ...editPost, video_url: e.target.value })}
                  className="input-field"
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>

              <div className="flex gap-3">
                <button type="submit" className="btn-primary">
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
              </div>
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
              const isExpanded = expandedId === post.id
              const contentWords = post.content.split(' ')
              const isLong = contentWords.length > 30
              const preview = isLong ? contentWords.slice(0, 30).join(' ') + '...' : post.content
              
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
                    <div className="prose prose-lg max-w-none dark:prose-invert mb-6 text-secondary">
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        components={{
                          h1: ({node, ...props}) => <h1 className="text-3xl font-bold mt-6 mb-3 text-primary" {...props} />,
                          h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-5 mb-3 text-primary" {...props} />,
                          h3: ({node, ...props}) => <h3 className="text-xl font-bold mt-4 mb-2 text-primary" {...props} />,
                          h4: ({node, ...props}) => <h4 className="text-lg font-bold mt-3 mb-2 text-primary" {...props} />,
                          p: ({node, ...props}) => <p className="my-3 leading-relaxed" {...props} />,
                          ul: ({node, ...props}) => <ul className="list-disc list-inside my-3 ml-4" {...props} />,
                          ol: ({node, ...props}) => <ol className="list-decimal list-inside my-3 ml-4" {...props} />,
                          li: ({node, ...props}) => <li className="my-2 ml-2" {...props} />,
                          code: ({node, inline, ...props}) => inline ? 
                            <code className="bg-gray-200 px-2 py-1 rounded text-sm font-mono" {...props} /> : 
                            <code className="block bg-gray-100 p-3 rounded my-3 overflow-x-auto font-mono text-sm" {...props} />,
                          pre: ({node, ...props}) => <pre className="bg-gray-800 text-gray-100 p-4 rounded my-3 overflow-x-auto" {...props} />,
                          blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gray-400 pl-4 my-3 italic text-gray-600" {...props} />,
                          a: ({node, ...props}) => <a className="text-blue-600 hover:underline" {...props} />,
                          table: ({node, ...props}) => <table className="border-collapse border border-gray-300 my-3 w-full" {...props} />,
                          th: ({node, ...props}) => <th className="border border-gray-300 p-2 bg-gray-200 font-bold" {...props} />,
                          td: ({node, ...props}) => <td className="border border-gray-300 p-2" {...props} />,
                        }}
                      >
                        {isExpanded ? post.content : preview}
                      </ReactMarkdown>
                    </div>

                    {isLong && (
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : post.id)}
                        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm"
                      >
                        {isExpanded ? 'Show Less' : 'View All'}
                      </button>
                    )}

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
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleStartEdit(post)}
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                        >
                          Edit Post
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                        >
                          Delete Post
                        </button>
                      </div>
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
