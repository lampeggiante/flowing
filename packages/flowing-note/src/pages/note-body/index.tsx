import { useCallback } from 'react'
import {
  FlowingMainEditor,
  FlowingTopHeading
} from '@/components/flowing-editor'
import { useNoteState } from '@/hooks/useNoteState'
import './note-body.scss'
import FlowingNoteInfo from '@/components/flowing-note-main/flowing-note-info'

const NoteBody = () => {
  const { currentNote, setNoteTitle, setNoteContent } = useNoteState()

  return (
    <div className="note-body">
      <FlowingTopHeading
        noteTitle={currentNote.noteTitle}
        setNoteTitle={setNoteTitle}
      />
      <FlowingNoteInfo />
      <FlowingMainEditor
        content={currentNote.noteContent}
        setContent={setNoteContent}
      />
    </div>
  )
}

export default NoteBody
