import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Mycontext } from './context/Mycontext.jsx'

createRoot(document.getElementById('root')).render(


  <Mycontext>
    <App />
  </Mycontext>
)
