import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import '../style/flowing.css'

import { Divider } from '../..'

const meta: Meta<typeof Divider> = {
  title: '布局/Divider',
  component: Divider,
  tags: ['autodocs']
}

export default meta

type Story = StoryObj<typeof Divider>

export const Basic: Story = {
  args: {
    children: '分割线'
  },
  render: (args) => (
    <div className="w-full p-8">
      <p>上面的内容</p>
      <Divider {...args} />
      <p>下面的内容</p>
    </div>
  )
}

export const WithText: Story = {
  render: () => (
    <div className="w-full p-8">
      <p>上面的内容</p>
      <Divider>分割文本</Divider>
      <p>下面的内容</p>
    </div>
  )
}

export const TextPosition: Story = {
  render: () => (
    <div className="w-full p-8">
      <p>不同的文本位置</p>
      <Divider contentPosition="left">左对齐</Divider>
      <p>分隔内容</p>
      <Divider contentPosition="center">居中对齐</Divider>
      <p>分隔内容</p>
      <Divider contentPosition="right">右对齐</Divider>
      <p>分隔内容</p>
    </div>
  )
}

export const Vertical: Story = {
  render: () => (
    <div className="w-full p-8">
      <div className="flex items-center">
        文本
        <Divider type="vertical" />
        <a href="#">链接</a>
        <Divider type="vertical" />
        <a href="#">链接</a>
      </div>
    </div>
  )
}

export const CustomStyle: Story = {
  render: () => (
    <div className="w-full p-8">
      <Divider style={{ borderColor: '#7C3AED' }}>自定义样式</Divider>
      <p>可以自定义分割线的样式</p>
    </div>
  )
}
