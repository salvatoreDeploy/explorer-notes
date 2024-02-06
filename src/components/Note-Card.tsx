import * as Dialog from '@radix-ui/react-dialog'

interface NoteCardProps {
  note: {
    date: Date
    content: string
  }
}

export function NoteCard(props: NoteCardProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className='flex flex-col rounded-md text-left bg-slate-700 p-5 gap-3 overflow-hidden outline-none relative hover:ring-2 hover:ring-slate-600 focus:ring-2 focus:ring-lime-400'>
        <span className='text-sm font-medium text-slate-300 '>{props.note.date.toISOString()}</span>
        <p className='text-sm leading-6 text-slate-400'>
          {props.note.content}
        </p>
        <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/70 to-black/0 pointer-events-none' />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='inset-0 fixed bg-black/60' />
        <Dialog.Content className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full bg-slate-700 rounded-sm flex flex-col outline-none'>
          OI
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}