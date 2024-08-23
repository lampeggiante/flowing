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

const extensions = [StarterKit]

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
      log('editor', editor)
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
          const nextText = editor?.getText()[to - 1]
          return (
            empty &&
            lastText === '/' &&
            (!previousText || previousText === '\n') &&
            (!nextText || nextText === '\n')
          )
        }}
      >
        <FlowingFloatingMenu editor={editor} />
      </FloatingMenu>
      <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
        <FlowingBubbleMenu editor={editor} />
      </BubbleMenu>
    </>
  )
}

export default FlowingMainEditor
