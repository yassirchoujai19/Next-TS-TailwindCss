"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function DashboardActivity() {
  const activities = [
    {
      id: 1,
      user: {
        name: "Alex Morgan",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces&q=80",
        initials: "AM",
      },
      action: "completed task",
      target: "Website Redesign",
      time: "2 hours ago",
    },
    {
      id: 2,
      user: {
        name: "Samantha Chen",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces&q=80",
        initials: "SC",
      },
      action: "commented on",
      target: "Mobile App Development",
      time: "4 hours ago",
    },
    {
      id: 3,
      user: {
        name: "Marcus Johnson",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces&q=80",
        initials: "MJ",
      },
      action: "created",
      target: "New Project Proposal",
      time: "6 hours ago",
    },
    {
      id: 4,
      user: {
        name: "Emily Rodriguez",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces&q=80",
        initials: "ER",
      },
      action: "uploaded",
      target: "Project Documentation",
      time: "8 hours ago",
    },
    {
      id: 5,
      user: {
        name: "David Kim",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop&crop=faces&q=80",
        initials: "DK",
      },
      action: "assigned",
      target: "Bug Fix #42",
      time: "Yesterday",
    },
  ]

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm h-full">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest actions from your team</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-start space-x-3"
            >
              <Avatar className="h-8 w-8 border border-border">
                <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                <AvatarFallback>{activity.user.initials}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm">
                  <span className="font-medium">{activity.user.name}</span>{" "}
                  <span className="text-muted-foreground">{activity.action}</span>{" "}
                  <span className="font-medium text-primary">{activity.target}</span>
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

