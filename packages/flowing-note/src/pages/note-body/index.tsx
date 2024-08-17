import {
  FlowingMainEditor,
  FlowingTopHeading
} from '@/components/flowing-editor'
import { useNoteState } from '@/hooks/useNoteState'
import './note-body.scss'
import FlowingNoteInfo from '@/components/flowing-note-main/flowing-note-info'
import { useNoteTree } from '@/hooks/useNoteTree'
import { useCallback } from 'react'

const NoteBody = () => {
  const { currentNote, setNoteTitle, setNoteContent } = useNoteState()
  const { updateTreeItemTitle } = useNoteTree()

  const updateNoteTitle = useCallback(
    (title: string) => {
      updateTreeItemTitle(currentNote.noteId, title)
      setNoteTitle(title)
    },
    [currentNote, updateTreeItemTitle, setNoteTitle]
  )

  return (
    <div className="note-body">
      <FlowingTopHeading
        noteTitle={currentNote.noteTitle}
        setNoteTitle={updateNoteTitle}
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
