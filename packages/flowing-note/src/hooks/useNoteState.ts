import { create } from 'zustand'
import { useMockData } from './useMockData'

export interface NoteContentNode {
  contentId: number
  content: string
}

export interface FlowingNote {
  noteId: number
  noteTitle: string
  noteContent: NoteContentNode[]
}

export interface UseNoteStateType {
  currentNote: FlowingNote
}

export interface UseNoteMethodsType {
  setCurrentNote: (id: number) => void
  setNoteTitle: (title: string) => void
  setNoteContent: (noteContent: NoteContentNode) => void
  addNoteContent: (id: number) => number
}

const { getNoteTitle } = useMockData()

let noteId = 0

export const useNoteState = create<UseNoteStateType & UseNoteMethodsType>()(
  (set) => ({
    currentNote: {
      noteId: noteId,
      noteTitle: '<h1></h1>',
      noteContent: [{ contentId: noteId, content: '<p></p>' }]
    },
    setCurrentNote: (id: number) => {
      const newNoteTitle = getNoteTitle(id)
      set({
        currentNote: {
          noteId: id,
          noteTitle: `<h1>${newNoteTitle}</h1>`,
          noteContent: [
            {
              contentId: 0,
              content: `<p>test${newNoteTitle}</p>`
            }
          ]
        }
      })
    },
    setNoteTitle: (title: string) => {
      set((state) => ({
        currentNote: { ...state.currentNote, noteTitle: title }
      }))
    },
    setNoteContent: ({ contentId, content }: NoteContentNode) => {
      set((state) => {
        const newContent = state.currentNote.noteContent.map((c) => {
          if (c.contentId === contentId) {
            return { ...c, content }
          }
          return c
        })
        return {
          currentNote: { ...state.currentNote, noteContent: newContent }
        }
      })
    },
    addNoteContent: (id: number) => {
      set((state) => {
        const newContent = []
        for (let i = 0; i < state.currentNote.noteContent.length; i++) {
          newContent.push(state.currentNote.noteContent[i])
          if (state.currentNote.noteContent[i].contentId === id) {
            newContent.push({ contentId: ++noteId, content: '<p></p>' })
          }
        }
        return {
          currentNote: {
            ...state.currentNote,
            noteContent: newContent
          }
        }
      })
      return noteId
    }
  })
)
