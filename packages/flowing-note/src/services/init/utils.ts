import IndexedDBService from '../indexedDB'

export function injectDBData(
  db: IndexedDBService,
  storeName: string,
  data: any,
  parent?: string | number
) {
  const { id, title, children } = data
  db.getStore(storeName, id).then((store) => {
    const addData: Record<string, string | number | null> = {
      noteId: id,
      title,
      content: '<p>这是内容</p>',
      parent: parent || null
    }
    if (store) return
    db.addStore(storeName, addData)
  })
  if (children && children.length > 0) {
    children.forEach((item: any) => {
      injectDBData(db, storeName, item, id)
    })
  }
}
