import { HeaderBlock } from './header-block'
import '@/styles/header/header.scss'
import { HeaderTitle } from './header-title'
import { HeaderTool } from './header-tool'

export function FlowingNoteHeader() {
  /** states */

  /** hooks */

  /** effects */

  return (
    <header className="app-header">
      <HeaderBlock />
      <span className="app-header-container">
        <HeaderTitle />
        <HeaderTool />
      </span>
    </header>
  )
}
