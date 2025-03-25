"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Bell,
  Search,
  User,
  Settings,
  HelpCircle,
  LogOut,
  Check,
  AlertCircle,
  MessageSquare,
  Calendar,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

interface DashboardHeaderProps {
  user: { name: string; email: string } | null
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSearching, setIsSearching] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  // Notifications state
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "alert",
      title: "System Update",
      message: "System will be updated tonight at 2 AM. Expect 10 minutes of downtime.",
      time: "10 minutes ago",
      read: false,
    },
    {
      id: 2,
      type: "message",
      title: "New Message",
      message: "Alex Morgan commented on your project proposal.",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      type: "success",
      title: "Project Completed",
      message: "Website Redesign project has been marked as completed.",
      time: "3 hours ago",
      read: true,
    },
    {
      id: 4,
      type: "calendar",
      title: "Meeting Reminder",
      message: "Team meeting scheduled for tomorrow at 10 AM.",
      time: "Yesterday",
      read: true,
    },
  ])
  const notificationsRef = useRef<HTMLDivElement>(null)

  // Settings dialog state
  const [showSettings, setShowSettings] = useState(false)
  const [settingsForm, setSettingsForm] = useState({
    notifications: true,
    marketing: false,
    theme: "system",
    language: "english",
  })

  // Help dialog state
  const [showHelp, setShowHelp] = useState(false)
  const [helpQuery, setHelpQuery] = useState("")

  // Profile dialog state
  const [showProfile, setShowProfile] = useState(false)
  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: "Product designer and developer based in San Francisco.",
    notifications: true,
  })

  // Handle click outside search results
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false)
      }

      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Search functionality
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)

    if (query.length > 1) {
      // Simulate search results
      const results = [
        { type: "project", title: "Website Redesign", description: "Project matching your search" },
        { type: "document", title: "Marketing Strategy", description: "Document with relevant keywords" },
        { type: "user", title: "Alex Morgan", description: "Team member profile" },
      ].filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()),
      )

      setSearchResults(results)
      setShowSearchResults(true)
    } else {
      setShowSearchResults(false)
    }
  }

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (searchQuery.trim()) {
      toast({
        title: "Search results",
        description: `Found ${searchResults.length} results for "${searchQuery}"`,
      })
      setShowSearchResults(false)
    }
  }

  // Mark notification as read
  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
    toast({
      title: "Notifications",
      description: "All notifications marked as read",
    })
  }

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([])
    setShowNotifications(false)
    toast({
      title: "Notifications",
      description: "All notifications cleared",
    })
  }

  // Handle settings form change
  const handleSettingsChange = (field: string, value: any) => {
    setSettingsForm({
      ...settingsForm,
      [field]: value,
    })
  }

  // Save settings
  const saveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated",
    })
    setShowSettings(false)
  }

  // Handle profile form change
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileForm({
      ...profileForm,
      [name]: value,
    })
  }

  // Save profile
  const saveProfile = () => {
    // Update user in localStorage
    const userData = localStorage.getItem("nexus_user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      localStorage.setItem(
        "nexus_user",
        JSON.stringify({
          ...parsedUser,
          name: profileForm.name,
          email: profileForm.email,
        }),
      )
    }

    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated",
    })
    setShowProfile(false)

    // Refresh the page to update the user data
    window.location.reload()
  }

  // Submit help query
  const submitHelpQuery = () => {
    if (helpQuery.trim()) {
      toast({
        title: "Help request submitted",
        description: "Our support team will get back to you soon",
      })
      setHelpQuery("")
      setShowHelp(false)
    }
  }

  const handleSignOut = () => {
    // Clear user data from localStorage
    localStorage.removeItem("nexus_user")

    toast({
      title: "Signed out",
      description: "You have been successfully signed out",
    })

    router.push("/")
  }

  // Get notification icon based on type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertCircle className="h-5 w-5 text-amber-500" />
      case "message":
        return <MessageSquare className="h-5 w-5 text-blue-500" />
      case "success":
        return <Check className="h-5 w-5 text-emerald-500" />
      case "calendar":
        return <Calendar className="h-5 w-5 text-purple-500" />
      default:
        return <Bell className="h-5 w-5 text-primary" />
    }
  }

  // Count unread notifications
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6">
      <div className="flex items-center gap-2 md:hidden">
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
          NEXUS
        </span>
      </div>

      {/* Search */}
      <motion.div
        initial={{ width: "200px" }}
        animate={{ width: isSearching ? "100%" : "200px" }}
        transition={{ duration: 0.2 }}
        className="relative hidden md:block"
        ref={searchRef}
      >
        <form onSubmit={handleSearchSubmit}>
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-full bg-background pl-8 md:w-[200px] lg:w-[300px] focus:w-[300px] lg:focus:w-[400px] transition-all duration-300"
            value={searchQuery}
            onChange={handleSearch}
            onFocus={() => setIsSearching(true)}
          />
        </form>

        {/* Search Results Dropdown */}
        {showSearchResults && searchResults.length > 0 && (
          <div className="absolute top-full left-0 mt-1 w-full bg-card border border-border rounded-md shadow-lg z-50 overflow-hidden">
            <div className="p-2">
              <h4 className="text-xs font-semibold text-muted-foreground mb-2">Search Results</h4>
              <div className="space-y-1">
                {searchResults.map((result, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-primary/10 transition-colors"
                    onClick={() => {
                      toast({
                        title: "Item selected",
                        description: `You selected: ${result.title}`,
                      })
                      setShowSearchResults(false)
                      setSearchQuery("")
                    }}
                  >
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center mr-3">
                        {result.type === "project" && <Settings className="h-4 w-4 text-primary" />}
                        {result.type === "document" && <MessageSquare className="h-4 w-4 text-primary" />}
                        {result.type === "user" && <User className="h-4 w-4 text-primary" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{result.title}</p>
                        <p className="text-xs text-muted-foreground">{result.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </motion.div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative" ref={notificationsRef}>
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </Button>

          {/* Notifications Panel */}
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-md shadow-lg z-50 overflow-hidden"
              >
                <div className="p-3 border-b border-border">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Notifications</h3>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" onClick={markAllAsRead}>
                        Mark all read
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" onClick={clearAllNotifications}>
                        Clear all
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="max-h-[350px] overflow-y-auto">
                  {notifications.length > 0 ? (
                    <div className="divide-y divide-border">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-3 hover:bg-muted/50 transition-colors ${notification.read ? "" : "bg-primary/5"}`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex gap-3">
                            <div className="h-9 w-9 rounded-full bg-card flex items-center justify-center border border-border">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-medium">{notification.title}</h4>
                                {!notification.read && <span className="h-2 w-2 rounded-full bg-primary"></span>}
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                              <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 text-center">
                      <p className="text-muted-foreground">No notifications</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name || "User"}`}
                  alt={user?.name || "User"}
                />
                <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setShowProfile(true)}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setShowSettings(true)}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setShowHelp(true)}>
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Help</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription>Customize your dashboard experience</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="notifications" className="mt-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="language">Language</TabsTrigger>
            </TabsList>

            <TabsContent value="notifications" className="space-y-4 mt-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-xs text-muted-foreground">Receive email notifications for important updates</p>
                </div>
                <Switch
                  checked={settingsForm.notifications}
                  onCheckedChange={(checked) => handleSettingsChange("notifications", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Marketing Emails</Label>
                  <p className="text-xs text-muted-foreground">Receive emails about new features and offers</p>
                </div>
                <Switch
                  checked={settingsForm.marketing}
                  onCheckedChange={(checked) => handleSettingsChange("marketing", checked)}
                />
              </div>
            </TabsContent>

            <TabsContent value="appearance" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="grid grid-cols-3 gap-2">
                  {["light", "dark", "system"].map((theme) => (
                    <Button
                      key={theme}
                      variant={settingsForm.theme === theme ? "default" : "outline"}
                      className="capitalize"
                      onClick={() => handleSettingsChange("theme", theme)}
                    >
                      {theme}
                    </Button>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="language" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Select Language</Label>
                <div className="grid grid-cols-2 gap-2">
                  {["english", "spanish", "french", "german"].map((language) => (
                    <Button
                      key={language}
                      variant={settingsForm.language === language ? "default" : "outline"}
                      className="capitalize"
                      onClick={() => handleSettingsChange("language", language)}
                    >
                      {language}
                    </Button>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setShowSettings(false)}>
              Cancel
            </Button>
            <Button onClick={saveSettings}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Profile Dialog */}
      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>Update your personal information</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="flex justify-center mb-4">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${profileForm.name || "User"}`}
                  alt={profileForm.name || "User"}
                />
                <AvatarFallback className="text-lg">{profileForm.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
            </div>

            <div className="space-y-2">
              <Label htmlFor="profile-name">Full Name</Label>
              <Input id="profile-name" name="name" value={profileForm.name} onChange={handleProfileChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="profile-email">Email</Label>
              <Input
                id="profile-email"
                name="email"
                type="email"
                value={profileForm.email}
                onChange={handleProfileChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="profile-bio">Bio</Label>
              <Textarea id="profile-bio" name="bio" value={profileForm.bio} onChange={handleProfileChange} rows={3} />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="profile-notifications"
                checked={profileForm.notifications}
                onCheckedChange={(checked) => setProfileForm({ ...profileForm, notifications: checked })}
              />
              <Label htmlFor="profile-notifications">Receive notifications</Label>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setShowProfile(false)}>
              Cancel
            </Button>
            <Button onClick={saveProfile}>Save Profile</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Help Dialog */}
      <Dialog open={showHelp} onOpenChange={setShowHelp}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Help & Support</DialogTitle>
            <DialogDescription>Get assistance with using the dashboard</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="help-query">How can we help you?</Label>
              <Textarea
                id="help-query"
                placeholder="Describe your issue or question..."
                value={helpQuery}
                onChange={(e) => setHelpQuery(e.target.value)}
                rows={4}
              />
            </div>

            <div className="bg-muted/50 rounded-md p-4">
              <h4 className="text-sm font-medium mb-2">Common Questions</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    className="text-primary hover:underline text-left"
                    onClick={() => {
                      toast({
                        title: "Help Article",
                        description: "How to create a new project guide opened",
                      })
                      setShowHelp(false)
                    }}
                  >
                    How do I create a new project?
                  </button>
                </li>
                <li>
                  <button
                    className="text-primary hover:underline text-left"
                    onClick={() => {
                      toast({
                        title: "Help Article",
                        description: "Team member invitation guide opened",
                      })
                      setShowHelp(false)
                    }}
                  >
                    How to invite team members?
                  </button>
                </li>
                <li>
                  <button
                    className="text-primary hover:underline text-left"
                    onClick={() => {
                      toast({
                        title: "Help Article",
                        description: "Billing and subscription guide opened",
                      })
                      setShowHelp(false)
                    }}
                  >
                    Billing and subscription information
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setShowHelp(false)}>
              Cancel
            </Button>
            <Button onClick={submitHelpQuery}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  )
}

