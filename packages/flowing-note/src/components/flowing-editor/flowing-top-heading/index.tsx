import { EditorContent, useEditor } from '@tiptap/react'
import './index.scss'
import { useEffect } from 'react'
import StarterKit from '@tiptap/starter-kit'

interface FlowingTopHeadingProps {
  noteTitle: string
  setNoteTitle: (title: string) => void
}

const FlowingTopHeading = (props: FlowingTopHeadingProps) => {
  const { noteTitle, setNoteTitle } = props

  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class: 'flowing-top-heading',
        wrap: 'off'
      },
      handleDOMEvents: {
        keydown: (v, e) => {
          if (e.key === 'Enter') {
            __DEV__ && console.log(v, e)
            e.preventDefault()
            editor?.commands.blur()
          }
        }
      }
    }
  })

  useEffect(() => {
    editor?.commands.setContent(noteTitle)
  }, [noteTitle])
  return <EditorContent editor={editor} />
}

export default FlowingTopHeading
