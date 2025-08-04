import React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { DatabricksLogo } from '../DatabricksLogo'
import { 
  BarChart3, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Settings, 
  Database,
  Activity,
  PieChart,
  LineChart,
  Target
} from 'lucide-react'

const navigation = [
  {
    name: 'Overview',
    href: '#overview',
    icon: BarChart3,
    current: true,
    badge: null
  },
  {
    name: 'Analytics',
    href: '#analytics', 
    icon: LineChart,
    current: false,
    badge: null
  },
  {
    name: 'Customers',
    href: '#customers',
    icon: Users,
    current: false,
    badge: '15.2K'
  },
  {
    name: 'Revenue',
    href: '#revenue',
    icon: DollarSign,
    current: false,
    badge: null
  },
  {
    name: 'Performance',
    href: '#performance',
    icon: Target,
    current: false,
    badge: null
  },
  {
    name: 'Reports',
    href: '#reports',
    icon: PieChart,
    current: false,
    badge: '3'
  }
]

const secondaryNavigation = [
  { name: 'Data Sources', href: '#data-sources', icon: Database },
  { name: 'Settings', href: '#settings', icon: Settings }
]

export function Sidebar({ isCollapsed = false, className }) {
  return (
    <div className={cn(
      "flex flex-col h-full bg-white border-r border-border",
      isCollapsed ? "w-16" : "w-64",
      className
    )}>
      {/* Logo */}
      <div className="flex items-center justify-center h-16 px-4 border-b border-border">
        {isCollapsed ? (
          <DatabricksLogo variant="icon" size="md" />
        ) : (
          <DatabricksLogo variant="full" size="md" />
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <div className="space-y-1">
          {navigation.map((item) => (
            <Button
              key={item.name}
              variant={item.current ? "default" : "ghost"}
              className={cn(
                "w-full justify-start",
                isCollapsed ? "px-2" : "px-3",
                item.current ? "bg-primary hover:bg-primary/90 text-primary-foreground" : ""
              )}
            >
              <item.icon className={cn("h-4 w-4", !isCollapsed && "mr-3")} />
              {!isCollapsed && (
                <>
                  <span className="flex-1 text-left">{item.name}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="ml-auto text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </Button>
          ))}
        </div>

        <Separator className="my-4" />

        <div className="space-y-1">
          {!isCollapsed && (
            <h3 className="text-xs font-medium text-muted-foreground px-3 mb-2">
              ADMINISTRATION
            </h3>
          )}
          {secondaryNavigation.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              className={cn(
                "w-full justify-start",
                isCollapsed ? "px-2" : "px-3"
              )}
            >
              <item.icon className={cn("h-4 w-4", !isCollapsed && "mr-3")} />
              {!isCollapsed && <span>{item.name}</span>}
            </Button>
          ))}
        </div>
      </nav>

      {/* Status */}
      {!isCollapsed && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-databricks-emerald rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground">Live Data</span>
            </div>
            <Badge variant="outline" className="text-xs">
              <Activity className="h-3 w-3 mr-1" />
              Active
            </Badge>
          </div>
        </div>
      )}
    </div>
  )
}