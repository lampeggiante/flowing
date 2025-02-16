import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import FlowingTooltip from '../components/tooltip/index'

const meta = {
  title: 'Components/FlowingTooltip',
  component: FlowingTooltip,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof FlowingTooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    content: '这是一个基础的提示框',
    children: (
      <button className="px-4 py-2 bg-blue-500 text-white rounded">
        悬停查看提示
      </button>
    )
  }
}

export const Placements: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {['top', 'bottom', 'left', 'right'].map((placement) => (
        <FlowingTooltip
          key={placement}
          content={`${placement}位置的提示`}
          placement={placement as 'top' | 'bottom' | 'left' | 'right'}
        >
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            {placement}
          </button>
        </FlowingTooltip>
      ))}
    </div>
  )
}

export const CustomContent: Story = {
  args: {
    content: (
      <div className="p-2">
        <h3 className="font-bold mb-2">自定义内容</h3>
        <p className="text-sm">支持传入任意React节点作为提示内容</p>
      </div>
    ),
    children: (
      <button className="px-4 py-2 bg-blue-500 text-white rounded">
        查看自定义内容
      </button>
    )
  }
}

export const TriggerTypes: Story = {
  render: () => (
    <div className="flex gap-4">
      <FlowingTooltip content="悬停触发提示" triggerType="hover">
        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          Hover触发
        </button>
      </FlowingTooltip>
      <FlowingTooltip content="点击触发提示" triggerType="click">
        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          Click触发
        </button>
      </FlowingTooltip>
    </div>
  )
}

export const CustomStyle: Story = {
  args: {
    content: '自定义样式的提示框',
    tooltipCls: 'bg-purple-500 text-white rounded-lg shadow-lg',
    children: (
      <button className="px-4 py-2 bg-purple-500 text-white rounded">
        自定义样式
      </button>
    )
  }
}

export const WithDelay: Story = {
  args: {
    content: '延迟显示和隐藏的提示框',
    delay: 500,
    children: (
      <button className="px-4 py-2 bg-blue-500 text-white rounded">
        延迟效果
      </button>
    )
  }
}

export const DisabledTooltip: Story = {
  args: {
    content: '禁用状态下不会显示提示',
    disabled: true,
    children: (
      <button className="px-4 py-2 bg-gray-400 text-white rounded cursor-not-allowed">
        禁用状态
      </button>
    )
  }
}
