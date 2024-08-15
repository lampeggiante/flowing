import { error, log } from '@/utils/log'

export interface indexedDBTable {
  name: string
  keyPath: string
}

export interface IndexedDBConfig {
  dbName: string
  initVersion: number
  tables: indexedDBTable | indexedDBTable[]
}

function initIndexedDB(params: IndexedDBConfig) {
  const { dbName, initVersion, tables } = params
  const openReq = indexedDB.open(dbName, initVersion)
  let db: IDBDatabase | null = null
  openReq.onsuccess = (e) => {
    db = (e.target as IDBOpenDBRequest).result
    db.onerror = (e) => {
      error('indexedDB error', e)
    }
    log('indexedDB open success')
  }
  openReq.onerror = (e) => {
    error('indexedDB open error', e)
  }
  openReq.onupgradeneeded = (e) => {
    db = (e.target as IDBOpenDBRequest).result
    log('indexedDB upgrade success')
    const create = db.createObjectStore
    if (Array.isArray(tables)) {
      const len = tables.length
      for (let i = 0; i < len; i++) {
        const { name, keyPath } = tables[i]
        create(name, { keyPath })
      }
    } else {
      const { name, keyPath } = tables
      create(name, { keyPath })
    }
  }
  function add(table: string, data: any) {
    if (!db) {
      log('indexedDB not open')
      return
    }
    const transaction = db.transaction(table, 'readwrite')
    const store = transaction.objectStore(table)
    store.add(data)
    transaction.oncomplete = () => {
      log('indexedDB add success')
    }
    transaction.onerror = (e) => {
      error('indexedDB add error', e)
    }
  }
  function get(table: string, key: string | number) {
    if (!db) {
      log('indexedDB not open')
      return
    }
    const transaction = db.transaction(table, 'readonly')
    const store = transaction.objectStore(table)
    return store.get(key)
  }
  function getAll(table: string) {
    if (!db) {
      log('indexedDB not open')
      return
    }
    const transaction = db.transaction(table, 'readonly')
    const store = transaction.objectStore(table)
    return store.getAll()
  }
  function deleteItem(table: string, key: string | number) {
    if (!db) {
      log('indexedDB not open')
      return
    }
    const transaction = db.transaction(table, 'readwrite')
    const store = transaction.objectStore(table)
    store.delete(key)
    transaction.oncomplete = () => {
      log('indexedDB delete success')
    }
    transaction.onerror = (e) => {
      error('indexedDB delete error', e)
    }
  }
  return {
    db,
    add,
    get,
    getAll,
    deleteItem
  }
}

let instance: ReturnType<typeof initIndexedDB> | null = null
function useIndexedDB(params: IndexedDBConfig) {
  if (!instance) {
    instance = initIndexedDB(params)
  }
  return instance
}

export default useIndexedDB
