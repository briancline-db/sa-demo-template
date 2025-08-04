import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DatabricksLogo } from '../DatabricksLogo'
import { MobileNav } from './MobileNav'
import { 
  Menu, 
  Bell, 
  Search, 
  RefreshCw,
  Settings,
  User,
  LogOut,
  Monitor,
  Moon,
  Sun,
  Maximize2,
  Minimize2
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function Header({ 
  onToggleSidebar, 
  onRefreshData, 
  onToggleLayout,
  currentLayout = 'sidebar',
  className 
}) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  
  const layoutOptions = [
    { id: 'sidebar', label: 'Sidebar Layout', icon: Monitor },
    { id: 'full', label: 'Full Width', icon: Maximize2 },
    { id: 'compact', label: 'Compact View', icon: Minimize2 }
  ]

  return (
    <header className={cn(
      "flex items-center justify-between h-14 sm:h-16 px-4 sm:px-6 bg-white border-b border-border",
      className
    )}>
      <div className="flex items-center space-x-2 sm:space-x-4 flex-1">
        {/* Mobile Navigation */}
        <MobileNav open={mobileNavOpen} onOpenChange={setMobileNavOpen} />
        
        {/* Desktop Sidebar Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleSidebar}
          className="hidden lg:flex"
        >
          <Menu className="h-4 w-4" />
        </Button>

        <div className="flex items-center space-x-2 min-w-0 flex-1">
          <h2 className="text-lg sm:text-xl font-semibold text-databricks-navy truncate">
            Dashboard Overview
          </h2>
          <Badge variant="outline" className="text-xs hidden sm:inline-flex">
            Real-time
          </Badge>
        </div>
      </div>

      <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4">
        {/* Desktop Search */}
        <div className="hidden xl:flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Search metrics, reports..."
              className="pl-10 pr-4 py-2 text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-64"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          {/* Search Button (tablet) */}
          <Button
            variant="ghost"
            size="sm"
            className="xl:hidden h-9 w-9 p-0"
          >
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>

          {/* Layout Switcher - Hidden on mobile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="hidden sm:flex h-9 w-9 p-0">
                <Monitor className="h-4 w-4" />
                <span className="sr-only">Layout options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Layout Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {layoutOptions.map((layout) => (
                <DropdownMenuItem
                  key={layout.id}
                  onClick={() => onToggleLayout(layout.id)}
                  className={cn(
                    "flex items-center space-x-2",
                    currentLayout === layout.id && "bg-accent"
                  )}
                >
                  <layout.icon className="h-4 w-4" />
                  <span>{layout.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Refresh */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onRefreshData}
            className="hover:bg-accent h-9 w-9 p-0"
          >
            <RefreshCw className="h-4 w-4" />
            <span className="sr-only">Refresh data</span>
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative h-9 w-9 p-0">
            <Bell className="h-4 w-4" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-4 w-4 text-xs rounded-full p-0 flex items-center justify-center"
            >
              3
            </Badge>
            <span className="sr-only">Notifications</span>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative h-8 w-8 rounded-full bg-primary ml-2">
                <User className="h-4 w-4 text-primary-foreground" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">john@company.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {}}>
                <Sun className="mr-2 h-4 w-4" />
                Toggle Theme
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}