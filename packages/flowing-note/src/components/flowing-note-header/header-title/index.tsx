import { FlowingTopHeading } from '@/components/flowing-editor'
import { useNoteState } from '@/hooks/useNoteState'

export function HeaderTitle() {
  const { currentNote, setNoteTitle } = useNoteState()

  return (
    <div className="app-header-title">
      <FlowingTopHeading
        noteTitle={
          currentNote.noteId === 0
            ? '<h1>Welcome to Flowing Note</h1>'
            : currentNote.noteTitle
        }
        editable={currentNote.noteId !== 0}
        setNoteTitle={setNoteTitle}
      />
    </div>
  )
}
