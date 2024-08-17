import { FlowingTopHeading } from '@/components/flowing-editor'
import { useNoteState } from '@/hooks/useNoteState'
import { log } from '@/utils/log'

export function HeaderTitle() {
  const { currentNote, setNoteTitle } = useNoteState()
  log(currentNote, 'currentNote')

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
