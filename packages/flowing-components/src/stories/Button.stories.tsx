import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import '../style/flowing.css'

import { Button } from '../..'
import { IconApps } from '@flowing/icons'

const meta: Meta<typeof Button> = {
  title: '通用组件/Button',
  component: Button
}

export default meta

type Story = StoryObj<typeof Button>

export const DifferentType: Story = {
  render: () => (
    <div className="w-full h-60 flex flex-col p-8">
      <header className="h-20 mb-4">
        按钮总共有四种类型：默认按钮 点状按钮 外框按钮 文字按钮
      </header>
      <div className="h-40 w-full border-black border flex items-center justify-center gap-4">
        <Button>默认按钮</Button>
        <Button type="dashed">点状按钮</Button>
        <Button type="outline">外框按钮</Button>
        <Button type="text">文字按钮</Button>
      </div>
    </div>
  )
}

export const DifferentTheme: Story = {
  render: () => (
    <div className="w-full h-60 flex flex-col p-8">
      <header className="h-20 mb-4">
        按钮有六种主题：Primary、Success、Default、Warning、Danger、Info
      </header>
      <div>默认按钮</div>
      <div className="w-full flex items-center justify-center gap-4">
        <Button theme="primary">Primary Button</Button>
        <Button theme="success">Success Button</Button>
        <Button>Default Button</Button>
        <Button theme="warning">Warning Button</Button>
        <Button theme="danger">Danger Button</Button>
        <Button theme="info">Info Button</Button>
      </div>
      <div>点状按钮</div>
      <div className="w-full flex items-center justify-center gap-4">
        <Button type="dashed" theme="primary">
          Primary Button
        </Button>
        <Button type="dashed" theme="success">
          Success Button
        </Button>
        <Button type="dashed">Default Button</Button>
        <Button type="dashed" theme="warning">
          Warning Button
        </Button>
        <Button type="dashed" theme="danger">
          Danger Button
        </Button>
        <Button type="dashed" theme="info">
          Info Button
        </Button>
      </div>
      <div>外框按钮</div>
      <div className="w-full flex items-center justify-center gap-4">
        <Button type="outline" theme="primary">
          Primary Button
        </Button>
        <Button type="outline" theme="success">
          Success Button
        </Button>
        <Button type="outline">Default Button</Button>
        <Button type="outline" theme="warning">
          Warning Button
        </Button>
        <Button type="outline" theme="danger">
          Danger Button
        </Button>
        <Button type="outline" theme="info">
          Info Button
        </Button>
      </div>
      <div>文字按钮</div>
      <div className="w-full flex items-center justify-center gap-4">
        <Button type="text" theme="primary">
          Primary Button
        </Button>
        <Button type="text" theme="success">
          Success Button
        </Button>
        <Button type="text">Default Button</Button>
        <Button type="text" theme="warning">
          Warning Button
        </Button>
        <Button type="text" theme="danger">
          Danger Button
        </Button>
        <Button type="text" theme="info">
          Info Button
        </Button>
      </div>
    </div>
  )
}

export const DifferentSize: Story = {
  render: () => (
    <div className="w-full h-80 flex items-center justify-center gap-4">
      <Button size="large">Large Button</Button>
      <Button>Default Button</Button>
      <Button size="small">Small Button</Button>
      <Button size="mini">Mini Button</Button>
    </div>
  )
}

export const DifferentShape: Story = {
  render: () => (
    <div className="w-full h-80 flex items-center justify-center gap-4">
      <Button shape="circle">Circle Button</Button>
      <Button>Default Button</Button>
      <Button shape="round">Round Button</Button>
    </div>
  )
}

export const AnchorButton: Story = {
  render: () => (
    <div className="w-full h-80 flex items-center justify-center gap-4">
      <Button href="https://github.com/lampeggiante/flowing" target="_blank">
        Anchor Button
      </Button>
    </div>
  )
}

export const LoadingAndDisabled: Story = {
  render: () => (
    <div className="w-full h-80 flex items-center justify-center gap-4">
      <Button loading>Loading Button</Button>
      <Button disabled>Disabled Button</Button>
    </div>
  )
}

export const setLoadingOrDisabled: Story = {
  render: () => {
    const [loading, setLoading] = useState(false)
    const [disabled, setDisabled] = useState(false)
    return (
      <div className="w-full h-80 flex items-center justify-center gap-4">
        <Button onClick={() => setLoading(!loading)}>
          点击{loading ? '关闭' : '开启'}加载
        </Button>
        <Button onClick={() => setDisabled(!disabled)}>
          点击{disabled ? '启用' : '禁用'}按钮
        </Button>
        <Button disabled={disabled} loading={loading}>
          展示按钮
        </Button>
      </div>
    )
  }
}

export const IconsButton: Story = {
  render: () => (
    <div className="w-full h-80 flex items-center justify-center gap-4">
      <Button>无图标按钮</Button>
      <Button prefixIcon={<IconApps />}>前置按钮</Button>
      <Button suffixIcon={<IconApps />}>后置按钮</Button>
      <Button prefixIcon={<IconApps />} suffixIcon={<IconApps />}>
        前后置按钮
      </Button>
    </div>
  )
}

export const ButtonOnlyIcon: Story = {
  render: () => (
    <div className="w-full h-80 flex items-center justify-center gap-4">
      <Button pureCircle>
        <IconApps />
      </Button>
      <Button shape={'circle'} pureCircle>
        <IconApps />
      </Button>
    </div>
  )
}

export const ButtonLong: Story = {
  render: () => (
    <div className="w-full h-80 flex items-center justify-center gap-4">
      <Button long>宽度撑满父级元素的Button</Button>
    </div>
  )
}
