import App from '@/App'
import ErrorPage from './error-page'
import NoteBody from './note-body'

export const baseUrl = '/flowing'

export default [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/wiki',
        element: <NoteBody />
      }
    ]
  }
]
