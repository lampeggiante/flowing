/**
 * 全局是左右布局，左边是路由导航，右边是主界面
 *   - 主界面分为两部分，上面为工具栏，用来防止工具和链接，下面是编辑器主体
 */
import { FlowingNoteAside } from './components/flowing-note-aside'
import {
  containerStyle,
  mainStyle,
  headerStyle,
  contentStyle
} from './styles/object'
import './styles/scss/App.scss'

function App() {
  return (
    <div className="app-container" style={containerStyle}>
      <FlowingNoteAside />
      <div className="app-main" style={mainStyle}>
        <div className="app-header" style={headerStyle}>
          工具栏
        </div>
        <div className="app-content" style={contentStyle}>
          主要内容
        </div>
      </div>
    </div>
  )
}

export default App
