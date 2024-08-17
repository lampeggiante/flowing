import Tree from './tree'
import './aside-note.scss'
import { noteDB, noteDBStoreName } from '@/services/note-store'
import { Children, useCallback, useEffect, useState } from 'react'
import noteTitleList from '@/mock/note-title-list'
import { log } from '@/utils/log'
import { TreeItemProps } from './tree-item'

const prefix = 'aside-note-tree'

const AsideNoteTree = () => {
  // const { treeData } = noteTitleList
  const [treeData, setTreeData] = useState<TreeItemProps[]>([])
  const storeTitle = noteDBStoreName.storeName
  const initTreeData = useCallback(async () => {
    const store = await noteDB.instance?.getAllStore(storeTitle)
    if (!store) return
    const data = store.filter((item: any) => item.noteId !== 0)
    log('initTreeData', data)
    const visited = new Set()
    function traverse(id?: number) {
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
          children: traverse(item.noteId)
        }
      })
      return ans
    }
    const treeDataList = traverse()
    log('treeDataList', treeDataList)
    setTreeData(treeDataList)
  }, [])

  useEffect(() => {
    initTreeData()
  }, [])

  return (
    <div className={`${prefix}-container p-2`}>
      {treeData && <Tree treeData={treeData} title={storeTitle} />}
    </div>
  )
}

export default AsideNoteTree
