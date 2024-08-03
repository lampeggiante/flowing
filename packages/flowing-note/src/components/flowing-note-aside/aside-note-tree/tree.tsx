import { forwardRef } from 'react'
import './tree.scss'
import TreeItem from './tree-item'
import type { TreeItemProps } from './tree-item'

interface TreeProps {
  treeData: TreeItemProps[]
}

const Tree = forwardRef<HTMLDivElement, TreeProps>((props, ref) => {
  const { treeData, ...rest } = props

  return (
    <>
      <div
        style={{
          position: 'sticky',
          top: '-10px',
          backgroundColor: 'var(--flowing-back-color)'
        }}
      >
        我的知识库
      </div>
      <div {...rest} className="aside-note-tree" ref={ref}>
        {treeData.map((item) => {
          const { id } = item
          return <TreeItem key={id} {...item} />
        })}
      </div>
    </>
  )
})

Tree.displayName = 'Tree'

export default Tree
