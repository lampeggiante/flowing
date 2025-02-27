import Tree from './tree'
import './aside-note.scss'
import { noteDB, storeName, storeNameMap } from '@/services/note-store'
import { useEffect } from 'react'
import { useNoteTree } from '@/hooks/useNoteTree'
import { info } from '@/utils/log'

const prefix = 'aside-note-tree'

const AsideNoteTree = () => {
  const { noteTree, updateNoteTree } = useNoteTree()
  const storeTitle = storeNameMap[storeName]
  const initTreeData = async () => {
    const store = await noteDB.instance?.getAllStore(storeName)
    if (!store) return
    const data = store.filter((item: any) => item.noteId !== 0)
    info('initTreeData', data)
    const visited = new Set()
    function traverse({ id, level }: { id?: string; level?: number }) {
      let ans = []
      let target
      if (!id) {
        target = (item: any) =>
          !visited.has(item.noteId) && item.parent === null
      } else {
        target = (item: any) => !visited.has(item.noteId) && item.parent === id
      }
      ans = data.filter(target).map((item: any) => {
        visited.add(item.noteId)
        return {
          id: item.noteId,
          title: item.title,
          level: level ?? 1,
          expanded: false,
          children: traverse({ id: item.noteId, level: (level ?? 1) + 1 })
        }
      })
      return ans
    }
    const treeDataList = traverse({ level: 1 })
    info('treeDataList', treeDataList)
    updateNoteTree(treeDataList)
  }

  useEffect(() => {
    if (noteTree.length > 0) return
    initTreeData()
  }, [initTreeData])

  return (
    <div className={`${prefix}-container`}>
      {noteTree.length > 0 && <Tree treeData={noteTree} title={storeTitle} />}
    </div>
  )
}

export default AsideNoteTree
