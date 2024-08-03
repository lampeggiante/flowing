import { useMockData } from '@/hooks/useMockData'
import { useMemo } from 'react'
import { useLocation, useParams } from 'react-router-dom'

export function HeaderTitle() {
  const { id } = useParams()
  const location = useLocation()
  const { getNoteTitle } = useMockData()
  const noteTitle = useMemo(() => {
    return getNoteTitle(parseInt(id!))
  }, [id, location])

  return <h3 className="app-header-title">{noteTitle}</h3>
}
