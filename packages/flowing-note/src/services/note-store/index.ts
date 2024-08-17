import IndexedDBService from '../indexedDB'
import { IdbStoreType } from '../indexedDB/types'

type NoteDB = {
  instance: IndexedDBService | null
}

export const noteDBName = 'flowing-note'
export const noteDBVersion = 1
export const storeName = 'notes'
export const noteDBStoreName: IdbStoreType = {
  storeName,
  keyPath: 'noteId'
}
export enum storeNameMap {
  notes = '我的知识库'
}

export const noteDB: NoteDB = {
  instance: null
}
