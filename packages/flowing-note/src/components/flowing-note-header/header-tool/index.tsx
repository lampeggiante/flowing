import { useEffect, useState } from 'react'

export function HeaderTool() {
  const [bodyContainer, setBodyContainer] = useState<HTMLDivElement | null>(
    null
  )

  const handleSkinChange = () => {
    if (!bodyContainer) return
    console.log(bodyContainer)
    bodyContainer.setAttribute('flowing-theme', 'dark')
  }

  useEffect(() => {
    const bodyContainer = document.body
    setBodyContainer(bodyContainer as HTMLDivElement)
  }, [bodyContainer])
  return (
    <span className="app-header-tool">
      <button onClick={handleSkinChange}>换肤</button>
    </span>
  )
}
