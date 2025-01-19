import { processClassName } from '@flowing/lib'
import { ButtonProps } from './interface'

export enum ButtonType {
  primary = 'bg-rose-500 hover:bg-rose-600 active:bg-rose-700 border-0 shadow font-bold text-white',
  secondary = 'border-0 text-white',
  dashed = 'border-dashed border-gray-800 border text-white',
  outline = 'border border-gray-800 bg-transparent text-gray-800 hover:bg-gray-100 active:bg-gray-200 hover:text-white active:text-white',
  text = 'bg-transparent text-gray-800 border-0 hover:bg-transparent active:bg-transparent',
  default = ButtonType.secondary
}

export enum ButtonStatus {
  success = 'bg-green-500 hover:bg-green-600 active:bg-green-700',
  info = 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700',
  default = 'bg-gray-500 hover:bg-gray-600 active:bg-gray-700',
  warning = 'bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700',
  danger = 'bg-red-500 hover:bg-red-600 active:bg-red-700'
}

export enum ButtonSize {
  mini = 'px-2 py-1 text-xs',
  small = 'px-4 py-2 text-sm',
  default = 'px-6 py-3 text-base',
  large = 'px-8 py-4 text-lg'
}

export enum ButtonShape {
  square = 'rounded',
  round = 'rounded-full',
  circle = ButtonShape.round
}

export enum ButtonCircleSize {
  mini = 'w-12 h-12',
  small = 'w-16 h-16',
  default = 'w-20 h-20',
  large = 'w-24 h-24'
}

const defaultCls = [
  /** flex 盒布局 */
  'inline-flex',
  'items-center',
  'justify-center',
  'gap-2',
  'cursor-pointer'
]

export const getButtonClassNames = (
  params: Pick<
    ButtonProps,
    | 'type'
    | 'size'
    | 'shape'
    | 'long'
    | 'status'
    | 'loadingFixedWidth'
    | 'loading'
    | 'href'
    | 'iconOnly'
    | 'disabled'
  >
) => {
  const {
    type,
    status,
    size,
    shape,
    long,
    loadingFixedWidth,
    loading,
    disabled,
    href,
    iconOnly
  } = params

  const initCLs = processClassName([
    ...defaultCls,
    type ? ButtonType[type] : ButtonType['default'],
    status ? ButtonStatus[status] : ButtonStatus['default'],
    size ? ButtonSize[size] : ButtonSize['default'],
    shape ? ButtonShape[shape] : ButtonShape['square'],
    shape === 'circle' ? ButtonCircleSize[size || 'default'] : '',
    long ? 'w-full' : '',
    loading && loadingFixedWidth ? 'w-full' : '',
    href ? 'decoration-none' : '',
    iconOnly ? 'align-top' : ''
  ])

  if (loading || disabled) {
    const cursorPointer = initCLs.findIndex((item) => item === 'cursor-pointer')
    if (cursorPointer !== -1) {
      initCLs.splice(cursorPointer, 1)
    }
    while (true) {
      const hoverCls = initCLs.findIndex((item) => item.startsWith('hover:'))
      if (hoverCls !== -1) {
        initCLs.splice(hoverCls, 1)
        continue
      }
      break
    }
    while (true) {
      const activeCls = initCLs.findIndex((item) => item.startsWith('active:'))
      if (activeCls !== -1) {
        initCLs.splice(activeCls, 1)
        continue
      }
      break
    }
    initCLs.push('cursor-not-allowed')
    initCLs.push('opacity-50')
  }

  return initCLs.join(' ')
}
