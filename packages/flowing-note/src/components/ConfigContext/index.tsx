import { useLocalStorage } from '@/hooks/useLocalStorage'
import { createContext, ReactNode, useMemo, useState } from 'react'

export const GlobalConfigCtx: React.Context<GlobalConfig> = createContext(
  {} as GlobalConfig
)

export function ConfigContext({ children }: { children: ReactNode }) {
  const { getItem } = useLocalStorage()
  const storagedConfig: GlobalConfig = getItem('globalConfig') || {
    openAside: true
  }
  const [open, setOpen] = useState<boolean>(storagedConfig.openAside)
  const globalConfig: GlobalConfig = useMemo(() => {
    return {
      openAside: open,
      setOpenAside: setOpen
    }
  }, [open, setOpen])

  return (
    <GlobalConfigCtx.Provider value={globalConfig}>
      {children}
    </GlobalConfigCtx.Provider>
  )
}
