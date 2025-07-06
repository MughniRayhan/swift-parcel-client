import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './Router/Router.jsx';
import { RouterProvider } from 'react-router';
import AuthProvider from './Contexts/AuthContext/AuthProvider.jsx';
import 'leaflet/dist/leaflet.css';
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'
 import { ToastContainer } from 'react-toastify';
 
const queryClient = new QueryClient

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='urbanist-font '>
       <ToastContainer />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      </QueryClientProvider>
    </div>
  </StrictMode>,
)
