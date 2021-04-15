import React from 'react'
import { useString } from './providers/string-provider'
import { useNumber } from './providers/number-provider'
import { useBoolean } from './providers/boolean-provider'

function App() {
  const number = useNumber()
  const boolean = useBoolean()
  const string = useString()
  return <h3>{JSON.stringify({ number, boolean, string })}</h3>
}

export default App
