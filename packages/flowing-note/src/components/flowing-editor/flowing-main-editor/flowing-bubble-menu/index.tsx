import type { Editor } from '@tiptap/react'
import './index.scss'

interface FlowingBubbleMenuProps {
  editor: Editor | null
}

const FlowingBubbleMenu = (props: FlowingBubbleMenuProps) => {
  const { editor } = props

  return (
    <div className="flowing-bubble-menu">
      <span
        onClick={() => editor?.chain().focus().toggleBold().run()}
        className={
          'flowing-bubble-menu-item' +
          (editor?.isActive('bold') ? ' flowing-bubble-menu-item-active' : '')
        }
      >
        B
      </span>
      <span
        onClick={() => editor?.chain().focus().toggleItalic().run()}
        className={
          'flowing-bubble-menu-item' +
          (editor?.isActive('italic') ? ' flowing-bubble-menu-item-active' : '')
        }
      >
        I
      </span>
      <span
        onClick={() => editor?.chain().focus().toggleStrike().run()}
        className={
          'flowing-bubble-menu-item' +
          (editor?.isActive('strike') ? ' flowing-bubble-menu-item-active' : '')
        }
      >
        S
      </span>
    </div>
  )
}

export default FlowingBubbleMenu
