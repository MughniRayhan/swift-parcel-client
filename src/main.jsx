import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './Router/Router.jsx';
import { RouterProvider } from 'react-router';




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='urbanist-font '>
      <RouterProvider router={router} />
    </div>
  </StrictMode>,
)
