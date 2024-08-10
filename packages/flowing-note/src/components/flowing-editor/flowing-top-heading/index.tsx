import { EditorContent, useEditor } from '@tiptap/react'
import Document from '@tiptap/extension-document'
import Heading from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import './index.scss'
import { useEffect } from 'react'

interface FlowingTopHeadingProps {
  noteTitle: string
}

const FlowingTopHeading = (props: FlowingTopHeadingProps) => {
  const { noteTitle } = props
  const editor = useEditor({
    extensions: [Document, Paragraph, Text, Heading],
    editorProps: {
      attributes: {
        class: 'flowing-top-heading'
      }
    }
  })

  useEffect(() => {
    editor?.commands.setContent(`<h1>${noteTitle}</h1>`)
  }, [noteTitle])
  return <EditorContent editor={editor} />
}

export default FlowingTopHeading
