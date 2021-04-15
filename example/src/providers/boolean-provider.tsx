import React from 'react'

const BooleanContext = React.createContext<boolean | undefined>(undefined)

export function BooleanProvider({
  initialValue,
  children
}: React.PropsWithChildren<{ initialValue: boolean }>) {
  return (
    <BooleanContext.Provider value={initialValue}>
      {children}
    </BooleanContext.Provider>
  )
}

export function useBoolean() {
  const context = React.useContext(BooleanContext)
  if (context !== undefined) return context
  throw new Error('useBoolean must be used within a BooleanProvider')
}
