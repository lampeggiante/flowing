import Tree from './tree'
import './aside-note.scss'
import noteTitleList from '@/mock/note-title-list'

const prefix = 'aside-note-tree'

const AsideNoteTree = () => {
  return (
    <div className={`${prefix}-container p-2`}>
      <Tree treeData={noteTitleList} />
    </div>
  )
}

export default AsideNoteTree
