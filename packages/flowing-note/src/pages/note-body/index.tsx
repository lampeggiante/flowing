import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import {
  FlowingPlainText,
  FlowingTopHeading
} from '@/components/flowing-editor'
import { useNoteState } from '@/hooks/useNoteState'
import './note-body.scss'
import { useMockData } from '@/hooks/useMockData'

const NoteBody = () => {
  const { id } = useParams()
  const { currentNote, setCurrentNote } = useNoteState()
  const { getNoteTitle } = useMockData()
  const noteTitle = useMemo(() => {
    return getNoteTitle(parseInt(id!))
  }, [id, location])

  useEffect(() => {
    /** 从路由获取笔记id */
    console.log(id)
    setCurrentNote(parseInt(id!))
  }, [id])
  return (
    <div className="note-body">
      <FlowingTopHeading noteTitle={noteTitle} />
      <div>leon yu 2024-08-10</div>
      <FlowingPlainText content={currentNote.noteContent} />
    </div>
  )
}

export default NoteBody
