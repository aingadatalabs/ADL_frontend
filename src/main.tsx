import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './footer.css'
import App from './App'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Fatal Error: Failed to find root element #root in document.')
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)