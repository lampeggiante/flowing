import { cs } from '@flowing/lib'
import { LinkProps } from './interface'

const defaultCls = ['inline-flex', 'items-center', 'gap-1', 'transition-all']

const LinkStatus: Record<string, string[]> = {
  default: [
    'text-blue-600',
    'hover:text-blue-500',
    'active:text-blue-700',
    'decoration-blue-600/50',
    'hover:decoration-blue-500/50'
  ],
  error: [
    'text-red-600',
    'hover:text-red-500',
    'active:text-red-700',
    'decoration-red-600/50',
    'hover:decoration-red-500/50'
  ],
  warning: [
    'text-yellow-600',
    'hover:text-yellow-500',
    'active:text-yellow-700',
    'decoration-yellow-600/50',
    'hover:decoration-yellow-500/50'
  ],
  success: [
    'text-green-600',
    'hover:text-green-500',
    'active:text-green-700',
    'decoration-green-600/50',
    'hover:decoration-green-500/50'
  ]
}

export const getLinkClassNames = (
  params: Pick<LinkProps, 'status' | 'disabled' | 'href'>
) => {
  const { status = 'default', disabled = false, href } = params

  let classnames = cs([
    ...defaultCls,
    ...(LinkStatus[status] || LinkStatus.default),
    'hover:underline',
    href && !disabled ? 'cursor-pointer' : 'cursor-default'
  ])

  if (disabled) {
    classnames.push('cursor-not-allowed')
    classnames.push('opacity-50')
    classnames = classnames.filter((item) => !item.includes('hover:'))
    classnames = classnames.filter((item) => !item.includes('active:'))
  }

  return classnames.join(' ')
}
