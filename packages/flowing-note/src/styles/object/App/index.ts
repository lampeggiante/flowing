import { RCSS } from '..'
import { defaultColor } from '..'
import { defaultBorderSize } from '..'

export const containerStyle: RCSS = {
  display: 'flex',
  flexDirection: 'row',
  height: '100vh'
}

export const asideStyle: RCSS = {
  position: 'relative',
  width: '400px',
  minWidth: '200px',
  maxWidth: '50vw',
  height: '100%',
  backgroundColor: defaultColor.secondaryColor,
  borderRight: defaultBorderSize.medium + ' solid ' + defaultColor.borderColor
}

export const mainStyle: RCSS = {
  flex: 'auto',
  display: 'flex',
  flexDirection: 'column'
}

export const headerStyle: RCSS = {
  height: '60px',
  backgroundColor: defaultColor.primaryColor,
  borderBottom: defaultBorderSize.medium + ' solid ' + defaultColor.borderColor
}

export const contentStyle: RCSS = {
  flex: 14,
  backgroundColor: defaultColor.primaryColor
}
