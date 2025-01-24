import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Input } from '../../index'
import '../style/flowing.css'

const meta: Meta<typeof Input> = {
  title: '表单/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    placeholder: '请输入内容'
  }
}

export default meta
type Story = StoryObj<typeof Input>

// 基础用法
export const Basic: Story = {
  args: {
    placeholder: '请输入'
  },

  render: (args) => <Input {...args} />
}

// 不同尺寸
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Input size="small" placeholder="小尺寸" />
      <Input size="medium" placeholder="中等尺寸" />
      <Input size="large" placeholder="大尺寸" />
    </div>
  )
}

// 不同状态
export const Status: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Input status="default" placeholder="默认状态" />
      <Input status="warning" placeholder="警告状态" />
      <Input status="error" placeholder="错误状态" />
    </div>
  )
}

// 禁用状态
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Input disabled placeholder="禁用状态" />
      <Input disabled value="禁用状态带值" />
    </div>
  )
}

// 只读状态
export const ReadOnly: Story = {
  render: () => <Input readOnly value="只读状态" />
}

// 可清除内容
export const Clearable: Story = {
  render: () => {
    const [value, setValue] = useState('可清除的内容')
    return (
      <Input
        allowClear
        value={value}
        onChange={(val) => setValue(val)}
        placeholder="请输入内容"
      />
    )
  }
}

// 前缀和后缀
export const Affix: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Input prefix="￥" placeholder="请输入金额" />
      <Input suffix="RMB" placeholder="请输入金额" />
      <Input prefix="￥" suffix="RMB" placeholder="请输入金额" />
    </div>
  )
}

// 前置/后置标签
export const Addon: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Input addBefore="http://" addAfter=".com" placeholder="请输入" />
      <Input addBefore="+" addAfter="USD" placeholder="请输入金额" />
    </div>
  )
}

// 字数限制
export const WordLimit: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <Input
        showWordLimit
        maxLength={20}
        value={value}
        onChange={(val) => setValue(val)}
        placeholder="请输入内容"
      />
    )
  }
}

// 受控组件
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <div className="flex flex-col gap-4">
        <Input
          value={value}
          onChange={(val) => setValue(val)}
          placeholder="请输入内容"
        />
        <div>当前输入值: {value}</div>
      </div>
    )
  }
}

// 组合展示
export const Combined: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <Input
        size="large"
        value={value}
        onChange={(val) => setValue(val)}
        allowClear
        showWordLimit
        maxLength={50}
        prefix="￥"
        suffix="RMB"
        addBefore="总计"
        addAfter="元"
        placeholder="请输入金额"
      />
    )
  }
}

export const InputEvents: Story = {
  render: () => {
    const [value, setValue] = useState('')

    return (
      <div className="w-full p-8 flex flex-col gap-4">
        <div>
          <h3 className="mb-2">onChange 事件</h3>
          <Input
            placeholder="输入内容会在下方显示"
            onChange={(val) => setValue(val)}
          />
          <div className="mt-2 text-slate-500">当前值: {value}</div>
        </div>

        <div>
          <h3 className="mb-2">onClear 事件</h3>
          <Input
            allowClear
            placeholder="点击清除按钮触发"
            onClear={() => alert('内容已清除')}
          />
        </div>

        <div>
          <h3 className="mb-2">onPressEnter 事件</h3>
          <Input
            placeholder="按下回车键触发"
            onPressEnter={() => alert('按下了回车键')}
          />
        </div>

        <div>
          <h3 className="mb-2">onFocus/onBlur 事件</h3>
          <Input
            placeholder="获得/失去焦点时触发"
            onFocus={() => console.log('输入框获得焦点')}
            onBlur={() => console.log('输入框失去焦点')}
          />
          <div className="mt-2 text-slate-500">请查看控制台输出</div>
        </div>

        <div>
          <h3 className="mb-2">组合使用</h3>
          <Input
            allowClear
            placeholder="组合多个事件"
            onChange={(val) => console.log('值变化:', val)}
            onClear={() => console.log('内容已清除')}
            onPressEnter={() => console.log('按下回车键')}
            onFocus={() => console.log('获得焦点')}
            onBlur={() => console.log('失去焦点')}
          />
          <div className="mt-2 text-slate-500">请查看控制台输出</div>
        </div>
      </div>
    )
  }
}
