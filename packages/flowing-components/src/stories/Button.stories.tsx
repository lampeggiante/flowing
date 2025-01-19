import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import '../style/flowing.css'

import { Button } from '../..'

const meta: Meta<typeof Button> = {
  title: 'Common/Button',
  component: Button
}

export default meta

type Story = StoryObj<typeof Button>

export const DifferentType: Story = {
  render: () => (
    <div className="w-full h-80 flex items-center justify-center gap-4">
      <Button type="primary">Primary Button</Button>
      <Button type="secondary">Secondary Button</Button>
      <Button type="dashed">Dashed Button</Button>
      <Button type="outline">Outline Button</Button>
      <Button type="text">Text Button</Button>
    </div>
  )
}

export const DifferentStatus: Story = {
  render: () => (
    <div className="w-full h-80 flex items-center justify-center gap-4">
      <Button status="success">Success Button</Button>
      <Button>Default Button</Button>
      <Button status="warning">Warning Button</Button>
      <Button status="danger">Danger Button</Button>
      <Button status="info">Info Button</Button>
      <Button loading>Loading Button</Button>
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
