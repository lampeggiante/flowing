import '@/styles/aside/aside-note.scss'
import { Tree } from 'antd'
import type { GetProps, TreeDataNode } from 'antd'

const prefix = 'aside-note-tree'

type DirectoryTreeProps = GetProps<typeof Tree.DirectoryTree>
const { DirectoryTree } = Tree

const treeData: TreeDataNode[] = [
  {
    title: 'parent 0',
    key: '0-0',
    children: [
      { title: 'leaf 0-0', key: '0-0-0', isLeaf: true },
      { title: 'leaf 0-1', key: '0-0-1', isLeaf: true }
    ]
  },
  {
    title: 'parent 1',
    key: '0-1',
    children: [
      { title: 'leaf 1-0', key: '0-1-0', isLeaf: true },
      { title: 'leaf 1-1', key: '0-1-1', isLeaf: true }
    ]
  }
]

const AsideNoteTree = () => {
  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    console.log('Trigger Select', keys, info)
  }

  const onExpand: DirectoryTreeProps['onExpand'] = (keys, info) => {
    console.log('Trigger Expand', keys, info)
  }

  return (
    <div className={`${prefix}-container p-2`}>
      <DirectoryTree
        multiple
        defaultExpandAll
        onSelect={onSelect}
        onExpand={onExpand}
        treeData={treeData}
      />
    </div>
  )
}

export default AsideNoteTree
