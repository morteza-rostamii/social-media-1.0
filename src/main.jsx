import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import {BrowserRouter} from 'react-router-dom'

// firebase
import * as fire from './firebase/firedb'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider>
        <App />
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
