import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import VarkalaPage from './VarkalaPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <VarkalaPage />
  </StrictMode>,
)
