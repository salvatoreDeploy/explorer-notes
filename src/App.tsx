import { ChangeEvent, useState } from 'react'
import Logo from './assets/logo.svg'
import { NewNoteCard } from './components/NewNoteCard'
import { NoteCard } from './components/Note-Card'
import { toast } from 'sonner'

interface Note {
  id: string
  date: Date
  content: string
}

export function App() {

  const [notes, setNotes] = useState<Note[]>(() => {

    const notesOnStorage = localStorage.getItem('notes')

    if (notesOnStorage) {
      return JSON.parse(notesOnStorage)
    }

    return []
  })

  const [search, setSearch] = useState('')

  function onNoteCreated(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date,
      content
    }

    const notesArray = [newNote, ...notes]

    setNotes(notesArray)

    localStorage.setItem('notes', JSON.stringify(notesArray))
  }

  function onNoteDelete(id: string) {
    const noteArray = notes.filter(note => {
      return note.id !== id
    })

    setNotes(noteArray)

    localStorage.setItem('notes', JSON.stringify(noteArray))

    toast.success('Nota apagada com suecsso!!')
  }

  function handleSearchNote(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value

    setSearch(query)
  }

  const filteredNotes = search !== '' ? notes.filter(note => note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase())) : notes

  return (
    <div className='mx-auto max-w-6xl my-10 space-y-6 px-5 '>
      <img src={Logo} alt="" />

      <form className='w-full'>
        <input
          type="text"
          placeholder='Busque em suas notas'
          className='w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500'
          onChange={handleSearchNote}
        />
      </form>

      <div className='h-px bg-slate-700' />

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[250px] gap-6'>

        <NewNoteCard onNoteCreated={onNoteCreated} />

        {filteredNotes.map(note => {
          return <NoteCard key={note.id} note={note} onNoteDelete={onNoteDelete} />
        })}
      </div>
    </div>
  )
}


