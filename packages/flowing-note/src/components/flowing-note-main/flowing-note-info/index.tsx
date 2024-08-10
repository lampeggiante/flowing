import { UserOutlined } from '@ant-design/icons'
import './index.scss'

const FlowingNoteInfo = () => {
  return (
    <div className="app-note-info">
      <span className="app-note-info-avatar">
        <UserOutlined />
      </span>
      <span className="app-note-info-author">Leon Yu</span>
      <span className="app-note-info-date">2024-08-10 21:28 修改</span>
    </div>
  )
}

export default FlowingNoteInfo
