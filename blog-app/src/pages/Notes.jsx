import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getNotes, createNote, updateNote, deleteNote } from '../utils/notes'

export default function Notes({ user }) {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState({ title: '', content: '' })
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
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
              {notes.map((note) => (
                <div key={note.id} className="card p-6">
                  <h3 className="text-xl font-bold text-primary mb-3">{note.title}</h3>
                  <p className="text-secondary mb-4 line-clamp-3">{note.content}</p>
                  <p className="text-xs text-gray-400 mb-4">
                    {new Date(note.created_at).toLocaleDateString()}
                  </p>
                  <button
                    onClick={() => handleDelete(note.id)}
                    className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
