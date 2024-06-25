import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { I18nextProvider } from 'react-i18next'

import './index.css'

import App from './App'
import i18n from './locale'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <Toaster position='top-center' />
      <App />
    </I18nextProvider>
  </React.StrictMode>
)
