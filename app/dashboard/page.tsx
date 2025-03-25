"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { DashboardNav } from "@/components/dashboard-nav"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardStats } from "@/components/dashboard-stats"
import { DashboardActivity } from "@/components/dashboard-activity"
import { DashboardProjects } from "@/components/dashboard-projects"
import { useToast } from "@/hooks/use-toast"

export default function DashboardPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated
    const userData = localStorage.getItem("nexus_user")

    if (!userData) {
      toast({
        title: "Authentication required",
        description: "Please sign in to access the dashboard.",
        variant: "destructive",
      })
      router.push("/auth")
      return
    }

    try {
      const parsedUser = JSON.parse(userData)
      if (!parsedUser.isAuthenticated) {
        router.push("/auth")
        return
      }

      setUser(parsedUser)
    } catch (error) {
      console.error("Error parsing user data:", error)
      router.push("/auth")
    } finally {
      setIsLoading(false)
    }
  }, [router, toast])

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-sm text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardNav />

      <main className="flex-1 overflow-y-auto">
        <DashboardHeader user={user} />

        <div className="container mx-auto px-4 py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid gap-6"
          >
            <DashboardStats />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <DashboardProjects />
              </div>
              <div>
                <DashboardActivity />
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

