import { HeaderBlock } from './header-block'
import './header.scss'
import { HeaderTitle } from './header-title'
import { HeaderTool } from './header-tool'

export function FlowingNoteHeader() {
  /** states */

  /** hooks */

  /** effects */

  return (
    <header className="app-header">
      <HeaderBlock />
      <div className="app-header-container">
        <HeaderTitle />
        <HeaderTool />
      </div>
    </header>
  )
}
