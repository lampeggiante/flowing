import { FlowingTopHeading } from '@/components/flowing-editor'
import { useNoteState } from '@/hooks/useNoteState'

export function HeaderTitle() {
  const { currentNote, setNoteTitle } = useNoteState()

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
          setNoteTitle={setNoteTitle}
        />
      )}
    </div>
  )
}
