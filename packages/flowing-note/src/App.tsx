/**
 * 全局是左右布局，左边是路由导航，右边是主界面
 *   - 主界面分为两部分，上面为工具栏，用来防止工具和链接，下面是编辑器主体
 */
import { ConfigContext } from './components/config-context'
import { FlowingNoteAside } from './components/flowing-note-aside'
import { FlowingNoteHeader } from './components/flowing-note-header'
import { FlowingNoteMain } from './components/flowing-note-main'
import './app.scss'
import useWebWorker from './hooks/useWebWorker'
import { useEffect } from 'react'

function App() {
  const { getWorker } = useWebWorker()
  getWorker().postMessage('hello')

  useEffect(() => {
    return () => {
      getWorker().terminate()
    }
  })
  return (
    <ConfigContext>
      <div className="app-container">
        <FlowingNoteAside />
        <div className="app-content">
          <FlowingNoteHeader />
          <FlowingNoteMain />
        </div>
      </div>
    </ConfigContext>
  )
}

export default App
