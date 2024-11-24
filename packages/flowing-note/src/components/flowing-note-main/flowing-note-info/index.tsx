import { UserOutlined } from '@ant-design/icons'
import './index.scss'

const FlowingNoteInfo = ({
  lastModified,
  author
}: {
  lastModified: string
  author: string
}) => (
  <div className="app-note-info">
    <span className="app-note-info-avatar">
      <UserOutlined />
    </span>
    <span className="app-note-info-author">{author}</span>
    <span className="app-note-info-date">{lastModified} 修改</span>
  </div>
)

export default FlowingNoteInfo
