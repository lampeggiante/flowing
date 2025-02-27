import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { noteDB, storeName } from '@/services/note-store'
import { log } from '@/utils/log'
import { now } from '@/utils/time'

export interface FlowingNote {
  noteId: string
  author: string
  createdAt: string
  lastModified: string
  title: string
  content: string
  level: number
  parent: number | null
}

export interface UseNoteStateType {
  currentNote: FlowingNote
}

export interface UseNoteMethodsType {
  setCurrentNote: (id: string) => void
  setNoteTitle: (title: string) => void
  setNoteContent: (content: string) => void
  addNewNote: (
    parentId: string | null,
    newId: string,
    parentLevel: number
  ) => void
}

export const EMPTY_NOTE_ID = 'empty'

export const emptyCurrentNote: FlowingNote = {
  noteId: EMPTY_NOTE_ID,
  author: 'flowing',
  createdAt: now(),
  lastModified: now(),
  title: '<h1></h1>',
  content: '<p></p>',
  level: 1,
  parent: null
}

export const useNoteState = create<UseNoteStateType & UseNoteMethodsType>()(
  persist(
    (set) => ({
      currentNote: emptyCurrentNote,
      setCurrentNote: (id: string) => {
        if (id === EMPTY_NOTE_ID) {
          set({
            currentNote: emptyCurrentNote
          })
          return
        }
        noteDB.instance?.getStore(storeName, id).then((store) => {
          log('setCurrentNote', store)
          const {
            noteId,
            author,
            createdAt,
            lastModified,
            title,
            content,
            parent,
            level
          } = store
          set({
            currentNote: {
              noteId,
              author: author ?? 'flowing',
              createdAt: createdAt ?? now(),
              lastModified: lastModified ?? now(),
              title,
              content,
              parent,
              level: level ?? 1
            }
          })
        })
      },
      setNoteTitle: (title: string) => {
        set((state) => {
          noteDB.instance?.updateStore(storeName, {
            noteId: state.currentNote.noteId,
            author: state.currentNote.author,
            createdAt: state.currentNote.createdAt,
            lastModified: now(),
            title,
            content: state.currentNote.content,
            parent: state.currentNote.parent,
            level: state.currentNote.level
          })
          return {
            currentNote: {
              ...state.currentNote,
              lastModified: now(),
              title
            }
          }
        })
      },
      setNoteContent: (content: string) => {
        set((state) => {
          noteDB.instance?.updateStore(storeName, {
            noteId: state.currentNote.noteId,
            author: state.currentNote.author,
            createdAt: state.currentNote.createdAt,
            lastModified: now(),
            title: state.currentNote.title,
            content,
            parent: state.currentNote.parent,
            level: state.currentNote.level
          })
          return {
            currentNote: {
              ...state.currentNote,
              lastModified: now(),
              content
            }
          }
        })
      },
      addNewNote: (
        parentId: string | null,
        newId: string,
        parentLevel: number
      ) => {
        const newNote = {
          noteId: newId,
          author: 'flowing',
          createdAt: now(),
          lastModified: now(),
          title: '新笔记',
          content: '<p>这是内容</p>',
          parent: parentId || null,
          level: parentLevel + 1
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
