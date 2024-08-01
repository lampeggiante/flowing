import noteTitleList from '@/mock/note-title-list'
import '@/styles/aside/aside-note.scss'
import TreeItem from './tree-item'

const classPrefix = 'aside-note-tree'

const AsideNoteTree = () => {
  return (
    <div className={`${classPrefix}-container p-3 mt-2`}>
      {noteTitleList.map((item) => (
        <TreeItem title={item.title} key={item.title} />
      ))}
    </div>
  )
}

export default AsideNoteTree
