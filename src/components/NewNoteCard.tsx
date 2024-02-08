import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner'

interface NewNoteCardProps {
  onNoteCreated: (content: string) => void
}

let speechRecognition: SpeechRecognition | null = null

export function NewNoteCard({ onNoteCreated }: NewNoteCardProps) {

  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true)
  const [content, setContent] = useState('')
  const [isRecording, setIsRecording] = useState(false)

  function handleStartEditor() {
    setShouldShowOnboarding(false)
  }

  function handleContentChanded(event: ChangeEvent<HTMLTextAreaElement>) {

    setContent(event.target.value)

    if (event.target.value === '') {
      setShouldShowOnboarding(true)
    }
  }

  function handleSaveNote(event: FormEvent) {
    event.preventDefault()

    if (content === '') {

      toast.error('Nota vazia!')

      return
    }

    onNoteCreated(content)

    setContent('')

    setShouldShowOnboarding(true)

    toast.success('Nota criada com sucesso')
  }

  function handleStartRecording() {

    const isSpeechRecognitionAPIAvailable = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window

    if (!isSpeechRecognitionAPIAvailable) {
      toast.warning('Infelizmente seu navegador não suporta a API de gravação')

      return
    }

    setIsRecording(true)
    setShouldShowOnboarding(false)

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition

    const speechRecognition = new SpeechRecognitionAPI()

    speechRecognition.lang = 'pt-BR'
    speechRecognition.continuous = true
    speechRecognition.maxAlternatives = 1
    speechRecognition.interimResults = true

    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript)
      }, '')

      setContent(transcription)
    }

    speechRecognition.onerror = (event) => {
      console.log(event)
    }

    speechRecognition.start()
  }

  function handleStopRecording() {
    setIsRecording(false)

    if (speechRecognition !== null) {
      speechRecognition.stop()
    }

    speechRecognition?.stop()
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className='flex flex-col rounded-md bg-slate-700 p-5 text-left gap-3 outline-none hover:ring-2 hover:ring-slate-600 focus:ring-2 focus:ring-lime-400'>
        <span className='text-sm font-medium text-slate-200 '>Adicionar nota</span>
        <p className='text-sm leading-6 text-slate-400'>Grave uma nota em áudio que será convertida para texto automaticamente.</p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className='inset-0 fixed bg-black/60' />
        <Dialog.Content className='fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-slate-700 md:rounded-sm flex flex-col outline-none'>

          <Dialog.DialogClose className='absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100'>
            <X className='size-5' />
          </Dialog.DialogClose>

          <form className='flex flex-1 flex-col'>
            <div className='flex flex-1 flex-col gap-3 p-5'>
              <span className='text-sm font-medium text-slate-300 '>
                Adicionar Nota
              </span>
              {
                shouldShowOnboarding ? (
                  <p className='text-sm leading-6 text-slate-400'>
                    Comece <button type='button' onClick={handleStartRecording} className='font-medium text-lime-400 hover:underline'>gravando uma nota</button> em aúdio ou se preferir <button type='button' onClick={handleStartEditor} className='font-medium text-lime-400 hover:underline'>utilize apenas texto</button>
                  </p>) : (
                  <textarea
                    autoFocus
                    className='text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none'
                    onChange={handleContentChanded}
                    value={content}
                  />
                )
              }
            </div>

            {isRecording ? (
              <button
                onClick={handleStopRecording}
                type='button'
                className='w-full flex items-center justify-center gap-3 bg-slate-900 py-4 text-center text-sm text-slate-300 outline-none font-medium hover:text-slate-300'
              >
                <div className='size-3 rounded-full bg-red-500 animate-pulse'></div>
                Gravando! (Clique para interromper)
              </button>
            ) : (
              <button
                onClick={handleSaveNote}
                type='button'
                className='w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500'
              >
                Salvar nota
              </button>
            )}
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}