import { Outlet } from 'react-router-dom'
import './main.scss'

export function FlowingNoteMain() {
  return (
    <main className="app-main">
      <Outlet />
    </main>
  )
}
