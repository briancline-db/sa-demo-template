import React from 'react'
import { cn } from '@/lib/utils'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { DatabricksLogo } from '../DatabricksLogo'
import { useLayout, LayoutContextProvider } from '../../contexts/LayoutContext'

// Sidebar Layout (Default)
function SidebarLayoutContent({ children, onRefreshData }) {
  const { sidebarCollapsed, setSidebarCollapsed, currentLayout, setCurrentLayout } = useLayout()

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isCollapsed={sidebarCollapsed} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          onRefreshData={onRefreshData}
          onToggleLayout={setCurrentLayout}
          currentLayout={currentLayout}
        />
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

// Full Width Layout
function FullWidthLayoutContent({ children, onRefreshData }) {
  const { currentLayout, setCurrentLayout } = useLayout()

  return (
    <div className="min-h-screen bg-background">
      <Header
        onRefreshData={onRefreshData}
        onToggleLayout={setCurrentLayout}
        currentLayout={currentLayout}
        className="fixed top-0 left-0 right-0 z-10"
      />
      <main className="pt-14 sm:pt-16 p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  )
}

// Compact Layout
function CompactLayoutContent({ children, onRefreshData }) {
  const { currentLayout, setCurrentLayout } = useLayout()

  return (
    <div className="min-h-screen bg-background">
      {/* Compact Header */}
      <div className="bg-white border-b border-border p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <DatabricksLogo variant="simple" size="sm" />
          <Header
            onRefreshData={onRefreshData}
            onToggleLayout={setCurrentLayout}
            currentLayout={currentLayout}
            className="border-0 p-0 h-auto bg-transparent"
          />
        </div>
      </div>
      
      <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  )
}

// Layout Provider Component
function LayoutProviderContent({ children, onRefreshData }) {
  const { currentLayout } = useLayout()
  
  const layouts = {
    sidebar: SidebarLayoutContent,
    full: FullWidthLayoutContent,
    compact: CompactLayoutContent
  }

  const LayoutComponent = layouts[currentLayout] || SidebarLayoutContent

  return (
    <LayoutComponent onRefreshData={onRefreshData}>
      {children}
    </LayoutComponent>
  )
}

export function LayoutProvider({ children, onRefreshData }) {
  return (
    <LayoutContextProvider>
      <LayoutProviderContent onRefreshData={onRefreshData}>
        {children}
      </LayoutProviderContent>
    </LayoutContextProvider>
  )
}