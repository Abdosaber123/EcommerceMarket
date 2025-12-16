import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
import UserProvider from './Component/context/UserProvider.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
    <Toaster />
    <App />
   </UserProvider>
  </StrictMode>,
)
