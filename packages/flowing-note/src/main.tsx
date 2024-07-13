import React from 'react'
import ReactDOM from 'react-dom/client'
import 'normalize.css'
import './styles/object/constants' // 提前注入变量，防止变量提升问题
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
