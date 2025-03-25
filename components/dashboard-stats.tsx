"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, LineChart, PieChart } from "@/components/ui/charts"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, Users, BarChart3, Activity } from "lucide-react"

export function DashboardStats() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
    >
      <motion.div variants={itemVariants}>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,853</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 flex items-center">
                +12.5%
                <ArrowUpRight className="ml-1 h-3 w-3" />
              </span>{" "}
              from last month
            </p>
            <div className="mt-4 h-[60px]">
              <LineChart
                data={[10, 15, 18, 25, 30, 35, 40, 45, 50, 55, 60, 65]}
                labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}
                color="#10b981"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 flex items-center">
                +3
                <ArrowUpRight className="ml-1 h-3 w-3" />
              </span>{" "}
              new this week
            </p>
            <div className="mt-4 h-[60px]">
              <BarChart
                data={[4, 7, 10, 12, 9, 11, 8, 10, 12, 15, 18, 24]}
                labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}
                color="#8b5cf6"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.8%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 flex items-center">
                +4.3%
                <ArrowUpRight className="ml-1 h-3 w-3" />
              </span>{" "}
              from last week
            </p>
            <div className="mt-4 h-[60px]">
              <LineChart
                data={[15, 18, 16, 19, 17, 20, 22, 21, 23, 24, 24.5, 24.8]}
                labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}
                color="#ec4899"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <Tabs defaultValue="week" className="w-[120px]">
              <TabsList className="grid h-7 w-full grid-cols-2">
                <TabsTrigger value="week" className="text-xs">
                  Week
                </TabsTrigger>
                <TabsTrigger value="month" className="text-xs">
                  Month
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$48,294</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 flex items-center">
                +18.2%
                <ArrowUpRight className="ml-1 h-3 w-3" />
              </span>{" "}
              from last period
            </p>
            <div className="mt-4 h-[60px]">
              <PieChart
                data={[35, 25, 20, 15, 5]}
                labels={["Product A", "Product B", "Product C", "Product D", "Other"]}
                colors={["#3b82f6", "#8b5cf6", "#ec4899", "#10b981", "#6b7280"]}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

