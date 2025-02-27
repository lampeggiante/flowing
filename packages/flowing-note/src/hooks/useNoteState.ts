import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { noteDB, storeName } from '@/services/note-store'
import { log } from '@/utils/log'
import { now } from '@/utils/time'

export interface NoteContentNode {
  contentId: number
  content: string
}

export interface FlowingNote {
  noteId: number
  author: string
  lastModified: string
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
  addNewNote: (parentId: number | null, newId: number) => void
}

export const emptyCurrentNote: FlowingNote = {
  noteId: 0,
  author: 'flowing',
  lastModified: now(),
  noteTitle: '<h1></h1>',
  noteContent: '<p></p>',
  parent: null
}

export const useNoteState = create<UseNoteStateType & UseNoteMethodsType>()(
  persist(
    (set) => ({
      currentNote: emptyCurrentNote,
      setCurrentNote: (id: number) => {
        if (id === 0) {
          set({
            currentNote: emptyCurrentNote
          })
          return
        }
        noteDB.instance?.getStore(storeName, id).then((store) => {
          log('setCurrentNote', store)
          const { noteId, author, lastModified, title, content, parent } = store
          set({
            currentNote: {
              noteId,
              author: author ?? 'flowing',
              lastModified: lastModified ?? now(),
              noteTitle: title,
              noteContent: content,
              parent
            }
          })
        })
      },
      setNoteTitle: (title: string) => {
        set((state) => {
          noteDB.instance?.updateStore(storeName, {
            noteId: state.currentNote.noteId,
            author: state.currentNote.author,
            lastModified: now(),
            title,
            content: state.currentNote.noteContent,
            parent: state.currentNote.parent
          })
          return {
            currentNote: {
              ...state.currentNote,
              lastModified: now(),
              noteTitle: title
            }
          }
        })
      },
      setNoteContent: (content: string) => {
        set((state) => {
          noteDB.instance?.updateStore(storeName, {
            noteId: state.currentNote.noteId,
            author: state.currentNote.author,
            lastModified: now(),
            title: state.currentNote.noteTitle,
            content,
            parent: state.currentNote.parent
          })
          return {
            currentNote: {
              ...state.currentNote,
              lastModified: now(),
              noteContent: content
            }
          }
        })
      },
      addNewNote: (parentId: number | null, newId: number) => {
        const newNote = {
          noteId: newId,
          author: 'flowing',
          lastModified: now(),
          title: '新笔记',
          content: '<p>这是内容</p>',
          parent: parentId || null
        }
        noteDB.instance?.addStore(storeName, newNote)
      }
    }),
    {
      name: 'flowing-current-note',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
