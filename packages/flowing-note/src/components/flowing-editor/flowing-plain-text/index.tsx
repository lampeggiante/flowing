import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'
import './index.scss'
import { NoteContentNode } from '@/hooks/useNoteState'

interface FlowingPlainTextProps {
  content: string
  contentId: number
  addNoteContent: (id: number) => number
  setNoteContent: (note: NoteContentNode) => void
  focusId: number
  setFocusId: (id: number) => void
}

const FlowingPlainText = (props: FlowingPlainTextProps) => {
  const {
    content,
    contentId,
    addNoteContent,
    setNoteContent,
    focusId,
    setFocusId
  } = props
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    editorProps: {
      attributes: {
        class: 'flowing-plain-text'
      },
      handleDOMEvents: {
        keydown: (_, event) => {
          switch (event.key) {
            case 'Enter': {
              event.preventDefault()
              const newNoteId = addNoteContent(contentId)
              setFocusId(newNoteId)
              console.log('plain text 想要创建新的block')
              console.log('text:', editor?.getHTML())
              break
            }
          }
        }
      }
    },
    /** 编辑事件 */
    onUpdate: ({ editor }) => {
      console.log('plain text 更新了')
      console.log('text:', editor?.getHTML())
      const newContent = editor?.getHTML()
      setNoteContent({ contentId, content: newContent })
    }
  })

  useEffect(() => {
    editor?.commands.setContent(content)
  }, [content])

  useEffect(() => {
    if (focusId === contentId) {
      editor?.commands.focus()
    }
  }, [focusId])

  return <EditorContent editor={editor} />
}

export default FlowingPlainText
