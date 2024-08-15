import { useContext, useEffect, useState } from 'react'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import './aside.scss'
import { AsideHeader } from './aside-header'
import { GlobalConfigCtx } from '../config-context'
import { FlowingButton } from 'flowing-components'
import AsideNoteTree from './aside-note-tree'

export function FlowingNoteAside() {
  /** states */
  const [container, setContainer] = useState<HTMLElement | null>(null)
  const [leftBtn, setLeftBtn] = useState<HTMLElement | null>(null)
  const [rightBtn, setRightBtn] = useState<HTMLElement | null>(null)

  /** hooks */
  const { openAside, setOpenAside, asideWidth, setAsideWidth } =
    useContext(GlobalConfigCtx)

  const handleMouseMove = (e: MouseEvent) => {
    if (!container) return
    const minWidth = parseInt(container.style.minWidth)
    const vw = document.body.clientWidth
    const maxWidth = (parseInt(container.style.maxWidth) * vw) / 100
    let targetWidth
    if (e.clientX - container.offsetLeft > maxWidth) {
      targetWidth = maxWidth + 'px'
    } else if (e.clientX - container.offsetLeft < minWidth) {
      targetWidth = minWidth + 'px'
    } else {
      targetWidth = e.clientX - container.offsetLeft + 'px'
    }
    container.style.width = targetWidth
    setAsideWidth(targetWidth)
  }

  const handlePreventSelect = (e: any) => e.preventDefault()

  const handleMouseDown = (e: any) => {
    if (e.target.className !== 'aside-cursor') return
    document.addEventListener('selectstart', handlePreventSelect)
    document.addEventListener('mousemove', handleMouseMove)
  }

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('selectstart', handlePreventSelect)
  }

  const handleTabOpen = () => {
    container!.style.display = 'block'
    leftBtn!.style.display = 'flex'
    rightBtn!.style.display = 'none'
  }

  const handleTabClose = () => {
    container!.style.display = 'none'
    leftBtn!.style.display = 'none'
    rightBtn!.style.display = 'flex'
  }

  const handleBtnClick = () => {
    if (container && leftBtn && rightBtn) {
      if (openAside) {
        handleTabClose()
      } else {
        handleTabOpen()
      }
      setOpenAside(!openAside)
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
    <aside>
      <div
        className="aside-container"
        style={{
          display: openAside ? 'block' : 'none',
          width: asideWidth || '250px'
        }}
      >
        <div className="aside-cursor" />
        <AsideHeader />
        <FlowingButton
          className="aside-button aside-button-left"
          style={{ display: openAside ? 'flex' : 'none' }}
          onClick={handleBtnClick}
          prefixIcon={<LeftOutlined />}
        />
        <AsideNoteTree />
      </div>
      <FlowingButton
        className="aside-button aside-button-right"
        onClick={handleBtnClick}
        prefixIcon={<RightOutlined />}
        style={{ display: openAside ? 'none' : 'flex' }}
      />
    </aside>
  )
}
