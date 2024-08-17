import { FlowingTopHeading } from '@/components/flowing-editor'
import { useNoteState } from '@/hooks/useNoteState'
import { useNoteTree } from '@/hooks/useNoteTree'
import { useCallback } from 'react'

export function HeaderTitle() {
  const { currentNote, setNoteTitle } = useNoteState()
  const { updateTreeItemTitle } = useNoteTree()

  const updateNoteTitle = useCallback(
    (title: string) => {
      updateTreeItemTitle(currentNote.noteId, title)
      setNoteTitle(title)
    },
    [currentNote, updateTreeItemTitle, setNoteTitle]
  )

  return (
    <div className="app-header-title">
      {currentNote.noteId === 0 ? (
        <div className="flowing-top-heading">
          <p>Welcome to Flowing</p>
        </div>
      ) : (
        <FlowingTopHeading
          noteTitle={currentNote.noteTitle}
          editable={currentNote.noteId !== 0}
          setNoteTitle={updateNoteTitle}
        />
      )}
    </div>
  )
}
