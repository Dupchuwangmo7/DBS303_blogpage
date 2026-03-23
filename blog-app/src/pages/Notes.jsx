import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getNotes, createNote, updateNote, deleteNote } from '../utils/notes'

export default function Notes({ user }) {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState({ title: '', content: '' })
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [expandedId, setExpandedId] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }

    loadNotes()
  }, [user, navigate])

  const loadNotes = async () => {
    if (!user) return
    
    const { data, error: err } = await getNotes(user.id)
    if (err) {
      setError('Failed to load notes')
    } else {
      setNotes(data || [])
      setError('')
    }
    setLoading(false)
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    if (!newNote.title.trim() || !newNote.content.trim()) {
      setError('Title and content are required')
      return
    }

    const { error: err } = await createNote(user.id, newNote.title, newNote.content)
    if (err) {
      setError('Failed to create note')
    } else {
      setNewNote({ title: '', content: '' })
      setError('')
      loadNotes()
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Delete this note?')) {
      const { error: err } = await deleteNote(id)
      if (err) {
        setError('Failed to delete note')
      } else {
        loadNotes()
      }
    }
  }

  if (loading) {
    return <div className="min-h-[calc(100vh-100px)] flex items-center justify-center text-secondary">Loading...</div>
  }

  return (
    <div className="min-h-[calc(100vh-100px)] bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-primary mb-8">My Notes</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Create Note Form */}
        <div className="card p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Create New Note</h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-primary mb-2">Title</label>
              <input
                type="text"
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                className="input-field"
                placeholder="Note title..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">Content</label>
              <textarea
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                className="input-field h-32"
                placeholder="Write your note here..."
              ></textarea>
            </div>

            <button type="submit" className="btn-primary">
              Save Note
            </button>
          </form>
        </div>

        {/* Notes List */}
        <div>
          <h2 className="text-2xl font-bold text-primary mb-6">Your Notes ({notes.length})</h2>

          {notes.length === 0 ? (
            <div className="card p-8 text-center text-secondary">
              No notes yet. Create your first note above!
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {notes.map((note) => {
                const isExpanded = expandedId === note.id
                const contentWords = note.content.split(' ')
                const isLong = contentWords.length > 50
                const preview = isLong ? contentWords.slice(0, 50).join(' ') + '...' : note.content
                
                return (
                  <div key={note.id} className="card p-6">
                    <h3 className="text-xl font-bold text-primary mb-3">{note.title}</h3>
                    <div className="prose prose-lg max-w-none dark:prose-invert mb-4 text-secondary">
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
                        {isExpanded ? note.content : preview}
                      </ReactMarkdown>
                    </div>
                    <p className="text-xs text-gray-400 mb-4">
                      {new Date(note.created_at).toLocaleDateString()}
                    </p>
                    <div className="flex gap-2">
                      {isLong && (
                        <button
                          onClick={() => setExpandedId(isExpanded ? null : note.id)}
                          className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm"
                        >
                          {isExpanded ? 'Show Less' : 'View All'}
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(note.id)}
                        className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
