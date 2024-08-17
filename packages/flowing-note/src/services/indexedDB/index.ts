import { openDB } from 'idb'
import { error, log } from '@/utils/log'
import type { IdbStoreType } from './types'

type IdbStoreTypeExtends = IdbStoreType | IdbStoreType[]

class IndexedDBService {
  /** 打开的 database 名称 */
  private dbName: string
  /** 打开的 database 版本 */
  private dbVersion: number
  /** 打开的 database 对象 */
  private db: any = null
  /** database 对象下的存储 */
  private storeName: IdbStoreTypeExtends
  constructor(
    dbName: string,
    dbVersion: number,
    storeName: IdbStoreTypeExtends
  ) {
    this.dbName = dbName
    this.dbVersion = dbVersion
    this.storeName = storeName
    this.openDatabase()
  }
  /** 使用 idb 打开 indexedDB */
  private async openDatabase() {
    if (this.db) return
    const _this = this
    log(`open db ${this.dbName} version ${this.dbVersion}`)
    this.db = await openDB(this.dbName, this.dbVersion, {
      upgrade(db, oldVersion, newVersion) {
        log(`upgrade db from ${oldVersion} to ${newVersion}`)
        function createObjectStore(params: IdbStoreType) {
          const { storeName, keyPath } = params
          if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName, {
              keyPath
            })
          }
        }
        if (Array.isArray(_this.storeName)) {
          for (let i = 0; i < _this.storeName.length; i++) {
            createObjectStore(_this.storeName[i])
          }
        } else {
          createObjectStore(_this.storeName)
        }
      },
      blocked() {
        error('blocked')
      },
      blocking() {
        error('blocking')
      },
      terminated() {
        error('terminated')
      }
    })
  }
  public closeDatabase() {
    if (!this.db) return
    log('close db', this.db.close)
    this.db.close && this.db.close()
  }
  private async writeTx(storeName: string) {
    log('writeTx', this.db)
    await this.openDatabase()
    return this.db.transaction(storeName, 'readwrite').objectStore(storeName)
  }
  /** 获取对应的存储值 */
  public async getStore(storeName: string, key: number | string) {
    await this.openDatabase()
    return await this.db.get(storeName, key)
  }
  /** 获取某个存储的所有值 */
  public async getAllStore(storeName: string) {
    await this.openDatabase()
    return await this.db.getAll(storeName)
  }
  /** 添加记录 */
  public async addStore(storeName: string, data: any) {
    log(`add ${storeName} data: ${JSON.stringify(data)}`)
    await this.openDatabase()
    return (await this.writeTx(storeName)).add(data)
  }
  /** 更新记录 */
  public async updateStore(storeName: string, data: any) {
    log(`update ${storeName} data: ${JSON.stringify(data)}`)
    await this.openDatabase()
    return (await this.writeTx(storeName)).put(data)
  }
  /** 删除记录 */
  public async deleteStore(storeName: string, key: number | string) {
    await this.openDatabase()
    return (await this.writeTx(storeName)).delete(key)
  }
  /** 清空记录 */
  public async clearStore(storeName: string) {
    await this.openDatabase()
    return (await this.writeTx(storeName)).clear()
  }
}

export default IndexedDBService
