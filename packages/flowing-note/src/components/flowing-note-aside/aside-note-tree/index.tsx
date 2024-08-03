import Tree from './tree'
import './aside-note.scss'
import noteTitleList from '@/mock/note-title-list'

const prefix = 'aside-note-tree'

const AsideNoteTree = () => {
  const { title, treeData } = noteTitleList

  return (
    <div className={`${prefix}-container p-2`}>
      <Tree treeData={treeData} title={title} />
    </div>
  )
}

export default AsideNoteTree
