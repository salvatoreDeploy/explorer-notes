import Logo from './assets/logo.svg'
import { NewNoteCard } from './components/NewNoteCard'
import { NoteCard } from './components/Note-Card'

export function App() {
  return (
    <div className='mx-auto max-w-6xl my-10 space-y-6'>
      <img src={Logo} alt="" />

      <form className='w-full'>
        <input
          type="text"
          placeholder='Busque em suas notas'
          className='w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500' />
      </form>

      <div className='h-px bg-slate-700' />

      <div className='grid grid-cols-3 auto-rows-[250px] gap-6'>

        <NewNoteCard />

        <NoteCard note={{
          date: new Date(),
          content: 'Hello'
        }} />

        <NoteCard note={{
          date: new Date(2022, 0, 3),
          content: 'Hello Word'
        }} />
      </div>
    </div>
  )
}


