import { useEffect, useState } from 'react'
import { asideStyle } from '../../styles/object'
import '../../styles/scss/aside.scss'
import { useViewPort } from '../../hooks/useViewport'

export function FlowingNoteAside() {
  const [container, setContainer] = useState<HTMLElement | null>(null)

  const handleMouseMove = (e: MouseEvent) => {
    if (!container) return
    const minWidth = parseInt(container.style.minWidth)
    const { vw } = useViewPort()
    const maxWidth = (parseInt(container.style.maxWidth) * vw) / 100
    if (e.clientX - container.offsetLeft > maxWidth) {
      container.style.width = maxWidth + 'px'
    } else if (e.clientX - container.offsetLeft < minWidth) {
      container.style.width = minWidth + 'px'
    } else {
      container.style.width = e.clientX - container.offsetLeft + 'px'
    }
  }

  const handleMouseDown = (e: any) => {
    if (e.target.className !== 'aside-cursor') return
    document.addEventListener('mousemove', handleMouseMove)
  }

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove)
  }

  useEffect(() => {
    const ele = document.querySelector('.aside-container') as HTMLElement
    setContainer(ele)
    if (container) {
      document.addEventListener('mousedown', handleMouseDown)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [container])
  return (
    <div className="aside-container" style={asideStyle}>
      <div className="aside-cursor" />
    </div>
  )
}
