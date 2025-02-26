import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { info, log } from '@/utils/log'

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
  appendNote: (parentId: number | null) => number
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

function appendNewNote(
  tree: NoteTreeItem[],
  parentId: number | null
): [NoteTreeItem[], number] {
  let newId = (tree.at(-1)?.id ?? 0) + 1
  const defaultNote = {
    id: newId,
    title: '新笔记',
    children: []
  }
  if (!parentId) {
    info('appendNewNote', defaultNote)
    return [[...tree, defaultNote], newId]
  }
  let stop = false
  function traverse(item: NoteTreeItem) {
    if (stop) return item
    if (item.id === parentId) {
      stop = true
      info('appendNewNote', {
        ...defaultNote,
        id: (item.children.at(-1)?.id ?? 0) + 1
      })
      newId = (item.children.at(-1)?.id ?? 0) + 1
      return {
        ...item,
        children: [
          ...item.children,
          {
            ...defaultNote,
            id: newId
          }
        ]
      }
    }
    if (item.children.length > 0) {
      item.children = item.children.map((child) => traverse(child))
    }
    return item
  }
  return [tree.map((item) => traverse(item)), newId]
}

export const useNoteTree = create<NoteTreeState & NoteTreeActions>()(
  persist(
    (set) => ({
      noteTree: [],
      updateNoteTree: (noteTree: NoteTreeItem[]) => set({ noteTree }),
      updateTreeItemTitle: (id: number, newTitle: string) => {
        return set((state) => {
          log('updateTreeItemTitle', id, newTitle)
          const newTree = traverseTree(state.noteTree, id, newTitle)
          log('newTree', newTree)
          return {
            noteTree: newTree
          }
        })
      },
      appendNote: (parentId: number | null) => {
        let newIdToAdd = 0
        set((state) => {
          const [newTree, newId] = appendNewNote(state.noteTree, parentId)
          newIdToAdd = newId
          return {
            noteTree: newTree
          }
        })
        return newIdToAdd
      }
    }),
    {
      name: 'flowing-note-tree',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
