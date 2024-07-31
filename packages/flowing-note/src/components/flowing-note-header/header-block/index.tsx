import { GlobalConfigCtx } from '@/components/config-context'
import { useContext, useEffect, useState } from 'react'

export function HeaderBlock() {
  const [block, setBlock] = useState<HTMLElement | null>(null)
  const { openAside } = useContext(GlobalConfigCtx)

  useEffect(() => {
    const ele = document.querySelector('.app-header-block')
    if (ele) setBlock(ele as HTMLElement)
  }, [])
  useEffect(() => {
    if (block) {
      block.style.display = openAside ? 'none' : 'inline'
    }
  }, [openAside])
  return <span className="app-header-block" />
}
