import { notesMock } from '@/store/mocks'
import { ComponentProps } from 'react'
import { LuFileSignature } from 'react-icons/lu'
import { twMerge } from 'tailwind-merge'
import { NotePreview } from './NotePreview'

export const NotePreviewList = ({ className, ...props }: ComponentProps<'ul'>) => {
  if (notesMock.length === 0) {
    return (
      <ul className={twMerge('text-center pt-4 ', className)}>
        <span className="text-wrap">
          No Notes Yet!
          <br />
          <br />
          Click <LuFileSignature className="inline-block w-4 h-4 text-[#f2f2f2]" /> to
          <br />
          create new note
        </span>
      </ul>
    )
  }

  return (
    <ul {...props} className={twMerge('flex flex-col gap-1', className)}>
      {notesMock.map((note) => (
        // <li key={note.title}>{note.title}</li>
        <NotePreview key={note.title + note.lastEditTime} {...note} />
      ))}
    </ul>
  )
}
