import React from 'react'

export const StringContext = React.createContext<string | undefined>(undefined)

export function useString() {
  const context = React.useContext(StringContext)
  if (context !== undefined) return context
  throw new Error('useString must be used within a StringContext.Provider')
}
