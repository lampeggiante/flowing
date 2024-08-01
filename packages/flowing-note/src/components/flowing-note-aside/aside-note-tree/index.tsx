import { FlowingTree } from 'flowing-components'
import '@/styles/aside/aside-note.scss'
import noteTitleList from '@/mock/note-title-list'

const prefix = 'aside-note-tree'

const AsideNoteTree = () => {
  return (
    <div className={`${prefix}-container p-2`}>
      <FlowingTree treeData={noteTitleList} itemClassName={`${prefix}-item`} />
    </div>
  )
}

export default AsideNoteTree
