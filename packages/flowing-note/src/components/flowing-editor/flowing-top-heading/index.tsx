import { useEffect, useState } from 'react'
import './index.scss'
import { log } from '@/utils/log'

interface FlowingTopHeadingProps {
  noteTitle: string
  editable?: boolean
  setNoteTitle: (title: string) => void
}

/* Backspace - Delete - Arrow Keys - Ctrl - Shift */
const validKeyCode = [
  'Backspace',
  'Shift',
  'Control',
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'ArrowDown',
  'Delete'
]

const FlowingTopHeading = (props: FlowingTopHeadingProps) => {
  const { noteTitle, editable = true, setNoteTitle } = props
  const [title, setTitle] = useState(noteTitle)
  const [isInput, setIsInput] = useState(false)
  const maxLength = 20 // 最大字数限制

  const handleTitleInput = (e: React.FormEvent<HTMLDivElement>) => {
    if (!isInput) setIsInput(true)
    log('handleTitleInput', e.currentTarget.innerText)
    if (e.currentTarget.innerText.length > maxLength) return
    setNoteTitle(e.currentTarget.innerText)
  }

  const handleTitleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (isInput) setIsInput(false)
    setNoteTitle(e.currentTarget.innerText)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
    }
    if (
      e.currentTarget.innerText.length > maxLength - 1 &&
      !validKeyCode.includes(e.key)
    ) {
      e.preventDefault()
    }
    if (e.key === 'Backspace' && e.currentTarget.innerText.length === 0) {
      e.preventDefault()
    }
  }

  useEffect(() => {
    if (isInput) return
    setTitle(noteTitle)
  }, [noteTitle])

  return (
    <div
      contentEditable={editable}
      suppressContentEditableWarning={true}
      className="flowing-top-heading"
      onInput={handleTitleInput}
      onKeyDown={handleKeyDown}
      onBlur={handleTitleBlur}
    >
      {title}
    </div>
  )
}

export default FlowingTopHeading
