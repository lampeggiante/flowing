import { Component, ReactInstance } from 'react'
import { isFunction, isReact18 } from './is'
import ReactDOM from 'react-dom'
import warning from './warning'

let warnedInstancesWeakSet: WeakSet<Function> | undefined
function hasInstanceWarned(instance: ReactInstance) {
  const ctor = instance.constructor
  if (typeof ctor !== 'function') return false
  if (!warnedInstancesWeakSet && typeof WeakSet === 'function') {
    warnedInstancesWeakSet = new WeakSet()
  }
  const hasWarned = !!warnedInstancesWeakSet?.has(ctor)
  warnedInstancesWeakSet?.add(ctor)
  return hasWarned
}

export const callbackOriginRef = (children: any, node: any) => {
  if (children && children.ref) {
    if (isFunction(children.ref)) {
      children?.ref(node)
    }
    if ('current' in children.ref) {
      children.ref.current = node
    }
  }
}

/**
 *
 * @param element
 * @param instance: 兜底 findDOMNode 查找，一般都是 this
 * @returns
 */
export const findDOMNode = (element: any, instance?: ReactInstance) => {
  // 类组件，非 forwardRef(function component) 都拿不到真实dom
  if (element && element instanceof Element) {
    return element
  }

  if (element && element.current && element.current instanceof Element) {
    return element.current
  }

  // react 19 findDOMNode已经被废弃，调用直接报错，所以优先读取 getRootDOMNode 方法
  if (element && isFunction(element.getRootDOMNode)) {
    return element.getRootDOMNode()
  }

  if (element instanceof Component) {
    if (ReactDOM.findDOMNode) {
      return ReactDOM.findDOMNode(element)
    }
  }

  // 一般 useImperativeHandle 的元素拿到的 ref 不是 dom 元素且不存在 getRootDOMNode ，会走到这里。
  if (instance) {
    warning(
      isReact18 && !hasInstanceWarned(instance),
      'Element does not define the `getRootDOMNode` method causing a call to React.findDOMNode. but findDOMNode is deprecated in StrictMode. Please check the code logic',
      { element, instance }
    )
    if (ReactDOM.findDOMNode) {
      return ReactDOM.findDOMNode(instance)
    }
  }

  return null
}
