import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'normalize.css'
import routes from './pages/routes.tsx'
import 'dayjs/locale/zh-cn'
import { info } from '@/utils/log.ts'

const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL
})
info('process.env.PUBLIC_URL', import.meta.env.BASE_URL)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
