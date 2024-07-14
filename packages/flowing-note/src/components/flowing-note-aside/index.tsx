import { useEffect, useState } from 'react'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { asideStyle } from '@/styles/object'
import '@/styles/scss/aside.scss'
import { useViewPort } from '@/hooks/useViewport'
import { AsideHeader } from './aside-header'

export function FlowingNoteAside() {
  const [container, setContainer] = useState<HTMLElement | null>(null)
  const [opened, setOpened] = useState<boolean>(true)
  const [leftBtn, setLeftBtn] = useState<HTMLElement | null>(null)
  const [rightBtn, setRightBtn] = useState<HTMLElement | null>(null)

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

  const handleBtnClick = () => {
    if (container && leftBtn && rightBtn) {
      if (opened) {
        container.style.display = 'none'
        leftBtn.style.display = 'none'
        rightBtn.style.display = 'flex'
      } else {
        container.style.display = 'block'
        leftBtn.style.display = 'flex'
        rightBtn.style.display = 'none'
      }
      setOpened(!opened)
    }
  }

  useEffect(() => {
    const conEle = document.querySelector('.aside-container') as HTMLElement
    setContainer(conEle)
    if (container) {
      document.addEventListener('mousedown', handleMouseDown)
      document.addEventListener('mouseup', handleMouseUp)
    }
    const btnLeft = document.querySelector('.aside-button-left') as HTMLElement
    const btnRight = document.querySelector(
      '.aside-button-right'
    ) as HTMLElement
    setLeftBtn(btnLeft)
    setRightBtn(btnRight)

    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [container])
  return (
    <>
      <div className="aside-container" style={asideStyle}>
        <AsideHeader />
        <button className="aside-button-left" onClick={handleBtnClick}>
          <LeftOutlined />
        </button>
        <div className="aside-cursor" />
      </div>
      <button className="aside-button-right" onClick={handleBtnClick}>
        <RightOutlined />
      </button>
    </>
  )
}
