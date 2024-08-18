import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { log } from '@/utils/log'

export interface NoteTreeItem {
  id: number
  title: string
  children: NoteTreeItem[]
}

export type NoteTreeState = {
  noteTree: NoteTreeItem[]
}

export interface NoteTreeActions {
  updateNoteTree: (noteTree: NoteTreeItem[]) => void
  updateTreeItemTitle: (id: number, newTitle: string) => void
}

function traverseTree(tree: NoteTreeItem[], id: number, newTitle: string) {
  let stop = false
  function traverse(item: NoteTreeItem) {
    if (stop) return item
    if (item.id === id) {
      stop = true
      return {
        ...item,
        title: newTitle
      }
    }
    if (item.children.length > 0) {
      item.children = item.children.map((child) => traverse(child))
    }
    return item
  }
  return tree.map((item) => traverse(item))
}

export const useNoteTree = create<NoteTreeState & NoteTreeActions>()(
  persist(
    (set) => ({
      noteTree: [],
      updateNoteTree: (noteTree: NoteTreeItem[]) => set({ noteTree }),
      updateTreeItemTitle: (id: number, newTitle: string) =>
        set((state) => {
          log('updateTreeItemTitle', id, newTitle)
          const newTree = traverseTree(state.noteTree, id, newTitle)
          log('newTree', newTree)
          return {
            noteTree: newTree
          }
        })
    }),
    {
      name: 'flowing-note-tree',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
