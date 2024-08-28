import { GlobalConfigCtx } from '@/components/config-context'
import { SkinOutlined } from '@ant-design/icons'
import { FlowingButton, FlowingTooltip } from '@flowing/components'
import { useCallback, useContext } from 'react'

export function HeaderTool() {
  /** hooks */
  const { globalTheme, setGlobalTheme } = useContext(GlobalConfigCtx)

  const handleSkinChange = useCallback(() => {
    const toTheme = globalTheme === 'dark' ? 'light' : 'dark'
    setGlobalTheme(toTheme)
  }, [globalTheme])

  return (
    <div className="app-header-tool">
      <FlowingTooltip content="切换皮肤" placement="left">
        <FlowingButton
          className="flowing-frontColor flowing-fontColor app-header-tool-item"
          onClick={handleSkinChange}
        >
          <SkinOutlined />
        </FlowingButton>
      </FlowingTooltip>
    </div>
  )
}
