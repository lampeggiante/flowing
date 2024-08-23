import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import {
  BubbleMenu,
  EditorContent,
  FloatingMenu,
  useEditor
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import './index.scss'
import FlowingFloatingMenu from './flowing-floating-menu'
import FlowingBubbleMenu from './flowing-bubble-menu'
import { useEffect } from 'react'
import { log } from '@/utils/log'

interface FlowingPlainTextProps {
  /** 笔记内容 */
  content: string
  /** 持久化保存笔记 */
  setContent: (content: string) => void
}

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    }
  })
]

const FlowingMainEditor = (props: FlowingPlainTextProps) => {
  const { content, setContent } = props

  const editor = useEditor({
    extensions,
    content: content,
    editorProps: {
      attributes: {
        class: 'flowing-main-editor'
      }
    },
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML())
    }
  })

  useEffect(() => {
    if (editor?.isFocused) return
    log('当前文档内容更新', content)
    editor?.commands.setContent(content)
  }, [content])

  return (
    <>
      <EditorContent editor={editor} />
      <FloatingMenu
        editor={editor}
        shouldShow={({ editor, state }) => {
          const from = state.selection.from
          const to = state.selection.to
          const empty = from === to
          const lastText = editor?.getText()[from - 2]
          const previousText = editor?.getText()[from - 3]
          return (
            empty &&
            lastText === '/' &&
            (!previousText || previousText === '\n')
          )
        }}
      >
        <FlowingFloatingMenu editor={editor} />
      </FloatingMenu>
      <BubbleMenu editor={editor}>
        <FlowingBubbleMenu />
      </BubbleMenu>
    </>
  )
}

export default FlowingMainEditor
