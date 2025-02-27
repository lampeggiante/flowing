import { now } from '@/utils/time'
import IndexedDBService from '../indexedDB'
import { getUUID } from '@/utils/uuid'

export function injectDBData(
  db: IndexedDBService,
  storeName: string,
  data: any,
  parent?: string,
  preLevel?: number
) {
  const { title, children } = data
  const id = getUUID()
  db.getStore(storeName, id).then((store) => {
    const addData: Record<string, string | number | null> = {
      noteId: id,
      author: 'flowing',
      createdAt: now(),
      lastModified: now(),
      title,
      content: '<p>这是内容</p>',
      level: (preLevel ?? 0) || 1,
      parent: parent || null
    }
    if (store) return
    db.addStore(storeName, addData)
  })
  if (children && children.length > 0) {
    children.forEach((item: any) => {
      injectDBData(db, storeName, item, id, (preLevel ?? 0) + 1)
    })
  }
}
