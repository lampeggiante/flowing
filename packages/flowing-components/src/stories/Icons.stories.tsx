import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import '../style/flowing.css'
import * as Icons from '@flowing/icons'

const meta: Meta = {
  title: '通用组件/Icons',
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj

// 图标分类
const iconCategories = {
  方向类: [
    'IconArrowDown',
    'IconArrowLeft',
    'IconArrowRight',
    'IconArrowUp',
    'IconCaretDown',
    'IconCaretLeft',
    'IconCaretRight',
    'IconCaretUp',
    'IconDoubleLeft',
    'IconDoubleRight'
  ],
  编辑类: [
    'IconEdit',
    'IconCopy',
    'IconDelete',
    'IconSave',
    'IconSearch',
    'IconUpload',
    'IconDownload'
  ],
  提示类: [
    'IconCheck',
    'IconClose',
    'IconInfo',
    'IconWarning',
    'IconError',
    'IconSuccess',
    'IconLoading'
  ],
  媒体类: [
    'IconImage',
    'IconVideo',
    'IconAudio',
    'IconFile',
    'IconFolder',
    'IconDocument'
  ],
  其他: [
    'IconApps',
    'IconLink',
    'IconMenu',
    'IconMore',
    'IconSettings',
    'IconUser',
    'IconHome'
  ]
}

const IconDisplay = ({ name, Icon }: { name: string; Icon: any }) => (
  <div className="flex flex-col items-center justify-center p-4 m-2 border rounded hover:bg-gray-50 w-32 h-32">
    <Icon className="text-2xl mb-2" />
    <span className="text-xs text-gray-600">{name}</span>
  </div>
)

export const AllIcons: Story = {
  render: () => (
    <div className="w-full p-8">
      {Object.entries(iconCategories).map(([category, iconNames]) => (
        <div key={category} className="mb-8">
          <h2 className="text-xl font-bold mb-4">{category}</h2>
          <div className="flex flex-wrap">
            {iconNames.map((iconName) => {
              const Icon = (Icons as any)[iconName]
              return Icon ? (
                <IconDisplay key={iconName} name={iconName} Icon={Icon} />
              ) : null
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

export const IconSizes: Story = {
  render: () => (
    <div className="w-full p-8">
      <h2 className="text-xl font-bold mb-4">图标尺寸</h2>
      <div className="flex items-center gap-8">
        <div className="flex flex-col items-center">
          <Icons.IconApps className="text-xs" />
          <span className="text-xs mt-2">超小</span>
        </div>
        <div className="flex flex-col items-center">
          <Icons.IconApps className="text-sm" />
          <span className="text-xs mt-2">小</span>
        </div>
        <div className="flex flex-col items-center">
          <Icons.IconApps className="text-base" />
          <span className="text-xs mt-2">默认</span>
        </div>
        <div className="flex flex-col items-center">
          <Icons.IconApps className="text-xl" />
          <span className="text-xs mt-2">大</span>
        </div>
        <div className="flex flex-col items-center">
          <Icons.IconApps className="text-2xl" />
          <span className="text-xs mt-2">超大</span>
        </div>
      </div>
    </div>
  )
}

export const IconColors: Story = {
  render: () => (
    <div className="w-full p-8">
      <h2 className="text-xl font-bold mb-4">图标颜色</h2>
      <div className="flex items-center gap-8">
        <div className="flex flex-col items-center">
          <Icons.IconApps className="text-xl text-fuchsia-600" />
          <span className="text-xs mt-2">主色</span>
        </div>
        <div className="flex flex-col items-center">
          <Icons.IconApps className="text-xl text-emerald-600" />
          <span className="text-xs mt-2">成功</span>
        </div>
        <div className="flex flex-col items-center">
          <Icons.IconApps className="text-xl text-yellow-600" />
          <span className="text-xs mt-2">警告</span>
        </div>
        <div className="flex flex-col items-center">
          <Icons.IconApps className="text-xl text-red-600" />
          <span className="text-xs mt-2">错误</span>
        </div>
        <div className="flex flex-col items-center">
          <Icons.IconApps className="text-xl text-slate-600" />
          <span className="text-xs mt-2">默认</span>
        </div>
      </div>
    </div>
  )
}

export const SpinningIcons: Story = {
  render: () => (
    <div className="w-full p-8">
      <h2 className="text-xl font-bold mb-4">旋转动画</h2>
      <div className="flex items-center gap-8">
        <div className="flex flex-col items-center">
          <Icons.IconLoading className="text-xl animate-spin" />
          <span className="text-xs mt-2">加载中</span>
        </div>
        <div className="flex flex-col items-center">
          <Icons.IconSettings className="text-xl animate-spin" />
          <span className="text-xs mt-2">设置中</span>
        </div>
      </div>
    </div>
  )
}
