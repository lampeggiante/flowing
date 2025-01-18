import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '../..'

const meta: Meta<typeof Button> = {
  title: 'Flowing/Button',
  component: Button
}

export default meta

type Story = StoryObj<typeof Button>

export const Basic: Story = {
  args: {
    children: 'Button'
  }
}
