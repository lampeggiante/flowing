import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'

const extensions = [StarterKit]

interface FlowingPlainTextProps {
  content: string
}

const FlowingPlainText = (props: FlowingPlainTextProps) => {
  const { content } = props
  console.log('content', content)
  const newContent = '<p>' + content + '</p>'
  console.log('newContent', newContent)
  const editor = useEditor({
    extensions: extensions,
    content: `<h1>${content}</h1>`
  })

  useEffect(() => {
    editor?.commands.setContent(newContent)
  }, [content])

  return <EditorContent editor={editor} />
}

export default FlowingPlainText
