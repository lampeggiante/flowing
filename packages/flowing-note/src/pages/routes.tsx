import App from '@/App'
import ErrorPage from './error-page'
import NoteBody from './note-body'

export const baseUrl = '/flowing'
function getPath(path: string) {
  return `${baseUrl}${path}`
}

export default [
  {
    path: getPath('/'),
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: getPath('/wiki'),
        element: <NoteBody />
      }
    ]
  }
]
