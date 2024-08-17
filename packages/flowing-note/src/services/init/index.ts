import noteTitleList from '@/mock/note-title-list'
import IndexedDBService from '../indexedDB'
import {
  noteDB,
  noteDBName,
  noteDBStoreName,
  storeName,
  noteDBVersion
} from '../note-store'
import { injectDBData } from './utils'

function initDB() {
  /** 初始化数据库 */
  noteDB.instance = new IndexedDBService(
    noteDBName,
    noteDBVersion,
    noteDBStoreName
  )
  /** 将 mock data 传入数据库中 */
  const data = noteTitleList.treeData
  const len = data.length
  for (let i = 0; i < len; i++) {
    injectDBData(noteDB.instance, storeName, data[i])
  }
}

export function init() {
  initDB()
}
