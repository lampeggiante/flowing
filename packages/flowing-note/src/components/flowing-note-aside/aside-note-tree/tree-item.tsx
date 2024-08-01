import { FileOutlined } from '@ant-design/icons'
import { FlowingButton } from 'flowing-components'

export interface TreeItemProps {
  title: string
}

const TreeItem = (props: TreeItemProps) => {
  const { title } = props

  return (
    <div>
      <FlowingButton icon={<FileOutlined />}>{title}</FlowingButton>
    </div>
  )
}

export default TreeItem
