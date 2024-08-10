import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'

interface FlowingPlainTextProps {
  content: string
}

const FlowingPlainText = (props: FlowingPlainTextProps) => {
  const { content } = props
  console.log('content', content)
  const newContent = '<p>' + content + '</p>'
  console.log('newContent', newContent)
  const editor = useEditor({
    extensions: [StarterKit],
    content: `<h1>${content}</h1>`,
    editorProps: {
      attributes: {
        class: 'flowing-plain-text'
      },
      handleDOMEvents: {
        keydown: (_, event) => {
          switch (event.key) {
            case 'Enter': {
              event.preventDefault()
              console.log('plain text 想要创建新的block')
              console.log('text:', editor?.getHTML())
              break
            }
          }
        }
      }
    }
  })

  useEffect(() => {
    editor?.commands.setContent(newContent)
  }, [content])

  return <EditorContent editor={editor} />
}

export default FlowingPlainText
