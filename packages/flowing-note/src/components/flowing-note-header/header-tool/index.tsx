import { GlobalConfigCtx } from '@/components/config-context'
import { SkinOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
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
      <Tooltip title="切换皮肤" placement="left">
        <Button
          className="flowing-frontColor flowing-fontColor app-header-tool-item"
          onClick={handleSkinChange}
        >
          <SkinOutlined />
        </Button>
      </Tooltip>
    </div>
  )
}
