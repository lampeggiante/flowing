import { forwardRef, useState } from 'react'
import TreeItem from './tree-item'
import type { TreeItemProps } from './tree-item'
import {
  CaretDownOutlined,
  CaretRightOutlined,
  PlusOutlined
} from '@ant-design/icons'
import { useNoteTree } from '@/hooks/useNoteTree'
import { useNoteState } from '@/hooks/useNoteState'
interface TreeProps {
  title: string
  treeData: TreeItemProps[]
}

const Tree = forwardRef<HTMLDivElement, TreeProps>((props, ref) => {
  const { treeData, title, ...rest } = props
  const [expanded, setExpanded] = useState<boolean>(true)
  const { appendNote } = useNoteTree()
  const { addNewNote } = useNoteState()

  return (
    <>
      <div className="aside-note-tree-header">
        <span className="aside-note-tree-header-container">
          <span
            className="aside-note-tree-header-hover aside-note-tree-header-title"
            onClick={() => setExpanded(!expanded)}
          >
            {title}
            <span>
              {expanded ? <CaretDownOutlined /> : <CaretRightOutlined />}
            </span>
          </span>
          <span>
            <span
              className="aside-note-tree-header-hover aside-note-tree-header-item aside-note-tree-header-option"
              onClick={() => {
                const newId = appendNote(null)
                addNewNote(null, newId)
                location.pathname = `/flowing/wiki/${newId}`
              }}
            >
              <PlusOutlined />
            </span>
            {/* <span className="aside-note-tree-header-hover aside-note-tree-header-item aside-note-tree-header-option">
              <BarsOutlined />
            </span> */}
          </span>
        </span>
      </div>
      <div
        {...rest}
        className={
          'aside-note-tree' + (expanded ? '' : ' aside-note-tree-hidden')
        }
        ref={ref}
      >
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
