import { GlobalConfigCtx } from '@/components/ConfigContext'
import { useCallback, useContext, useEffect, useState } from 'react'

export function HeaderTool() {
  /** states */
  const [bodyContainer, setBodyContainer] = useState<HTMLDivElement | null>(
    null
  )

  /** hooks */
  const { globalTheme, setGlobalTheme } = useContext(GlobalConfigCtx)

  const handleSkinChange = useCallback(() => {
    if (!bodyContainer) return
    const toTheme = globalTheme === 'dark' ? 'light' : 'dark'
    if (setGlobalTheme) {
      setGlobalTheme(toTheme)
    }
    bodyContainer.setAttribute('flowing-theme', toTheme)
  }, [globalTheme, bodyContainer])

  useEffect(() => {
    const bodyContainer = document.body
    setBodyContainer(bodyContainer as HTMLDivElement)
  }, [bodyContainer])
  return (
    <div className="app-header-tool">
      <button onClick={handleSkinChange}>换肤</button>
    </div>
  )
}
