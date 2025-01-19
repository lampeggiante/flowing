import { cs } from '@flowing/lib'
import { ButtonProps } from './interface'
import {
  BUTTON_COLORS,
  ButtonCircleSize,
  ButtonShape,
  ButtonSize,
  ButtonType,
  defaultCls
} from './constants'

export const getButtonClassNames = (
  params: Pick<
    ButtonProps,
    | 'type'
    | 'size'
    | 'shape'
    | 'long'
    | 'theme'
    | 'loading'
    | 'href'
    | 'pureCircle'
    | 'disabled'
  >
) => {
  const {
    type = 'default',
    theme = 'default',
    size = 'default',
    shape = 'square',
    long = false,
    loading = false,
    disabled = false,
    href = '',
    pureCircle = false
  } = params

  let buttonShapeEnum: Record<string, string> = ButtonSize
  if (pureCircle) {
    buttonShapeEnum = ButtonCircleSize
  }

  let classnames = cs([
    ...defaultCls,
    ...BUTTON_COLORS[type][theme],
    type ? ButtonType[type] : ButtonType['default'],
    size ? buttonShapeEnum[size] : buttonShapeEnum['default'],
    shape ? ButtonShape[shape] : ButtonShape['square'],
    long ? 'w-full' : '',
    href ? 'decoration-none' : ''
  ])

  if (loading || disabled) {
    classnames.push('cursor-not-allowed')
    classnames.push('opacity-50')
    classnames = classnames.filter((item) => !item.includes('hover:'))
    classnames = classnames.filter((item) => !item.includes('active:'))
  } else {
    classnames.push('cursor-pointer')
  }

  return classnames.join(' ')
}
