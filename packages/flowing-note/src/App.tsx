/**
 * 全局是左右布局，左边是路由导航，右边是主界面
 *   - 主界面分为两部分，上面为工具栏，用来防止工具和链接，下面是编辑器主体
 */
import { ConfigContext } from './components/config-context'
import { FlowingNoteAside } from './components/flowing-note-aside'
import { FlowingNoteHeader } from './components/flowing-note-header'
import { FlowingNoteMain } from './components/flowing-note-main'
import './app.scss'
import { useEffect } from 'react'
import { noteDB } from './services/note-store'
import { useLocation } from 'react-router-dom'
import { init } from './services/init'
import { useNoteState } from './hooks/useNoteState'
import { info } from './utils/log'

function App() {
  const location = useLocation()
  const id = new URLSearchParams(location.search).get('id')
  const { setCurrentNote } = useNoteState()

  const WelcomePage = () => {
    return (
      <div className="app-welcome">
        欢迎来到<span className="app-welcome-title">Flowing</span>
      </div>
    )
  }

  useEffect(() => {
    if (!id) {
      setCurrentNote(0)
      info('没有id，默认设置为0')
      return
    }
    setCurrentNote(parseInt(id))
    info(`id为${id}，设置为当前笔记`)
  }, [id])

  useEffect(() => {
    init()
    return () => {
      noteDB.instance!.closeDatabase()
    }
  }, [])
  return (
    <ConfigContext>
      <div className="app-container">
        <FlowingNoteAside />
        <div className="app-content">
          <FlowingNoteHeader />
          {id ? <FlowingNoteMain /> : <WelcomePage />}
        </div>
      </div>
    </ConfigContext>
  )
}

export default App
