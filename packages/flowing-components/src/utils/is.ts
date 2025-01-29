import ReactDOM from 'react-dom'

export const isFunction = (value: any) => typeof value === 'function'
export const isReact18 = Number(ReactDOM.version?.split('.')[0]) > 17
