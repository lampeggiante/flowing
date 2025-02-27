import { useNoteState } from '@/hooks/useNoteState'
import { useNoteTree } from '@/hooks/useNoteTree'
import { log } from '@/utils/log'
import {
  CaretRightOutlined,
  CaretDownOutlined,
  FileTextOutlined,
  PlusOutlined
} from '@ant-design/icons'
import { Tooltip } from 'antd'
import {
  forwardRef,
  HTMLAttributes,
  ReactNode,
  useCallback,
  useRef,
  useState,
  type MouseEvent
} from 'react'
import { Link } from 'react-router-dom'

export interface TreeItemProps {
  prefixIcon?: ReactNode
  title: string
  id: number
  pad?: number
  children: TreeItemProps[]
  style?: HTMLAttributes<HTMLDivElement>['style']
}

const TreeItem = forwardRef<HTMLDivElement, TreeItemProps>((props, ref) => {
  /** props and states */
  const { prefixIcon, title, id, pad, children, ...rest } = props
  const [expanded, setExpanded] = useState<boolean>(false)
  const titleRef = useRef<HTMLSpanElement>(null)
  const caretClsName =
    'aside-note-tree-item-icon aside-note-tree-item-caret' +
    (children.length > 0 ? ' aside-note-tree-item-icon-hover' : '')
  const { appendNote } = useNoteTree()
  const { addNewNote } = useNoteState()
  const handleExpand = useCallback(
    (e: MouseEvent<HTMLSpanElement>) => {
      e.preventDefault()
      setExpanded(!expanded)
    },
    [expanded]
  )

  // const handleChangeIcon = useCallback((e: MouseEvent<HTMLSpanElement>) => {
  //   e.preventDefault()
  // }, [])

  const handleAddNote = useCallback(
    (e: MouseEvent<HTMLSpanElement>, id: number) => {
      e.preventDefault()
      log('handleAddNote', id)
      const newId = appendNote(id)
      addNewNote(id, newId)
      location.pathname = `/flowing/wiki/${newId}`
    },
    [appendNote, addNewNote]
  )

  // const handleShowOption = useCallback((e: MouseEvent<HTMLSpanElement>) => {
  //   e.preventDefault()
  // }, [])

  return (
    <>
      <Tooltip
        title={title}
        placement="right"
        // tooltipCls="aside-tooltip"
        // gap={25}
        // delay={100}
      >
        <Link to={`/wiki/${id}`} style={{ width: '100%' }}>
          <div ref={ref} className="aside-note-tree-item" {...rest}>
            <span className={caretClsName} onClick={handleExpand}>
              {children.length > 0 &&
                (expanded ? <CaretDownOutlined /> : <CaretRightOutlined />)}
            </span>
            <span
              className="aside-note-tree-item-icon"
              // onClick={handleChangeIcon}
            >
              {prefixIcon || <FileTextOutlined />}
            </span>
            <span ref={titleRef} className="aside-note-tree-item-title">
              {title}
            </span>
            <span
              className="aside-note-tree-item-icon aside-note-tree-item-option aside-note-tree-item-icon-hover"
              onClick={(e) => handleAddNote(e, id)}
            >
              <PlusOutlined />
            </span>
            {/* <span
              className="aside-note-tree-item-icon aside-note-tree-item-option aside-note-tree-item-icon-hover"
              onClick={handleShowOption}
            >
              <BarsOutlined />
            </span> */}
          </div>
        </Link>
      </Tooltip>
      {expanded &&
        children?.map((child) => {
          const { id } = child
          const newPad = pad ? pad + 1 : 1
          return (
            <TreeItem
              {...child}
              key={id}
              style={{ paddingLeft: newPad * 10 + 'px' }}
              pad={newPad}
            />
          )
        })}
    </>
  )
})

TreeItem.displayName = 'TreeItem'

export default TreeItem
