"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/hooks/use-toast"
import { LayoutDashboard, BarChart3, Users, FileText, Settings, HelpCircle, LogOut, Menu, X, Home } from "lucide-react"

export function DashboardNav() {
  const router = useRouter()
  const { toast } = useToast()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const handleSignOut = () => {
    // Clear user data from localStorage
    localStorage.removeItem("nexus_user")

    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    })

    router.push("/")
  }

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: BarChart3, label: "Analytics", href: "#" },
    { icon: Users, label: "Team", href: "#" },
    { icon: FileText, label: "Documents", href: "#" },
    { icon: Settings, label: "Settings", href: "#" },
    { icon: HelpCircle, label: "Help", href: "#" },
  ]

  return (
    <>
      {/* Mobile Nav Toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Mobile Nav Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{
          x: 0,
          opacity: 1,
          width: isCollapsed ? 80 : 280,
          left: isMobileOpen ? 0 : -280,
        }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 bottom-0 left-0 z-40 border-r border-border/50 bg-card/50 backdrop-blur-md md:left-0 ${
          isCollapsed ? "md:w-20" : "md:w-70"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between px-4">
            <Link href="/" className={`flex items-center ${isCollapsed ? "justify-center" : ""}`}>
              {isCollapsed ? (
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-bold">N</span>
                </div>
              ) : (
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                  NEXUS
                </span>
              )}
            </Link>

            <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)} className="hidden md:flex">
              <Menu className="h-5 w-5" />
            </Button>
          </div>

          <ScrollArea className="flex-1 px-3 py-4">
            <nav className="flex flex-col gap-1">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={`flex items-center rounded-md px-3 py-2 text-foreground/70 hover:bg-primary/10 hover:text-primary transition-colors ${
                    index === 0 ? "bg-primary/10 text-primary" : ""
                  } ${isCollapsed ? "justify-center" : ""}`}
                >
                  <item.icon className={`h-5 w-5 ${isCollapsed ? "" : "mr-3"}`} />
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              ))}
            </nav>
          </ScrollArea>

          <div className="border-t border-border/50 p-3">
            <div className="flex flex-col gap-1">
              <Link
                href="/"
                className={`flex items-center rounded-md px-3 py-2 text-foreground/70 hover:bg-primary/10 hover:text-primary transition-colors ${
                  isCollapsed ? "justify-center" : ""
                }`}
              >
                <Home className={`h-5 w-5 ${isCollapsed ? "" : "mr-3"}`} />
                {!isCollapsed && <span>Home</span>}
              </Link>

              <button
                onClick={handleSignOut}
                className={`flex items-center rounded-md px-3 py-2 text-foreground/70 hover:bg-destructive/10 hover:text-destructive transition-colors ${
                  isCollapsed ? "justify-center" : ""
                }`}
              >
                <LogOut className={`h-5 w-5 ${isCollapsed ? "" : "mr-3"}`} />
                {!isCollapsed && <span>Sign Out</span>}
              </button>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  )
}

