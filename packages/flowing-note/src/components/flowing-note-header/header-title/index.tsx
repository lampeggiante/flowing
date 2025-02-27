import { FlowingTopHeading } from '@/components/flowing-editor'
import { useNoteState } from '@/hooks/useNoteState'
import { useNoteTree } from '@/hooks/useNoteTree'
import { useCallback } from 'react'
import { useParams } from 'react-router-dom'

export function HeaderTitle() {
  const { currentNote, setNoteTitle } = useNoteState()
  const { updateTreeItemTitle } = useNoteTree()
  const { id } = useParams()

  const updateNoteTitle = useCallback(
    (title: string) => {
      updateTreeItemTitle(currentNote.noteId, title)
      setNoteTitle(title)
    },
    [currentNote, updateTreeItemTitle, setNoteTitle]
  )

  return (
    <div className="app-header-title">
      <FlowingTopHeading
        noteTitle={id ? currentNote.title : 'Welcome to Flowing Note'}
        editable={Boolean(id)}
        setNoteTitle={updateNoteTitle}
      />
    </div>
  )
}
