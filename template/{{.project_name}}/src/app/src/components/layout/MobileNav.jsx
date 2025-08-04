import React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { DatabricksLogo } from '../DatabricksLogo'
import { 
  Menu,
  BarChart3, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Settings, 
  Database,
  Activity,
  PieChart,
  LineChart,
  Target,
  Search,
  X
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

export function MobileNav({ open, onOpenChange }) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden h-9 w-9 p-0"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0">
        <div className="flex h-full flex-col">
          {/* Header */}
          <SheetHeader className="border-b border-border p-6">
            <DatabricksLogo variant="full" size="md" />
            <SheetDescription className="text-left">
              Analytics Dashboard
            </SheetDescription>
          </SheetHeader>

          {/* Mobile Search */}
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search metrics..."
                className="w-full pl-10 pr-4 py-2 text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-auto p-4">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Button
                  key={item.name}
                  variant={item.current ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start min-h-touch",
                    item.current ? "bg-primary hover:bg-primary/90 text-primary-foreground" : ""
                  )}
                  onClick={() => onOpenChange(false)}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  <span className="flex-1 text-left">{item.name}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="ml-auto text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="space-y-2">
              <h3 className="text-xs font-medium text-muted-foreground px-3 mb-2">
                ADMINISTRATION
              </h3>
              {secondaryNavigation.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  className="w-full justify-start min-h-touch"
                  onClick={() => onOpenChange(false)}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  <span>{item.name}</span>
                </Button>
              ))}
            </div>
          </nav>

          {/* Status Footer */}
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
        </div>
      </SheetContent>
    </Sheet>
  )
}