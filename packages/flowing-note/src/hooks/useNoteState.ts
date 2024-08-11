import { create } from 'zustand'
import { useMockData } from './useMockData'

export interface NoteContentNode {
  contentId: number
  content: string
}

export interface FlowingNote {
  noteId: number
  noteTitle: string
  noteContent: string
}

export interface UseNoteStateType {
  currentNote: FlowingNote
}

export interface UseNoteMethodsType {
  setCurrentNote: (id: number) => void
  setNoteTitle: (title: string) => void
}

const { getNoteTitle } = useMockData()

export const useNoteState = create<UseNoteStateType & UseNoteMethodsType>()(
  (set) => ({
    currentNote: {
      noteId: 0,
      noteTitle: '<h1></h1>',
      noteContent: '<p></p>'
    },
    setCurrentNote: (id: number) => {
      const newNoteTitle = getNoteTitle(id)
      set({
        currentNote: {
          noteId: id,
          noteTitle: `<h1>${newNoteTitle}</h1>`,
          noteContent: `<p>test${newNoteTitle}</p>`
        }
      })
    },
    setNoteTitle: (title: string) => {
      set((state) => ({
        currentNote: { ...state.currentNote, noteTitle: title }
      }))
    }
  })
)
