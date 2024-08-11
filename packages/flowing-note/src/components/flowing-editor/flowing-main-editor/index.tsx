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

interface FlowingPlainTextProps {
  content: string
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
  const { content } = props

  const editorProps = {
    attributes: {
      class: 'flowing-main-editor'
    }
  }

  const editor = useEditor({
    extensions,
    content: content,
    editorProps
  })

  useEffect(() => {
    __DEV__ && console.log('当前文档内容更新', content)
    editor?.commands.setContent(content)
  }, [content])

  return (
    <>
      <EditorContent editor={editor} />
      <FloatingMenu editor={editor}>
        <FlowingFloatingMenu />
      </FloatingMenu>
      <BubbleMenu editor={editor}>
        <FlowingBubbleMenu />
      </BubbleMenu>
    </>
  )
}

export default FlowingMainEditor
