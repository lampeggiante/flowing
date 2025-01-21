import { cs } from '@flowing/lib'
import { DividerProps } from './interface'

const defaultCls = ['text-slate-200']

const DividerType = {
  horizontal: [
    'relative',
    'w-full',
    'min-w-full',
    'max-w-full',
    'my-[20px]',
    'mx-0',
    'border-b-[1px]',
    'clear-both'
  ],
  vertical: [
    'inline-block',
    'min-w-[1px]',
    'max-w-[1px]',
    'h-[1em]',
    'align-middle',
    'mx-[12px]',
    'border-l-[1px]'
  ]
}

const WithChildrenCls = [
  'mx-[20px]',
  'flex',
  'items-center',
  'border-b-0',
  'border-solid',
  'before:content-[""]',
  'before:h-0',
  'before:flex-1',
  'before:border-b-[1px]',
  'before:border-b-inherit',
  'after:content-[""]',
  'after:h-0',
  'after:flex-1',
  'after:border-b-[1px]',
  'after:border-b-inherit'
]

const ContentPosition = {
  center: [],
  left: ['after:basis-[80%]', 'flex-grow-0'],
  right: ['before:basis-[80%]', 'flex-grow-0']
}

export const TextCls = ['box-border', 'px-[16px]', 'text-sm', 'text-slate-500']

export const getDividerClassNames = (
  params: Pick<DividerProps, 'type' | 'contentPosition'> & {
    hasChildren: boolean
  }
) => {
  const {
    type = 'horizontal',
    contentPosition = 'center',
    hasChildren
  } = params

  const classnames = cs([
    ...defaultCls,
    ...(type === 'horizontal' && !hasChildren ? DividerType.horizontal : []),
    ...(type === 'vertical' ? DividerType.vertical : []),
    ...(hasChildren && contentPosition ? ContentPosition[contentPosition] : []),
    ...(hasChildren ? WithChildrenCls : [])
  ])

  return {
    DividerCls: classnames.join(' '),
    textCls: hasChildren ? TextCls.join(' ') : ''
  }
}
