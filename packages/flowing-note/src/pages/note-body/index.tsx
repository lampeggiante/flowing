import { useMockData } from '@/hooks/useMockData'
import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'

const NoteBody = () => {
  const { id } = useParams()
  const { getNoteTitle } = useMockData()
  const noteTitle = useMemo(() => {
    return getNoteTitle(parseInt(id!))
  }, [id])

  useEffect(() => {
    /** 从路由获取笔记id */
    console.log(id)
  }, [id])
  return <>{noteTitle}</>
}

export default NoteBody
