import { create } from 'zustand'
import { useMockData } from './useMockData'

export interface FlowingNote {
  noteId: number
  noteTitle: string
  noteContent: string
}
export interface UseNoteStateType {
  currentNote: FlowingNote
  setCurrentNote: (id: number) => void
  setNoteTitle: (title: string) => void
  setNoteContent: (content: string) => void
}

const { getNoteTitle } = useMockData()

export const useNoteState = create<UseNoteStateType>((set) => ({
  currentNote: {
    noteId: 0,
    noteTitle: '',
    noteContent: ''
  },
  setCurrentNote: (id: number) => {
    const newNoteTitle = getNoteTitle(id)
    set({
      currentNote: {
        noteId: id,
        noteTitle: newNoteTitle,
        noteContent: 'test' + newNoteTitle
      }
    })
  },
  setNoteTitle: (title: string) => {
    set((state) => ({
      currentNote: { ...state.currentNote, noteTitle: title }
    }))
  },
  setNoteContent: (content: string) => {
    set((state) => ({
      currentNote: { ...state.currentNote, noteContent: content }
    }))
  }
}))
