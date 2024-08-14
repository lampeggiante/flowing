import { createContext, ReactNode, useMemo, useState } from 'react'
import { getItem } from '@/utils/localstorage'
import { ConfigContextKeys as keys } from './constants'

export const GlobalConfigCtx: React.Context<GlobalConfig> = createContext(
  {} as GlobalConfig
)
const tabOpen = getItem(keys.FlowingTabOpen) ?? true
const globalTheme = getItem(keys.FlowingTheme) ?? 'light'
document.body.setAttribute('flowing-theme', globalTheme)
export function ConfigContext({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState<boolean>(tabOpen)
  const [theme, setTheme] = useState<'light' | 'dark'>(globalTheme)

  const setOpenAside = (val: boolean) => {
    setOpen(val)
    localStorage.setItem(keys.FlowingTabOpen, val ? 'true' : 'false')
  }

  const setGlobalTheme = (val: 'light' | 'dark') => {
    setTheme(val)
    document.body.setAttribute('flowing-theme', val)
    localStorage.setItem(keys.FlowingTheme, val)
  }

  const globalConfig: GlobalConfig = useMemo(() => {
    return {
      openAside: open,
      setOpenAside,
      globalTheme: theme,
      setGlobalTheme
    }
  }, [open, setOpen, theme, setTheme])

  return (
    <GlobalConfigCtx.Provider value={globalConfig}>
      {children}
    </GlobalConfigCtx.Provider>
  )
}
