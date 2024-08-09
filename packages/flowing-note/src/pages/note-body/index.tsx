import { useNoteState } from '@/hooks/useNoteState'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const NoteBody = () => {
  const { id } = useParams()
  const { currentNote, setCurrentNote } = useNoteState()
  useEffect(() => {
    /** 从路由获取笔记id */
    console.log(id)
    setCurrentNote(parseInt(id!))
  }, [id])
  return <>{currentNote.noteContent}</>
}

export default NoteBody
