import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  FlowingPlainText,
  FlowingTopHeading
} from '@/components/flowing-editor'
import { useNoteState } from '@/hooks/useNoteState'
import './note-body.scss'
import FlowingNoteInfo from '@/components/flowing-note-main/flowing-note-info'

const NoteBody = () => {
  const { id } = useParams()
  const {
    currentNote,
    setCurrentNote,
    setNoteTitle,
    setNoteContent,
    addNoteContent
  } = useNoteState()
  const [focusId, setFocusId] = useState<number>(NaN)

  const NoteContent = () => {
    return (
      <>
        {currentNote.noteContent.map((note) => (
          <div
            key={note.contentId}
            data-content-zone-id={note.contentId}
            className="note-body-item"
          >
            <FlowingPlainText
              content={note.content}
              contentId={note.contentId}
              setNoteContent={setNoteContent}
              addNoteContent={addNoteContent}
              focusId={focusId}
              setFocusId={setFocusId}
            />
          </div>
        ))}
      </>
    )
  }

  useEffect(() => {
    /** 从路由获取笔记id */
    setCurrentNote(parseInt(id!))
  }, [id])
  return (
    <div className="note-body">
      <FlowingTopHeading
        noteTitle={currentNote.noteTitle}
        setNoteTitle={setNoteTitle}
      />
      <FlowingNoteInfo />
      <NoteContent />
    </div>
  )
}

export default NoteBody
