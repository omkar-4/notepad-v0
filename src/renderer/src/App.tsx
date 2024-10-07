import { DraggableTopBar } from '@/components'
import '@renderer/assets/custom-theme.css'

import { saveAs } from 'file-saver'
import { Edit, Eye, FileText, PlusCircle, Save, Trash2, Upload } from 'lucide-react'
import { marked } from 'marked'
import React, { useEffect, useState } from 'react'

interface Note {
  id: string
  title: string
  content: string
  createdAt: Date
}

const App = () => {
  const [notes, setNotes] = useState<Note[]>([])
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [isPreview, setIsPreview] = useState(false)

  useEffect(() => {
    const fetchNotes = async () => {
      // In a real app, you'd fetch notes from a backend or local storage
      setNotes([
        {
          id: '1',
          title: 'Welcome',
          content: 'Welcome to your new notepad!',
          createdAt: new Date()
        },
        {
          id: '2',
          title: 'How to use',
          content: 'Click on a note to edit it, or create a new one.',
          createdAt: new Date()
        }
      ])
    }
    fetchNotes()
  }, [])

  const createNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'New Note',
      content: '',
      createdAt: new Date()
    }
    setNotes([newNote, ...notes])
    setSelectedNote(newNote)
  }

  const updateNote = (updatedNote: Note) => {
    setNotes(notes.map((note) => (note.id === updatedNote.id ? updatedNote : note)))
    setSelectedNote(updatedNote)
  }

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id))
    if (selectedNote?.id === id) {
      setSelectedNote(null)
    }
  }

  const saveNote = (format: 'txt' | 'md') => {
    if (selectedNote) {
      const blob = new Blob([selectedNote.content], { type: `text/${format};charset=utf-8` })
      saveAs(blob, `${selectedNote.title}.${format}`)
    }
  }

  const openFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        const newNote: Note = {
          id: Date.now().toString(),
          title: file.name.replace(/\.[^/.]+$/, ''),
          content: content,
          createdAt: new Date()
        }
        setNotes([newNote, ...notes])
        setSelectedNote(newNote)
      }
      reader.readAsText(file)
    }
  }
  return (
    <>
      <DraggableTopBar />
      {/* <RootLayout className=" flex gap-2 pt-8 pr-4 pb-4 min-w-fit">
        <Sidebar className="absolute hidden h-full w-full sm:min-w-fit sm:max-w-56 sm:block sm:static p-2 rounded-md bg-[#151515] sm:bg-transparent">
          <ActionButtonsRow className="flex justify-between mt-1 mb-1" />
          <NotePreviewList className="" />
        </Sidebar>
        <Content className="ml-4 sm:ml-0 p-4 min-w-fit w-full h-full rounded-lg flex flex-col bg-[#262626] overflow-hidden">
          <MarkdownEditor />
        </Content>
      </RootLayout> */}
      <div className="flex h-screen bg-gray-900 text-gray-100">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 p-4 flex flex-col">
          <div className="flex justify-between items-center mb-4 mt-8">
            
            <button
              onClick={createNote}
              className="p-2 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
            >
              <PlusCircle size={20} />
            </button>
          </div>
          <div className="flex-grow overflow-y-auto space-y-2">
            {notes.map((note) => (
              <div
                key={note.id}
                className={`p-2 rounded cursor-pointer flex justify-between items-center ${
                  selectedNote?.id === note.id ? 'bg-gray-700' : 'hover:bg-gray-700'
                }`}
                onClick={() => setSelectedNote(note)}
              >
                <div className="overflow-hidden">
                  <h3 className="font-medium truncate">{note.title}</h3>
                  <p className="text-sm text-gray-400 truncate">{note.content.slice(0, 50)}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteNote(note.id)
                  }}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-2">
            <button
              onClick={() => saveNote('txt')}
              className="w-full p-2 bg-green-500 rounded flex items-center justify-center hover:bg-green-600 transition-colors"
            >
              <Save size={16} className="mr-2" />
              Save as .txt
            </button>
            <button
              onClick={() => saveNote('md')}
              className="w-full p-2 bg-purple-500 rounded flex items-center justify-center hover:bg-purple-600 transition-colors"
            >
              <FileText size={16} className="mr-2" />
              Save as .md
            </button>
            <label className="w-full p-2 bg-yellow-500 rounded flex items-center justify-center hover:bg-yellow-600 transition-colors cursor-pointer">
              <Upload size={16} className="mr-2" />
              Open File
              <input type="file" accept=".txt,.md" onChange={openFile} className="hidden" />
            </label>
          </div>
        </div>

        {/* Note Editor */}
        <div className="flex-1 flex flex-col p-4">
          {selectedNote ? (
            <>
              <input
                type="text"
                value={selectedNote.title}
                onChange={(e) => updateNote({ ...selectedNote, title: e.target.value })}
                className="text-2xl font-bold mb-4 bg-transparent border-b border-gray-700 focus:outline-none focus:border-blue-500"
                placeholder="Note title"
              />
              <div className="mb-2 flex justify-between items-center">
                <button
                  onClick={() => setIsPreview(!isPreview)}
                  className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition-colors flex items-center"
                >
                  {isPreview ? (
                    <>
                      <Edit size={16} className="mr-2" /> Edit
                    </>
                  ) : (
                    <>
                      <Eye size={16} className="mr-2" /> Preview
                    </>
                  )}
                </button>
              </div>
              {isPreview ? (
                <div
                  className="flex-1 overflow-auto prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: marked(selectedNote.content) }}
                />
              ) : (
                <textarea
                  value={selectedNote.content}
                  onChange={(e) => updateNote({ ...selectedNote, content: e.target.value })}
                  className="flex-1 bg-transparent resize-none focus:outline-none"
                  placeholder="Start typing your note here..."
                />
              )}
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-500 text-xl">Select a note or create a new one</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App
