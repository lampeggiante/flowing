import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useCallback, useEffect } from 'react'
import './index.scss'
import { NoteContentNode } from '@/hooks/useNoteState'
import { flowingDebounce } from '@/utils'

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

  const debounceSetContent = useCallback(
    flowingDebounce(() => {
      console.log('plain text debounce 准备更新')
      setNoteContent({ contentId, content: editor!.getHTML() })
    }, 2000),
    []
  )

  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    editorProps: {
      attributes: {
        class: 'flowing-plain-text'
      },
      handleDOMEvents: {
        keydown: (view, event) => {
          console.log('view', view)
          switch (event.key) {
            case 'Enter': {
              __DEV__ && console.log('plain text 按下了回车')
              event.preventDefault()
              const newNoteId = addNoteContent(contentId)
              setNoteContent({ contentId, content: editor!.getHTML() })
              setFocusId(newNoteId)
              break
            }
          }
        }
      }
    },
    /** 编辑事件 */
    onUpdate: () => {
      debounceSetContent()
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
