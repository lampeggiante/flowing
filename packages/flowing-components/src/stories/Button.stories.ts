import type { Meta, StoryObj } from '@storybook/react'
import '../style/flowing.css'

import { Button } from '../..'

const meta: Meta<typeof Button> = {
  title: 'Flowing/Button',
  component: Button
}

export default meta

type Story = StoryObj<typeof Button>

export const Basic: Story = {
  args: {
    children: '按钮',
    status: 'default'
  }
}

export const Primary: Story = {
  args: {
    children: '按钮',
    status: 'success'
  }
}

export const Secondary: Story = {
  args: {
    children: '按钮',
    status: 'info'
  }
}
