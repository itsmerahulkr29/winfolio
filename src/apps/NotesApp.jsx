import { useState, useEffect } from 'react'
import AppHeader from '../components/AppHeader'

const NotesApp = ({ onBack }) => {
    const [notes, setNotes] = useState(() => {
        const saved = localStorage.getItem('winfolio-notes')
        return saved ? JSON.parse(saved) : [
            { id: 1, title: 'Welcome to Notes', content: 'Start writing your notes here!', date: new Date().toISOString() }
        ]
    })
    const [selectedNote, setSelectedNote] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const [editTitle, setEditTitle] = useState('')
    const [editContent, setEditContent] = useState('')

    useEffect(() => {
        localStorage.setItem('winfolio-notes', JSON.stringify(notes))
    }, [notes])

    const createNote = () => {
        const newNote = {
            id: Date.now(),
            title: 'New Note',
            content: '',
            date: new Date().toISOString()
        }
        setNotes([newNote, ...notes])
        setSelectedNote(newNote)
        setIsEditing(true)
        setEditTitle(newNote.title)
        setEditContent(newNote.content)
    }

    const deleteNote = (id) => {
        setNotes(notes.filter(note => note.id !== id))
        setSelectedNote(null)
        setIsEditing(false)
    }

    const saveNote = () => {
        setNotes(notes.map(note =>
            note.id === selectedNote.id
                ? { ...note, title: editTitle, content: editContent, date: new Date().toISOString() }
                : note
        ))
        setIsEditing(false)
    }

    const openNote = (note) => {
        setSelectedNote(note)
        setEditTitle(note.title)
        setEditContent(note.content)
        setIsEditing(false)
    }

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    if (selectedNote) {
        return (
            <div className="app-container notes-app">
                <AppHeader
                    title={isEditing ? 'Edit Note' : selectedNote.title}
                    onBack={() => setIsEditing(false) ? null : setSelectedNote(null)}
                    actions={
                        !isEditing ? (
                            <>
                                <button className="icon-btn" onClick={() => setIsEditing(true)}>✏️</button>
                                <button className="icon-btn" onClick={() => deleteNote(selectedNote.id)}>🗑️</button>
                            </>
                        ) : (
                            <button className="icon-btn" onClick={saveNote}>💾</button>
                        )
                    }
                />
                <div className="note-editor">
                    {isEditing ? (
                        <>
                            <input
                                type="text"
                                className="note-title-input"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                placeholder="Note title"
                            />
                            <textarea
                                className="note-content-input"
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                placeholder="Write your note here..."
                            />
                        </>
                    ) : (
                        <>
                            <div className="note-date">{formatDate(selectedNote.date)}</div>
                            <div className="note-content-view">{selectedNote.content || 'No content'}</div>
                        </>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className="app-container notes-app">
            <AppHeader
                title="Notes"
                onBack={onBack}
                actions={<button className="icon-btn" onClick={createNote}>+</button>}
            />
            <div className="notes-list">
                {notes.length === 0 ? (
                    <div className="empty-state">
                        <p>No notes yet</p>
                        <button className="add-btn" onClick={createNote}>Create Note</button>
                    </div>
                ) : (
                    notes.map(note => (
                        <div key={note.id} className="note-item" onClick={() => openNote(note)}>
                            <div className="note-title">{note.title}</div>
                            <div className="note-preview">{note.content?.substring(0, 50) || 'No content'}...</div>
                            <div className="note-meta">{formatDate(note.date)}</div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default NotesApp
