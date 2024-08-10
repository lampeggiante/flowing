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
        class: 'flowing-top-heading'
      }
    },
    onTransaction() {}
  })

  useEffect(() => {
    editor?.commands.setContent(`<h1>${noteTitle}</h1>`)
  }, [noteTitle])
  return <EditorContent editor={editor} />
}

export default FlowingTopHeading
