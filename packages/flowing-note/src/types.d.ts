declare interface GlobalConfig {
  openAside: boolean
  setOpenAside?: (value: boolean) => void
  globalTheme: 'dark' | 'light'
  setGlobalTheme?: (value: 'dark' | 'light') => void
}

declare const __DEV__: boolean
