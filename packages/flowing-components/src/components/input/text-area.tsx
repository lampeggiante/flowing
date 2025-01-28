import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect
} from 'react'
import classNames from 'classnames'
import { IconClose } from '@flowing/icons'
import { TextAreaProps, RefTextAreaType } from './interface'
import useMergeValue from '../../hooks/use-merge-value'
import {
  getTextAreaWrapperClassNames,
  getTextAreaElementClassNames,
  getAffixClassNames
} from './cs'

const TextArea = (props: TextAreaProps, ref: any) => {
  const {
    className,
    style,
    wrapperClassName,
    wrapperStyle,
    placeholder,
    value,
    defaultValue,
    status = 'default',
    maxLength,
    showWordLimit,
    allowClear,
    disabled,
    readOnly,
    onChange,
    onPressEnter,
    onFocus,
    onBlur,
    onClear,
    size = 'default',
    rows,
    cols,
    autoSize,
    ...rest
  } = props

  const innerRef = useRef<HTMLTextAreaElement>(null)
  const textareaRef = ref || innerRef
  const isComposing = useRef(false)

  const { mergedValue, setValue } = useMergeValue({
    defaultValue: defaultValue,
    value: value,
    defaultStateValue: ''
  })

  const handleCompositionStart = () => {
    isComposing.current = true
  }

  const handleCompositionEnd = (
    e: React.CompositionEvent<HTMLTextAreaElement>
  ) => {
    isComposing.current = false
    handleChange(e as any)
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setValue(newValue)
    // 只在非输入法编辑状态下触发 onChange
    if (!isComposing.current) {
      onChange?.(e)
    }
  }

  // 添加键盘事件处理函数
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // 在输入法编辑状态下不触发
    if (isComposing.current) return

    if (e.key === 'Enter' && !e.shiftKey && onPressEnter) {
      onPressEnter(e)
    }
  }

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    if (!disabled && !readOnly) {
      onFocus?.(e)
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    if (!disabled && !readOnly) {
      onBlur?.(e)
    }
  }

  const handleClear = () => {
    setValue('')
    if (onChange) {
      // 创建一个合成事件
      const syntheticEvent = {
        target: { value: '' },
        currentTarget: { value: '' }
      } as React.ChangeEvent<HTMLTextAreaElement>
      onChange(syntheticEvent)
    }
    onClear?.()
    // 清空后聚焦
    textareaRef.current?.focus()
  }

  useImperativeHandle(ref, () => ({
    dom: textareaRef.current,
    focus: () => textareaRef.current?.focus?.(),
    blur: () => textareaRef.current?.blur?.()
  }))

  const wrapperClasses = classNames(
    getTextAreaWrapperClassNames({ size, disabled, status, readOnly }),
    wrapperClassName
  )

  const textareaClasses = classNames(getTextAreaElementClassNames(), className)

  // 计算并设置文本框高度
  const resizeTextArea = () => {
    const textarea = textareaRef.current
    if (!textarea || !autoSize) return

    // 保存原始高度
    const savedHeight = textarea.style.height
    textarea.style.height = 'auto'

    let height = textarea.scrollHeight
    const { minRows, maxRows } =
      typeof autoSize === 'object'
        ? autoSize
        : { minRows: 1, maxRows: Infinity }

    if (minRows || maxRows) {
      const lineHeight = parseInt(getComputedStyle(textarea).lineHeight)
      const paddingTop = parseInt(getComputedStyle(textarea).paddingTop)
      const paddingBottom = parseInt(getComputedStyle(textarea).paddingBottom)
      const minHeight = (minRows || 1) * lineHeight + paddingTop + paddingBottom
      const maxHeight = maxRows
        ? maxRows * lineHeight + paddingTop + paddingBottom
        : Infinity

      height = Math.max(minHeight, Math.min(height, maxHeight))
    }

    textarea.style.height = `${height}px`

    // 如果计算失败，恢复原始高度
    if (textarea.style.height === 'auto') {
      textarea.style.height = savedHeight
    }
  }

  // 监听值变化，调整高度
  useEffect(() => {
    resizeTextArea()
  }, [mergedValue])

  // 监听窗口大小变化，重新调整高度
  useEffect(() => {
    if (!autoSize) return

    const handleResize = () => {
      resizeTextArea()
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [autoSize])

  // 计算 textarea 的样式
  const textareaStyle = {
    ...style,
    // 当设置了 rows 或 autoSize 时，覆盖默认的 min-height
    ...((rows || autoSize) && {
      minHeight: 'unset',
      height: autoSize ? 'auto' : undefined
    })
  }

  const clearIcon = allowClear && mergedValue && !disabled && !readOnly && (
    <span
      className={classNames(
        getAffixClassNames(),
        'absolute right-2 bottom-2 cursor-pointer hover:text-slate-600'
      )}
      onClick={handleClear}
    >
      <IconClose />
    </span>
  )

  return (
    <div className={wrapperClasses} style={wrapperStyle}>
      <textarea
        className={textareaClasses}
        style={textareaStyle}
        ref={textareaRef}
        placeholder={placeholder}
        maxLength={maxLength}
        value={mergedValue}
        onChange={handleChange}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
        readOnly={readOnly}
        rows={rows}
        cols={cols}
        {...rest}
      />
      {clearIcon}
      {showWordLimit && maxLength && (
        <div className="px-3 py-1 text-sm text-slate-400 text-right">
          {`${mergedValue?.length || 0}/${maxLength}`}
        </div>
      )}
    </div>
  )
}

const TextAreaRef = forwardRef<RefTextAreaType, TextAreaProps>(TextArea)

TextAreaRef.displayName = 'FlowingTextArea'

export default TextAreaRef
