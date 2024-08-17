import { create } from 'zustand'
import { useMockData } from './useMockData'
import { noteDB, noteDBStoreName } from '@/services/note-store'
import { log } from '@/utils/log'

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

export const emptyCurrentNote: FlowingNote = {
  noteId: 0,
  noteTitle: '<h1></h1>',
  noteContent: '<p></p>'
}

export const useNoteState = create<UseNoteStateType & UseNoteMethodsType>()(
  (set) => ({
    currentNote: emptyCurrentNote,
    setCurrentNote: (id: number) => {
      if (id === 0) {
        set({
          currentNote: emptyCurrentNote
        })
        return
      }
      noteDB.instance?.getStore(noteDBStoreName.storeName, id).then((store) => {
        log('store', store)
        const { noteId, title, content } = store
        set({
          currentNote: {
            noteId,
            noteTitle: `<h1>${title}</h1>`,
            noteContent: content
          }
        })
      })
    },
    setNoteTitle: (title: string) => {
      set((state) => ({
        currentNote: { ...state.currentNote, noteTitle: title }
      }))
    }
  })
)
