import {
  FlowingMainEditor,
  FlowingTopHeading
} from '@/components/flowing-editor'
import { useNoteState } from '@/hooks/useNoteState'
import './note-body.scss'
import FlowingNoteInfo from '@/components/flowing-note-main/flowing-note-info'
import { useNoteTree } from '@/hooks/useNoteTree'
import { useCallback, useEffect, useRef, useState } from 'react'
import { info } from 'console'

const NoteBody = () => {
  const { currentNote, setNoteTitle, setNoteContent } = useNoteState()
  const { updateTreeItemTitle } = useNoteTree()
  const [noteAuthor, setNoteAuthor] = useState<string>(currentNote.author)
  const [noteLastModified, setNoteLastModified] = useState<string>(
    currentNote.lastModified
  )
  const timer = useRef<NodeJS.Timeout>()
  const preNoteId = useRef<number>(currentNote.noteId)

  const updateNoteTitle = useCallback(
    (title: string) => {
      updateTreeItemTitle(currentNote.noteId, title)
      setNoteTitle(title)
    },
    [currentNote, updateTreeItemTitle, setNoteTitle]
  )

  const updateNoteInfo = () => {
    setNoteLastModified(currentNote.lastModified)
    setNoteAuthor(currentNote.author)
  }

  const normalUpdate = () => {
    updateNoteInfo()
    preNoteId.current = currentNote.noteId!
  }

  const throttleUpdate = () => {
    if (timer.current) {
      clearTimeout(timer.current)
    }
    timer.current = setTimeout(() => {
      updateNoteInfo()
    }, 1000)
  }

  useEffect(() => {
    info('currentNote发生了改变', currentNote)
    if (currentNote.noteId !== preNoteId.current) {
      normalUpdate()
      return
    }
    throttleUpdate()
  }, [currentNote])

  return (
    <div className="note-body">
      <FlowingTopHeading
        noteTitle={currentNote.noteTitle}
        setNoteTitle={updateNoteTitle}
      />
      <FlowingNoteInfo lastModified={noteLastModified} author={noteAuthor} />
      <FlowingMainEditor
        content={currentNote.noteContent}
        setContent={setNoteContent}
      />
    </div>
  )
}

export default NoteBody
