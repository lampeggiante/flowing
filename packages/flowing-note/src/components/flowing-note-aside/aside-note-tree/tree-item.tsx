import {
  BarsOutlined,
  CaretRightOutlined,
  CaretDownOutlined,
  FileTextOutlined,
  PlusOutlined
} from '@ant-design/icons'
import { forwardRef, HTMLAttributes, ReactNode, useMemo, useState } from 'react'

export interface TreeItemProps {
  prefixIcon?: ReactNode
  title: string
  id: number
  pad?: number
  children?: TreeItemProps[]
  style?: HTMLAttributes<HTMLDivElement>['style']
}

const TreeItem = forwardRef<HTMLDivElement, TreeItemProps>((props, ref) => {
  /** props and states */
  const { prefixIcon, title, id, pad, children, ...rest } = props
  const [expanded, setExpanded] = useState<boolean>(false)
  const caretClsName =
    'aside-note-tree-item-icon aside-note-tree-item-caret' +
    (children ? ' aside-note-tree-item-icon-hover' : '')

  return (
    <>
      <div ref={ref} className="aside-note-tree-item" {...rest}>
        <span className={caretClsName} onClick={() => setExpanded(!expanded)}>
          {children &&
            (expanded ? <CaretDownOutlined /> : <CaretRightOutlined />)}
        </span>
        <span className="aside-note-tree-item-icon">
          {prefixIcon || <FileTextOutlined />}
        </span>
        <span className="aside-note-tree-item-title">{title}</span>
        <span className="aside-note-tree-item-icon aside-note-tree-item-option">
          <PlusOutlined />
        </span>
        <span className="aside-note-tree-item-icon aside-note-tree-item-option">
          <BarsOutlined />
        </span>
      </div>
      {expanded &&
        children?.map((child) => {
          const { id } = child
          const newPad = pad ? pad + 1 : 1
          return (
            <TreeItem
              {...child}
              key={id}
              style={{ paddingLeft: newPad * 20 + 'px' }}
              pad={newPad}
            />
          )
        })}
    </>
  )
})

TreeItem.displayName = 'TreeItem'

export default TreeItem
