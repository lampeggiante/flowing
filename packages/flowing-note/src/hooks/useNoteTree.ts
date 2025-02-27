import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { info, log } from '@/utils/log'
import { getUUID } from '@/utils/uuid'

export interface NoteTreeItem {
  id: string
  title: string
  level: number
  expanded: boolean
  children: NoteTreeItem[]
}

export type NoteTreeState = {
  noteTree: NoteTreeItem[]
}

export interface NoteTreeActions {
  updateNoteTree: (noteTree: NoteTreeItem[]) => void
  updateTreeItemTitle: (id: string, newTitle: string) => void
  updateTreeItemExpanded: (id: string, expanded: boolean) => void
  appendNote: (parentId: string | null, parentLevel: number) => string
}

function traverseTree(tree: NoteTreeItem[], id: string, newTitle: string) {
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
  parentId: string | null,
  parentLevel: number
): [NoteTreeItem[], string] {
  const newId = getUUID()
  const defaultNote = {
    id: newId,
    title: '新笔记',
    level: parentLevel + 1,
    expanded: false,
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
        id: newId
      })
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

function traverseTreeExpanded(
  tree: NoteTreeItem[],
  id: string,
  expanded: boolean
) {
  let stop = false
  function traverse(item: NoteTreeItem) {
    if (stop) return item
    if (item.id === id) {
      stop = true
      return {
        ...item,
        expanded
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
      updateTreeItemTitle: (id: string, newTitle: string) => {
        return set((state) => {
          log('updateTreeItemTitle', id, newTitle)
          const newTree = traverseTree(state.noteTree, id, newTitle)
          log('newTree', newTree)
          return {
            noteTree: newTree
          }
        })
      },
      updateTreeItemExpanded: (id: string, expanded: boolean) => {
        return set((state) => {
          const newTree = traverseTreeExpanded(state.noteTree, id, expanded)
          return {
            noteTree: newTree
          }
        })
      },
      appendNote: (parentId: string | null, parentLevel: number) => {
        let newIdToAdd = ''
        set((state) => {
          const [newTree, newId] = appendNewNote(
            state.noteTree,
            parentId,
            parentLevel
          )
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
