import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Pathfinder from './components/ui/layouts/Layout3.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Pathfinder children={null}/>
  </StrictMode>,
)
