export interface FlowingDB {
  name: string
  version: number
  instance: IDBDatabase | null
}

const flowingDB: FlowingDB = {
  name: 'flowingDB',
  version: 1,
  instance: null
}

export function useIndexedDB() {
  /** 打开数据库 */
  function openDB(): Promise<Event> {
    return new Promise((res, rej) => {
      const indexedDB = window.indexedDB
      const request = indexedDB.open(flowingDB.name, flowingDB.version)
      request.onsuccess = (event) => {
        if (event.target) {
          flowingDB.instance = (event.target as IDBOpenDBRequest).result
        }
        res(event)
      }
      request.onerror = (event) => {
        rej(event)
      }
      request.onupgradeneeded = (event) => {
        if (event.target) {
          flowingDB.instance = (event.target as IDBOpenDBRequest).result
        }
      }
    })
  }

  return {
    flowingDB,
    openDB
  }
}
