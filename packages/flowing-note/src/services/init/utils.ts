import IndexedDBService from '../indexedDB'

export function injectDBData(
  db: IndexedDBService,
  storeName: string,
  data: any
) {
  const { id, title, children } = data
  db.getStore(storeName, id).then((store) => {
    if (store) return
    db.addStore(storeName, {
      noteId: id,
      title,
      content: '<p>这是内容</p>'
    })
  })
  if (children && children.length > 0) {
    children.forEach((item: any) => {
      injectDBData(db, storeName, item)
    })
  }
}
