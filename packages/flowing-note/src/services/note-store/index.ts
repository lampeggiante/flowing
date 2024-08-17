import IndexedDBService from '../indexedDB'
import { IdbStoreType } from '../indexedDB/types'

type NoteDB = {
  instance: IndexedDBService | null
}

export const noteDBName = 'flowing-note'
export const noteDBVersion = 1
export const noteDBStoreName: IdbStoreType = {
  storeName: 'notes',
  keyPath: 'noteId'
}

export const noteDB: NoteDB = {
  instance: null
}
