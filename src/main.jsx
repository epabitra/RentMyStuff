import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

// Basename so React Router works on GitHub Pages (e.g. /rentmystuff). At localhost root, pathname is '/' so basename is undefined.
function getBasename() {
  const path = typeof window !== 'undefined' ? window.location.pathname : ''
  if (!path || path === '/') return undefined
  return path.endsWith('/') ? path.slice(0, -1) : path
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={getBasename()}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
