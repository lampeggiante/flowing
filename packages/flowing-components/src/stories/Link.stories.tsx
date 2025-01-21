import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import '../style/flowing.css'

import { Link } from '../..'
import { IconApps } from '@flowing/icons'

const meta: Meta<typeof Link> = {
  title: '通用/Link',
  component: Link
}

export default meta

type Story = StoryObj<typeof Link>

export const DifferentStatus: Story = {
  render: () => (
    <div className="w-full h-60 flex flex-col p-8">
      <header className="h-20 mb-4">
        链接有四种状态：默认、成功、警告、错误
      </header>
      <div className="h-40 w-full border-black border flex items-center justify-center gap-4">
        <Link href="https://github.com">默认链接</Link>
        <Link href="https://github.com" status="success">
          成功链接
        </Link>
        <Link href="https://github.com" status="warning">
          警告链接
        </Link>
        <Link href="https://github.com" status="error">
          错误链接
        </Link>
      </div>
    </div>
  )
}

export const WithIcon: Story = {
  render: () => (
    <div className="w-full h-60 flex flex-col p-8">
      <header className="h-20 mb-4">链接可以配置图标</header>
      <div className="h-40 w-full border-black border flex items-center justify-center gap-4">
        <Link href="https://github.com">无图标链接</Link>
        <Link href="https://github.com" icon={true}>
          默认图标链接
        </Link>
        <Link href="https://github.com" icon={<IconApps />}>
          自定义图标链接
        </Link>
      </div>
    </div>
  )
}

export const DisabledLink: Story = {
  render: () => (
    <div className="w-full h-60 flex flex-col p-8">
      <header className="h-20 mb-4">禁用状态的链接</header>
      <div className="h-40 w-full border-black border flex items-center justify-center gap-4">
        <Link href="https://github.com" disabled>
          禁用的链接
        </Link>
        <Link href="https://github.com" disabled icon={true}>
          禁用的图标链接
        </Link>
        <Link href="https://github.com" disabled status="success">
          禁用的成功链接
        </Link>
        <Link href="https://github.com" disabled status="warning">
          禁用的警告链接
        </Link>
        <Link href="https://github.com" disabled status="error">
          禁用的错误链接
        </Link>
      </div>
    </div>
  )
}

export const TextAndSpan: Story = {
  render: () => (
    <div className="w-full h-60 flex flex-col p-8">
      <header className="h-20 mb-4">
        链接可以是可点击的a标签或纯文本span标签
      </header>
      <div className="h-40 w-full border-black border flex items-center justify-center gap-4">
        <Link href="https://github.com">可点击链接</Link>
        <Link>纯文本链接</Link>
      </div>
    </div>
  )
}

export const WithClick: Story = {
  render: () => (
    <div className="w-full h-60 flex flex-col p-8">
      <header className="h-20 mb-4">链接点击事件</header>
      <div className="h-40 w-full border-black border flex items-center justify-center gap-4">
        <Link
          href="https://github.com"
          onClick={(e) => {
            e.preventDefault()
            alert('链接被点击了！')
          }}
        >
          点击我试试
        </Link>
      </div>
    </div>
  )
}
