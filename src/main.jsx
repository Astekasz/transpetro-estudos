import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import PasswordRecovery from './PasswordRecovery'
import TranscriptLibrary from './TranscriptLibrary'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <PasswordRecovery />
    <TranscriptLibrary />
  </React.StrictMode>,
)
