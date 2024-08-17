import { FlowingTopHeading } from '@/components/flowing-editor'
import { useNoteState } from '@/hooks/useNoteState'

export function HeaderTitle() {
  const { currentNote, setNoteTitle } = useNoteState()

  return (
    <div className="app-header-title">
      <FlowingTopHeading
        noteTitle={currentNote.noteTitle}
        setNoteTitle={setNoteTitle}
      />
    </div>
  )
}
