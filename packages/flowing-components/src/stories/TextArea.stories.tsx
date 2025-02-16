import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Input from '../components/input'
import '../style/flowing.css'

const { TextArea } = Input

const meta = {
  title: '表单/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['default', 'error', 'warning']
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'default']
    }
  }
} satisfies Meta<typeof TextArea>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    placeholder: '请输入内容...',
    style: { width: '300px' }
  }
}

export const Sizes: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-4" style={{ width: '300px' }}>
        <TextArea size="small" placeholder="小尺寸" />
        <TextArea size="medium" placeholder="中等尺寸" />
        <TextArea size="large" placeholder="大尺寸" />
      </div>
    )
  }
}

export const Status: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-4" style={{ width: '300px' }}>
        <TextArea status="default" placeholder="默认状态" />
        <TextArea status="error" placeholder="错误状态" />
        <TextArea status="warning" placeholder="警告状态" />
      </div>
    )
  }
}

export const States: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-4" style={{ width: '300px' }}>
        <TextArea placeholder="普通状态" />
        <TextArea disabled placeholder="禁用状态" />
        <TextArea readOnly defaultValue="只读状态" />
      </div>
    )
  }
}

export const WithDefaultValue: Story = {
  args: {
    defaultValue: '这是默认内容',
    style: { width: '300px' }
  }
}

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState('受控组件')
    return (
      <TextArea
        value={value}
        onChange={(e) => {
          console.log('onChange:', e.target.value)
          setValue(e.target.value)
        }}
        style={{ width: '300px' }}
      />
    )
  }
}

export const WithMaxLength: Story = {
  args: {
    maxLength: 100,
    showWordLimit: true,
    placeholder: '最多输入100个字符',
    style: { width: '300px' }
  }
}

export const CompositionDemo: Story = {
  render: () => {
    return (
      <div style={{ width: '300px' }}>
        <p style={{ marginBottom: '8px' }}>
          输入中文时，只会在输入完成后触发回调：
        </p>
        <TextArea
          placeholder="试试输入中文..."
          onChange={(e) => {
            console.log('onChange 被触发:', e.target.value)
          }}
        />
      </div>
    )
  }
}

export const WithEvents: Story = {
  render: () => {
    return (
      <TextArea
        placeholder="请输入内容..."
        style={{ width: '300px' }}
        onChange={(e) => {
          console.log('onChange:', e.target.value)
        }}
        onFocus={() => {
          console.log('onFocus')
        }}
        onBlur={() => {
          console.log('onBlur')
        }}
        onPressEnter={(e) => {
          console.log('onPressEnter:', e.target)
        }}
      />
    )
  }
}

export const WithClear: Story = {
  render: () => {
    return (
      <TextArea
        allowClear
        defaultValue="可以清除的内容"
        style={{ width: '300px' }}
        onChange={(e) => {
          console.log('onChange:', e.target.value)
        }}
        onClear={() => {
          console.log('onClear triggered')
        }}
      />
    )
  }
}

export const WithRowsCols: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-4" style={{ width: '300px' }}>
        <TextArea placeholder="3行文本框" rows={3} />
        <TextArea placeholder="5行文本框" rows={5} />
        <TextArea placeholder="3行20列文本框" rows={3} cols={20} />
      </div>
    )
  }
}

export const AutoSize: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-4" style={{ width: '300px' }}>
        <TextArea placeholder="自动调整高度" autoSize />
        <TextArea
          placeholder="最小3行，最大5行"
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
        <TextArea placeholder="最小3行" autoSize={{ minRows: 3 }} />
        <TextArea placeholder="最大5行" autoSize={{ maxRows: 5 }} />
      </div>
    )
  }
}
