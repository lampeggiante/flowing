import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  FlowingMainEditor,
  FlowingTopHeading
} from '@/components/flowing-editor'
import { useNoteState } from '@/hooks/useNoteState'
import './note-body.scss'
import FlowingNoteInfo from '@/components/flowing-note-main/flowing-note-info'

const NoteBody = () => {
  const { id } = useParams()
  const { currentNote, setCurrentNote, setNoteTitle } = useNoteState()

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
      <FlowingMainEditor content={currentNote.noteContent} />
    </div>
  )
}

export default NoteBody
