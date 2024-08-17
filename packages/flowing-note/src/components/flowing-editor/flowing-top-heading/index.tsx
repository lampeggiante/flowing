import { EditorContent, useEditor } from '@tiptap/react'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import CharacterCount from '@tiptap/extension-character-count'
import './index.scss'
import { useEffect } from 'react'
import { log } from '@/utils/log'

interface FlowingTopHeadingProps {
  noteTitle: string
  editable?: boolean
  setNoteTitle: (title: string) => void
}

const FlowingTopHeading = (props: FlowingTopHeadingProps) => {
  const { noteTitle, editable = true, setNoteTitle } = props

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      CharacterCount.configure({ limit: 30 })
    ],
    editorProps: {
      attributes: {
        class: 'flowing-top-heading',
        wrap: 'off'
      },
      handleDOMEvents: {
        keydown: (v, e) => {
          if (e.key === 'Enter') {
            __DEV__ && log(v, e)
            e.preventDefault()
            editor?.commands.blur()
          }
        }
      }
    },
    onUpdate: ({ editor }) => {
      if (!editor.getText()) return
      setNoteTitle(editor.getText())
    }
  })

  useEffect(() => {
    editor?.setEditable(editable)
  }, [editable])

  useEffect(() => {
    if (noteTitle && editor?.isFocused) return
    editor?.commands.setContent(noteTitle)
  }, [noteTitle])

  return <EditorContent editor={editor} />
}

export default FlowingTopHeading
