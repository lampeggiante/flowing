import { useEffect, useMemo, useRef, useState } from 'react'
import usePrevious from './use-previous'

export interface IUseMergeValue<T> {
  defaultStateValue: T
  defaultValue?: T
  value?: T
}

const useMergeValue = <T>(params: IUseMergeValue<T>) => {
  const { defaultStateValue, defaultValue, value } = params
  const firstRenderRef = useRef(true)
  const prevPropsValue = usePrevious(value)

  const [innerValue, setInnerValue] = useState<T>(
    value ?? defaultValue ?? defaultStateValue
  )

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false
      return
    }
    if (value !== undefined && prevPropsValue !== value) {
      setInnerValue(value)
    }
  }, [value])

  const mergedValue = useMemo(() => value ?? innerValue, [value, innerValue])

  return {
    mergedValue,
    setValue: setInnerValue,
    stateValue: innerValue
  }
}

export default useMergeValue
