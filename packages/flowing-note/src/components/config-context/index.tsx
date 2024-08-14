import { createContext, ReactNode, useCallback, useMemo, useState } from 'react'
import { getItem } from '@/utils/localstorage'
import { ConfigContextKeys as keys } from './constants'

export const GlobalConfigCtx: React.Context<GlobalConfig> = createContext(
  {} as GlobalConfig
)
const tabOpen = getItem(keys.FlowingTabOpen) ?? true
const globalTheme = getItem(keys.FlowingTheme) ?? 'light'
const asideWidth = getItem(keys.FlowingAsideWidth) ?? '250px'
document.body.setAttribute('flowing-theme', globalTheme)
export function ConfigContext({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState<boolean>(tabOpen)
  const [theme, setTheme] = useState<'light' | 'dark'>(globalTheme)
  const [width, setWidth] = useState<string>(asideWidth)

  const setOpenAside = useCallback(
    (val: boolean) => {
      setOpen(val)
      localStorage.setItem(keys.FlowingTabOpen, val ? 'true' : 'false')
    },
    [setOpen]
  )

  const setGlobalTheme = useCallback(
    (val: 'light' | 'dark') => {
      setTheme(val)
      document.body.setAttribute('flowing-theme', val)
      localStorage.setItem(keys.FlowingTheme, val)
    },
    [setTheme]
  )

  const setAsideWidth = useCallback(
    (val: string) => {
      setWidth(val)
      localStorage.setItem(keys.FlowingAsideWidth, val.toString())
    },
    [setWidth]
  )

  const globalConfig: GlobalConfig = useMemo(() => {
    return {
      openAside: open,
      setOpenAside,
      globalTheme: theme,
      setGlobalTheme,
      asideWidth: width,
      setAsideWidth
    }
  }, [open, setOpen, theme, setTheme])

  return (
    <GlobalConfigCtx.Provider value={globalConfig}>
      {children}
    </GlobalConfigCtx.Provider>
  )
}
