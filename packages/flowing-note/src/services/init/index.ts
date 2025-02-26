import noteTitleList from '@/mock/note-title-list'
import IndexedDBService from '../indexedDB'
import {
  noteDB,
  noteDBName,
  noteDBStoreName,
  storeName,
  noteDBVersion,
  NOTE_INIT_KEY
} from '../note-store'
import { injectDBData } from './utils'
import { info } from '@/utils/log'
export function initDB() {
  /** 初始化数据库 */
  noteDB.instance = new IndexedDBService(
    noteDBName,
    noteDBVersion,
    noteDBStoreName
  )
  if (localStorage.getItem(NOTE_INIT_KEY)) {
    __DEV__ && info('数据库已初始化')
    return
  }
  localStorage.setItem(NOTE_INIT_KEY, 'true')
  /** 将 mock data 传入数据库中 */
  const data = noteTitleList.treeData
  const len = data.length
  for (let i = 0; i < len; i++) {
    injectDBData(noteDB.instance, storeName, data[i])
  }
}
