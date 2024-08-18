import { FlowingTopHeading } from '@/components/flowing-editor'
import { useNoteState } from '@/hooks/useNoteState'
import { useNoteTree } from '@/hooks/useNoteTree'
import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export function HeaderTitle() {
  const { currentNote, setNoteTitle } = useNoteState()
  const { updateTreeItemTitle } = useNoteTree()
  const { id } = useParams()
  const [title, setTitle] = useState(currentNote.noteTitle)

  const updateNoteTitle = useCallback(
    (title: string) => {
      updateTreeItemTitle(currentNote.noteId, title)
      setNoteTitle(title)
    },
    [currentNote, updateTreeItemTitle, setNoteTitle]
  )

  useEffect(() => {
    if (id) {
      setTitle(currentNote.noteTitle)
    } else {
      setTitle('Welcome to Flowing')
    }
  }, [id])

  return (
    <div className="app-header-title">
      <FlowingTopHeading
        noteTitle={title}
        editable={Boolean(id)}
        setNoteTitle={updateNoteTitle}
      />
    </div>
  )
}
