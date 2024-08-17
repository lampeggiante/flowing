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
import { useParams } from 'react-router-dom'
import { init } from './services/init'
import { useNoteState } from './hooks/useNoteState'

function App() {
  const { id } = useParams()
  const { setCurrentNote } = useNoteState()

  const WelcomePage = () => {
    return (
      <div className="app-welcome">
        欢迎来到<span className="app-welcome-title">Flowing</span>
      </div>
    )
  }

  useEffect(() => {
    if (!id) return
    setCurrentNote(parseInt(id))
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
