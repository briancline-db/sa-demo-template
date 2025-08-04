import React, { createContext, useContext, useState } from 'react'

const LayoutContext = createContext()

export function useLayout() {
  const context = useContext(LayoutContext)
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider')
  }
  return context
}

export function LayoutContextProvider({ children }) {
  const [currentLayout, setCurrentLayout] = useState('sidebar')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <LayoutContext.Provider 
      value={{
        currentLayout,
        setCurrentLayout,
        sidebarCollapsed,
        setSidebarCollapsed
      }}
    >
      {children}
    </LayoutContext.Provider>
  )
}