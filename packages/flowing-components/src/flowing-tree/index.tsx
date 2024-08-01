import { forwardRef } from 'react'
import type { ReactNode } from 'react'
import { FileOutlined, PlusOutlined } from '@ant-design/icons'
import './tree.scss'
import FlowingButton from '../flowing-button'

interface TreeItem {
  title: string
  prefixIcon?: ReactNode
}

interface FlowingTreeProps {
  treeData: TreeItem[]
  className?: string
  itemClassName?: string
}

const FlowingTree = forwardRef<HTMLDivElement, FlowingTreeProps>(
  (props, ref) => {
    const { treeData, className, itemClassName, ...rest } = props

    const treeClassName = className
      ? `${className} flowing-tree`
      : 'flowing-tree'

    const treeItemClassName = itemClassName
      ? `${itemClassName} flowing-tree-item`
      : 'flowing-tree-item'

    return (
      <div {...rest} className={treeClassName} ref={ref}>
        {treeData.map((item) => {
          const { prefixIcon, title } = item
          return (
            <>
              <FlowingButton
                prefixIcon={prefixIcon || <FileOutlined />}
                className={treeItemClassName}
                suffixIcon={<PlusOutlined />}
              >
                {title}
              </FlowingButton>
            </>
          )
        })}
      </div>
    )
  }
)

FlowingTree.displayName = 'FlowingTree'

export default FlowingTree
