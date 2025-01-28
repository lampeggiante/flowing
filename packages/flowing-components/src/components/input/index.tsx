import React, {
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from 'react'
import { IconClose } from '@flowing/icons'
import classNames from 'classnames'
import { InputProps, RefInputType } from './interface'
import {
  getInputClassNames,
  getInputElementClassNames,
  getAddonClassNames,
  getAffixClassNames
} from './cs'
import TextArea from './text-area'
const Input = (props: InputProps, ref: any) => {
  const {
    className,
    style,
    beforeStyle,
    afterStyle,
    beforeClassName,
    afterClassName,
    prefixStyle,
    suffixStyle,
    prefixClassName,
    suffixClassName,
    value,
    allowClear,
    disabled,
    readOnly,
    defaultValue,
    placeholder,
    status = 'default',
    addBefore,
    addAfter,
    prefix,
    suffix,
    size = 'default',
    maxLength,
    showWordLimit,
    onChange,
    onClear,
    onPressEnter,
    onFocus,
    onBlur,
    ...rest
  } = props

  const [innerValue, setInnerValue] = useState(defaultValue)
  const isComposing = useRef(false)
  const innerRef = useRef(null)
  const inputRef = ref ?? innerRef
  const controlled = value !== undefined

  const handleCompositionStart = () => {
    isComposing.current = true
  }

  const handleCompositionEnd = (
    e: React.CompositionEvent<HTMLInputElement>
  ) => {
    isComposing.current = false
    // 在输入法结束后触发 onChange
    handleChange(e as any)
  }

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!disabled && !readOnly) {
        const newValue = e.target.value
        setInnerValue(newValue)
        // 只在非输入法编辑状态下触发 onChange
        if (!isComposing.current) {
          onChange?.(newValue)
        }
      }
    },
    [disabled, readOnly, controlled, onChange, setInnerValue, isComposing]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (isComposing.current) return
      if (e.key === 'Enter') {
        onPressEnter?.(e)
      }
    },
    [onPressEnter]
  )

  const handleClear = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.value = ''
    }
    controlled ? onChange?.('') : setInnerValue('')
    onClear?.()
  }, [controlled, onChange, setInnerValue, onClear])

  useImperativeHandle(ref, () => ({
    dom: inputRef?.current,
    focus: () => {
      inputRef?.current?.focus()
    },
    blur: () => {
      inputRef?.current?.blur()
    }
  }))

  const wrapperClasses = useMemo(
    () =>
      classNames(
        getInputClassNames({ size, disabled, status, readOnly }),
        className
      ),
    [size, disabled, status, readOnly, className]
  )

  const inputClasses = useMemo(() => getInputElementClassNames(), [])
  const addonClasses = useMemo(() => getAddonClassNames(), [])
  const affixClasses = useMemo(() => getAffixClassNames(), [])

  const beforeEle = useMemo(
    () =>
      addBefore && (
        <div
          style={beforeStyle}
          className={classNames(
            addonClasses,
            'border-r',
            'rounded-tl-md',
            'rounded-bl-md',
            beforeClassName
          )}
        >
          {addBefore}
        </div>
      ),
    [addBefore, beforeStyle, beforeClassName]
  )

  const afterEle = useMemo(
    () =>
      addAfter && (
        <div
          style={afterStyle}
          className={classNames(
            addonClasses,
            'border-l',
            'rounded-tr-md',
            'rounded-br-md',
            afterClassName
          )}
        >
          {addAfter}
        </div>
      ),
    [addAfter, afterStyle, afterClassName]
  )

  const prefixEle = useMemo(
    () =>
      prefix && (
        <span
          style={prefixStyle}
          className={classNames(affixClasses, prefixClassName)}
        >
          {prefix}
        </span>
      ),
    [prefix, prefixStyle, prefixClassName]
  )

  const suffixEle = useMemo(
    () =>
      suffix && (
        <span
          style={suffixStyle}
          className={classNames(affixClasses, suffixClassName)}
        >
          {suffix}
        </span>
      ),
    [suffix, suffixStyle, suffixClassName]
  )

  const clearIcon = useMemo(
    () =>
      allowClear &&
      (controlled ? value : innerValue) &&
      !disabled &&
      !readOnly && (
        <span
          className={classNames(
            affixClasses,
            'cursor-pointer hover:text-slate-600'
          )}
          onClick={handleClear}
        >
          <IconClose />
        </span>
      ),
    [allowClear, controlled, innerValue, value, disabled, readOnly]
  )

  const wordLimit = useMemo(
    () =>
      showWordLimit &&
      maxLength && (
        <span className={classNames(affixClasses, 'text-slate-400 text-sm')}>
          {`${value?.length || 0}/${maxLength}`}
        </span>
      ),
    [showWordLimit, maxLength, value]
  )

  return (
    <div className={wrapperClasses} style={style}>
      {beforeEle}
      {prefixEle}
      <input
        ref={inputRef}
        value={controlled ? value : innerValue}
        defaultValue={defaultValue}
        disabled={disabled}
        readOnly={readOnly}
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={handleChange}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        onKeyDown={handleKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        className={inputClasses}
        {...rest}
      />
      {suffixEle}
      {clearIcon}
      {wordLimit}
      {afterEle}
    </div>
  )
}

type InputRefType = ForwardRefExoticComponent<
  InputProps & RefAttributes<RefInputType>
> & {
  TextArea: typeof TextArea
  // Password: typeof Password
  // Group: typeof Group
}

const ForwardedInput = forwardRef<HTMLInputElement, InputProps>(
  Input
) as InputRefType

ForwardedInput.displayName = 'FlowingInput'

ForwardedInput.TextArea = TextArea

export default ForwardedInput

export type { InputProps }
