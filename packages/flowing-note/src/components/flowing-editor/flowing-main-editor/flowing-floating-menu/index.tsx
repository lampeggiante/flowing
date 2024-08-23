import type { RCSetter } from '@/types/react'
import { floatingMenus, Level } from './constants'
import './index.scss'
import type { Editor } from '@tiptap/react'
import { log } from '@/utils/log'

interface FlowingFloatingMenu {
  editor: Editor | null
  setShouldFix: RCSetter<boolean>
}

const FlowingFloatingMenu = (props: FlowingFloatingMenu) => {
  const { editor, setShouldFix } = props

  const handleToggleHeading = (level: Level) => {
    editor?.chain().focus().toggleHeading({ level }).run()
    setShouldFix(true)
    log('editor', editor)
    const selection = editor?.view.state.selection.$from.pos || 0
    log('selection', selection)
    editor?.commands.deleteRange({ from: selection - 1, to: selection })
  }

  return (
    <ul className="flowing-floating-menu">
      {floatingMenus.map((item) => (
        <li
          className={
            'flowing-floating-menu-item' +
            (editor?.isActive(item.type, item.option)
              ? ' flowing-floating-menu-item-active'
              : '')
          }
          key={item.name}
          onClick={() => handleToggleHeading(item.option.level as Level)}
        >
          {item.name}
        </li>
      ))}
    </ul>
  )
}

export default FlowingFloatingMenu
