export enum ButtonType {
  default = 'border-0',
  dashed = 'border-dashed border',
  outline = 'border bg-transparent',
  text = 'bg-transparent border-0'
}

export enum ButtonSize {
  mini = 'px-2 py-1 text-xs',
  small = 'px-4 py-2 text-sm',
  default = 'px-6 py-3 text-base',
  large = 'px-8 py-4 text-lg'
}

export enum ButtonShape {
  square = 'rounded-none',
  round = 'rounded-lg',
  circle = 'rounded-full'
}

export enum ButtonCircleSize {
  mini = 'w-6 h-6',
  small = 'w-8 h-8',
  default = 'w-10 h-10',
  large = 'w-12 h-12'
}

export const defaultCls = [
  /** flex 盒布局 */
  'inline-flex',
  'items-center',
  'justify-center',
  'gap-2',
  'transition-all'
]

export const BUTTON_COLORS = {
  default: {
    primary: [
      'bg-fuchsia-500',
      'hover:bg-fuchsia-600',
      'active:bg-fuchsia-700',
      'border-fuchsia-500',
      'hover:border-fuchsia-600',
      'active:border-fuchsia-700',
      'text-white'
    ],
    default: [
      'bg-slate-500',
      'hover:bg-slate-600',
      'active:bg-slate-700',
      'border-slate-500',
      'hover:border-slate-600',
      'active:border-slate-700',
      'text-white'
    ],
    info: [
      'bg-sky-500',
      'hover:bg-sky-600',
      'active:bg-sky-700',
      'border-sky-500',
      'hover:border-sky-600',
      'active:border-sky-700',
      'text-white'
    ],
    success: [
      'bg-emerald-500',
      'hover:bg-emerald-600',
      'active:bg-emerald-700',
      'border-emerald-500',
      'hover:border-emerald-600',
      'active:border-emerald-700',
      'text-white'
    ],
    warning: [
      'bg-yellow-500',
      'hover:bg-yellow-600',
      'active:bg-yellow-700',
      'border-yellow-500',
      'hover:border-yellow-600',
      'active:border-yellow-700',
      'text-white'
    ],
    danger: [
      'bg-red-500',
      'hover:bg-red-600',
      'active:bg-red-700',
      'border-red-500',
      'hover:border-red-600',
      'active:border-red-700',
      'text-white'
    ]
  },
  dashed: {
    primary: [
      'bg-fuchsia-500',
      'hover:bg-fuchsia-600',
      'active:bg-fuchsia-700',
      'border-white',
      'text-white'
    ],
    default: [
      'bg-slate-500',
      'hover:bg-slate-600',
      'active:bg-slate-700',
      'border-white',
      'text-white'
    ],
    info: [
      'bg-sky-500',
      'hover:bg-sky-600',
      'active:bg-sky-700',
      'border-white',
      'text-white'
    ],
    success: [
      'bg-emerald-500',
      'hover:bg-emerald-600',
      'active:bg-emerald-700',
      'border-white',
      'text-white'
    ],
    warning: [
      'bg-yellow-500',
      'hover:bg-yellow-600',
      'active:bg-yellow-700',
      'border-white',
      'text-white'
    ],
    danger: [
      'bg-red-500',
      'hover:bg-red-600',
      'active:bg-red-700',
      'border-white',
      'text-white'
    ]
  },
  outline: {
    primary: [
      'text-fuchsia-500',
      'hover:text-fuchsia-600',
      'active:text-fuchsia-700',
      'border-fuchsia-500',
      'hover:border-fuchsia-600',
      'active:border-fuchsia-700'
    ],
    default: [
      'text-slate-500',
      'hover:text-slate-600',
      'active:text-slate-700',
      'border-slate-500',
      'hover:border-slate-600',
      'active:border-slate-700'
    ],
    info: [
      'text-sky-500',
      'hover:text-sky-600',
      'active:text-sky-700',
      'border-sky-500',
      'hover:border-sky-600',
      'active:border-sky-700'
    ],
    success: [
      'text-emerald-500',
      'hover:text-emerald-600',
      'active:text-emerald-700',
      'border-emerald-500',
      'hover:border-emerald-600',
      'active:border-emerald-700'
    ],
    warning: [
      'text-yellow-500',
      'hover:text-yellow-600',
      'active:text-yellow-700',
      'border-yellow-500',
      'hover:border-yellow-600',
      'active:border-yellow-700'
    ],
    danger: [
      'text-red-500',
      'hover:text-red-600',
      'active:text-red-700',
      'border-red-500',
      'hover:border-red-600',
      'active:border-red-700'
    ]
  },
  text: {
    primary: [
      'text-fuchsia-500',
      'hover:text-fuchsia-600',
      'active:text-fuchsia-700'
    ],
    default: [
      'text-slate-500',
      'hover:text-slate-600',
      'active:text-slate-700'
    ],
    info: ['text-sky-500', 'hover:text-sky-600', 'active:text-sky-700'],
    success: [
      'text-emerald-500',
      'hover:text-emerald-600',
      'active:text-emerald-700'
    ],
    warning: [
      'text-yellow-500',
      'hover:text-yellow-600',
      'active:text-yellow-700'
    ],
    danger: ['text-red-500', 'hover:text-red-600', 'active:text-red-700']
  }
} as const
