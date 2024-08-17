import { create } from 'zustand'
import { noteDB, noteDBStoreName } from '@/services/note-store'
import { log } from '@/utils/log'
import { paragraphWrap } from '@/utils/wrap'
import { useNoteTree } from './useNoteTree'

export interface NoteContentNode {
  contentId: number
  content: string
}

export interface FlowingNote {
  noteId: number
  noteTitle: string
  noteContent: string
  parent: number | null
}

export interface UseNoteStateType {
  currentNote: FlowingNote
}

export interface UseNoteMethodsType {
  setCurrentNote: (id: number) => void
  setNoteTitle: (title: string) => void
  setNoteContent: (content: string) => void
}

export const emptyCurrentNote: FlowingNote = {
  noteId: 0,
  noteTitle: '<h1></h1>',
  noteContent: '<p></p>',
  parent: null
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
        log('setCurrentNote', store)
        const { noteId, title, content, parent } = store
        set({
          currentNote: {
            noteId,
            noteTitle: paragraphWrap(title),
            noteContent: content,
            parent
          }
        })
      })
    },
    setNoteTitle: (title: string) => {
      set((state) => {
        noteDB.instance?.updateStore(noteDBStoreName.storeName, {
          noteId: state.currentNote.noteId,
          title,
          content: state.currentNote.noteContent,
          parent: state.currentNote.parent
        })
        return {
          currentNote: { ...state.currentNote, noteTitle: paragraphWrap(title) }
        }
      })
    },
    setNoteContent: (content: string) => {
      set((state) => {
        noteDB.instance?.updateStore(noteDBStoreName.storeName, {
          noteId: state.currentNote.noteId,
          title: state.currentNote.noteTitle,
          content,
          parent: state.currentNote.parent
        })
        return {
          currentNote: { ...state.currentNote, noteContent: content }
        }
      })
    }
  })
)
