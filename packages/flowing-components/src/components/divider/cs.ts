import { cs } from '@flowing/lib'
import { DividerProps } from './interface'

const defaultCls = ['relative', 'border-0', 'transition-all']

const DividerType = {
  horizontal: [
    'block',
    'clear-both',
    'w-full',
    'min-w-full',
    'h-[1px]',
    'my-4',
    'bg-slate-200'
  ],
  vertical: [
    'inline-block',
    'h-[0.9em]',
    'w-[1px]',
    'align-middle',
    'mx-2',
    'bg-slate-200'
  ]
}

const ContentPosition = {
  left: ['before:w-[5%]', 'after:w-[95%]'],
  center: ['before:w-[50%]', 'after:w-[50%]'],
  right: ['before:w-[95%]', 'after:w-[5%]']
}

const WithChildrenCls = [
  'flex',
  'items-center',
  'border-0',
  'border-slate-200',
  'before:content-[""]',
  'before:block',
  'before:relative',
  'before:h-[1px]',
  'before:bg-slate-200',
  'after:content-[""]',
  'after:block',
  'after:relative',
  'after:h-[1px]',
  'after:bg-slate-200'
]

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
    ...(hasChildren ? WithChildrenCls : []),
    ...(hasChildren && contentPosition ? ContentPosition[contentPosition] : [])
  ])

  return classnames.join(' ')
}
