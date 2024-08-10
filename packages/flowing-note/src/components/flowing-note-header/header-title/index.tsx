import { FlowingTopHeading } from '@/components/flowing-editor'
import { useNoteState } from '@/hooks/useNoteState'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export function HeaderTitle() {
  const { id } = useParams()
  const { currentNote, setCurrentNote, setNoteTitle } = useNoteState()

  useEffect(() => {
    /** 从路由获取笔记id */
    setCurrentNote(parseInt(id!))
  }, [id])

  return (
    <div className="app-header-title">
      <FlowingTopHeading
        noteTitle={currentNote.noteTitle}
        setNoteTitle={setNoteTitle}
      />
    </div>
  )
}
