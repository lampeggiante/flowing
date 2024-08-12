import { FlowingButton } from 'flowing-components'
import './index.scss'
const FlowingFloatingMenu = () => {
  return (
    <div className="flowing-floating-menu">
      <FlowingButton className="flowing-floating-menu-item">
        Heading 1
      </FlowingButton>
      <FlowingButton className="flowing-floating-menu-item">
        Heading 2
      </FlowingButton>
      <FlowingButton className="flowing-floating-menu-item">
        Heading 3
      </FlowingButton>
      <FlowingButton className="flowing-floating-menu-item">
        Heading 4
      </FlowingButton>
      <FlowingButton className="flowing-floating-menu-item">
        Heading 5
      </FlowingButton>
      <FlowingButton className="flowing-floating-menu-item">
        Heading 6
      </FlowingButton>
      <FlowingButton className="flowing-floating-menu-item">Text</FlowingButton>
    </div>
  )
}

export default FlowingFloatingMenu
