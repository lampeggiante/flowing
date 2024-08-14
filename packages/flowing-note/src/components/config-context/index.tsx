import { createContext, ReactNode, useMemo, useState } from 'react'

export const GlobalConfigCtx: React.Context<GlobalConfig> = createContext(
  {} as GlobalConfig
)

export function ConfigContext({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState<boolean>(true)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const globalConfig: GlobalConfig = useMemo(() => {
    return {
      openAside: open,
      setOpenAside: setOpen,
      globalTheme: theme,
      setGlobalTheme: setTheme
    }
  }, [open, setOpen, theme, setTheme])

  return (
    <GlobalConfigCtx.Provider value={globalConfig}>
      {children}
    </GlobalConfigCtx.Provider>
  )
}
