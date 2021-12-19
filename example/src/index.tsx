import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import FlatProviders from 'react-flat-providers'
import { NumberProvider } from './providers/number-provider'
import { BooleanProvider } from './providers/boolean-provider'
import { StringContext } from './providers/string-provider'

ReactDOM.render(
  <React.StrictMode>
    <FlatProviders
      providers={[
        NumberProvider,
        [BooleanProvider, { initialValue: true }],
        [StringContext.Provider, { value: 'Hello world!' }]
      ]}
    >
      <App />
    </FlatProviders>
  </React.StrictMode>,
  document.getElementById('root')
)
