import { TreeItemProps } from '@/components/flowing-note-aside/aside-note-tree/tree-item'
import noteTitleList from '@/mock/note-title-list'

function traverse(item: TreeItemProps, id: number): TreeItemProps | null {
  if (item.id === id) {
    return item
  }
  if (item.children) {
    return item.children.map((i) => traverse(i, id)).filter(Boolean)[0]
  }
  return null
}

export function useMockData() {
  function getNoteTitle(id: number) {
    let selected = { title: 'not found' }
    for (const item of noteTitleList.treeData) {
      const ans = traverse(item, id)
      if (ans) {
        selected = ans
        break
      }
    }

    return selected?.title
  }

  return {
    getNoteTitle
  }
}
