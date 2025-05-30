import { useNoteState } from '@/hooks/useNoteState'
import { useNoteTree } from '@/hooks/useNoteTree'
import { log } from '@/utils/log'
import {
  CaretRightOutlined,
  CaretDownOutlined,
  FileTextOutlined,
  PlusOutlined
} from '@ant-design/icons'
import { Tooltip, message } from 'antd'
import {
  forwardRef,
  HTMLAttributes,
  ReactNode,
  useCallback,
  useRef,
  useState,
  type MouseEvent
} from 'react'
import { Link, useNavigate } from 'react-router-dom'

export interface TreeItemProps {
  prefixIcon?: ReactNode
  title: string
  id: string
  level: number
  pad?: number
  expanded?: boolean
  children: TreeItemProps[]
  style?: HTMLAttributes<HTMLDivElement>['style']
}

const TreeItem = forwardRef<HTMLDivElement, TreeItemProps>((props, ref) => {
  /** props and states */
  const {
    prefixIcon,
    title,
    id,
    level,
    pad,
    children,
    expanded: initExpanded,
    ...rest
  } = props
  const [expanded, setExpanded] = useState<boolean>(initExpanded ?? false)
  const titleRef = useRef<HTMLSpanElement>(null)
  const caretClsName =
    'aside-note-tree-item-icon aside-note-tree-item-caret' +
    (children.length > 0 ? ' aside-note-tree-item-icon-hover' : '')
  const { updateTreeItemExpanded, appendNote } = useNoteTree()
  const { addNewNote } = useNoteState()
  const handleExpand = useCallback(
    (e: MouseEvent<HTMLSpanElement>) => {
      e.preventDefault()
      setExpanded(!expanded)
      updateTreeItemExpanded(id, !expanded)
    },
    [expanded, id, updateTreeItemExpanded]
  )
  const navigate = useNavigate()

  // const handleChangeIcon = useCallback((e: MouseEvent<HTMLSpanElement>) => {
  //   e.preventDefault()
  // }, [])

  const handleAddNote = useCallback(
    async (e: MouseEvent<HTMLSpanElement>, id: string, level: number) => {
      e.preventDefault()
      if (level >= 5) {
        message.error('最多只能创建5级笔记')
        return
      }
      log('handleAddNote', id)
      const newId = appendNote(id, level)
      await addNewNote(id, newId, level)
      navigate(`/wiki/${newId}`)
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
              onClick={(e) => handleAddNote(e, id, level)}
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
