import { cs } from '@flowing/lib'
import { InputProps } from './interface'

const defaultCls = [
  'inline-flex',
  'items-center',
  'w-full',
  'relative',
  'transition-all',
  'border',
  'rounded-md',
  'bg-white',
  'flex-nowrap'
]

const InputSize = {
  small: ['h-8', 'text-sm'],
  medium: ['h-10', 'text-base'],
  large: ['h-12', 'text-lg'],
  default: ['h-10', 'text-base']
}

const InputStatus = {
  default: [
    'border-slate-200',
    'hover:border-blue-400',
    'focus-within:border-blue-500',
    'focus-within:ring-1',
    'focus-within:ring-blue-500'
  ],
  error: [
    'border-red-300',
    'hover:border-red-400',
    'focus-within:border-red-500',
    'focus-within:ring-1',
    'focus-within:ring-red-500'
  ],
  warning: [
    'border-yellow-300',
    'hover:border-yellow-400',
    'focus-within:border-yellow-500',
    'focus-within:ring-1',
    'focus-within:ring-yellow-500'
  ]
}

const DisabledCls = [
  'bg-slate-50',
  'cursor-not-allowed',
  'hover:border-slate-200',
  'focus-within:border-slate-200',
  'focus-within:ring-0'
]

const ReadOnlyCls = [
  'bg-slate-50',
  'hover:border-slate-200',
  'focus-within:border-slate-200',
  'focus-within:ring-0'
]

export const getInputClassNames = (
  params: Pick<InputProps, 'size' | 'disabled' | 'status' | 'readOnly'>
) => {
  const {
    size = 'medium',
    disabled = false,
    readOnly = false,
    status = 'default'
  } = params

  let classnames = cs([
    ...defaultCls,
    ...InputSize[size],
    ...InputStatus[status]
  ])

  if (disabled) {
    classnames = classnames.filter((item) => !item.includes('hover:'))
    classnames = classnames.filter((item) => !item.includes('focus-within:'))
    classnames.push(...DisabledCls)
  }

  if (readOnly) {
    classnames = classnames.filter((item) => !item.includes('hover:'))
    classnames = classnames.filter((item) => !item.includes('focus-within:'))
    classnames.push(...ReadOnlyCls)
  }

  return classnames.join(' ')
}

export const getInputElementClassNames = () => {
  return cs([
    'w-full',
    'h-full',
    'px-3',
    'bg-transparent',
    'outline-none',
    'disabled:cursor-not-allowed',
    'placeholder:text-slate-400'
  ]).join(' ')
}

export const getAddonClassNames = () => {
  return cs([
    'flex',
    'items-center',
    'px-3',
    'bg-slate-50',
    'border-slate-200',
    'h-full',
    'flex-shrink-0'
  ]).join(' ')
}

export const getAffixClassNames = () => {
  return cs([
    'flex',
    'items-center',
    'justify-center',
    'px-3',
    'text-slate-400',
    'flex-shrink-0'
  ]).join(' ')
}
