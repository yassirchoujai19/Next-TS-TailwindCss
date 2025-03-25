"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Plus, MoreHorizontal, Trash, Edit, ExternalLink, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function DashboardProjects() {
  const { toast } = useToast()
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false)
  const [showEditProjectDialog, setShowEditProjectDialog] = useState(false)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [currentProject, setCurrentProject] = useState<any>(null)

  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    dueDate: "",
    status: "Not Started",
    team: [],
  })

  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Website Redesign",
      description: "Redesigning the company website with a modern UI/UX approach",
      progress: 75,
      status: "In Progress",
      dueDate: "Mar 15, 2025",
      team: [
        {
          name: "Alex Morgan",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces&q=80",
          initials: "AM",
        },
        {
          name: "Samantha Chen",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces&q=80",
          initials: "SC",
        },
        {
          name: "Marcus Johnson",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces&q=80",
          initials: "MJ",
        },
      ],
    },
    {
      id: 2,
      name: "Mobile App Development",
      description: "Creating a cross-platform mobile application for our services",
      progress: 45,
      status: "In Progress",
      dueDate: "Apr 30, 2025",
      team: [
        {
          name: "Emily Rodriguez",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces&q=80",
          initials: "ER",
        },
        {
          name: "David Kim",
          avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop&crop=faces&q=80",
          initials: "DK",
        },
      ],
    },
    {
      id: 3,
      name: "Marketing Campaign",
      description: "Q2 marketing campaign for product launch",
      progress: 90,
      status: "Almost Done",
      dueDate: "Mar 31, 2025",
      team: [
        {
          name: "Samantha Chen",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces&q=80",
          initials: "SC",
        },
        {
          name: "Alex Morgan",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces&q=80",
          initials: "AM",
        },
      ],
    },
  ])

  // Team members for selection
  const teamMembers = [
    {
      id: 1,
      name: "Alex Morgan",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces&q=80",
      initials: "AM",
    },
    {
      id: 2,
      name: "Samantha Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces&q=80",
      initials: "SC",
    },
    {
      id: 3,
      name: "Marcus Johnson",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces&q=80",
      initials: "MJ",
    },
    {
      id: 4,
      name: "Emily Rodriguez",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces&q=80",
      initials: "ER",
    },
    {
      id: 5,
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop&crop=faces&q=80",
      initials: "DK",
    },
  ]

  // Status options
  const statusOptions = ["Not Started", "In Progress", "Almost Done", "Completed"]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
      case "In Progress":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
      case "Almost Done":
        return "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20"
      case "Not Started":
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
    }
  }

  // Calculate progress based on status
  const calculateProgress = (status: string) => {
    switch (status) {
      case "Not Started":
        return 0
      case "In Progress":
        return 50
      case "Almost Done":
        return 90
      case "Completed":
        return 100
      default:
        return 0
    }
  }

  // Handle new project form change
  const handleNewProjectChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewProject({
      ...newProject,
      [name]: value,
    })
  }

  // Handle status change
  const handleStatusChange = (value: string) => {
    setNewProject({
      ...newProject,
      status: value,
    })
  }

  // Handle team member selection
  const handleTeamMemberSelect = (memberId: number) => {
    const member = teamMembers.find((m) => m.id === memberId)
    if (!member) return

    // Check if member is already in team
    if (newProject.team.some((m: any) => m.name === member.name)) {
      setNewProject({
        ...newProject,
        team: newProject.team.filter((m: any) => m.name !== member.name),
      })
    } else {
      setNewProject({
        ...newProject,
        team: [...newProject.team, member],
      })
    }
  }

  // Create new project
  const createNewProject = () => {
    if (!newProject.name || !newProject.description || !newProject.dueDate) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const newId = Math.max(0, ...projects.map((p) => p.id)) + 1
    const progress = calculateProgress(newProject.status)

    const createdProject = {
      id: newId,
      name: newProject.name,
      description: newProject.description,
      progress,
      status: newProject.status,
      dueDate: newProject.dueDate,
      team: newProject.team,
    }

    setProjects([...projects, createdProject])
    setNewProject({
      name: "",
      description: "",
      dueDate: "",
      status: "Not Started",
      team: [],
    })

    setShowNewProjectDialog(false)

    toast({
      title: "Project created",
      description: `${newProject.name} has been created successfully`,
    })
  }

  // Edit project
  const editProject = () => {
    if (!currentProject) return

    const updatedProjects = projects.map((project) => (project.id === currentProject.id ? currentProject : project))

    setProjects(updatedProjects)
    setShowEditProjectDialog(false)

    toast({
      title: "Project updated",
      description: `${currentProject.name} has been updated successfully`,
    })
  }

  // Delete project
  const deleteProject = () => {
    if (!currentProject) return

    setProjects(projects.filter((project) => project.id !== currentProject.id))
    setShowDeleteConfirmation(false)

    toast({
      title: "Project deleted",
      description: `${currentProject.name} has been deleted`,
    })
  }

  // Open edit dialog
  const openEditDialog = (project: any) => {
    setCurrentProject(project)
    setShowEditProjectDialog(true)
  }

  // Open delete confirmation
  const openDeleteConfirmation = (project: any) => {
    setCurrentProject(project)
    setShowDeleteConfirmation(true)
  }

  // Mark project as complete
  const markAsComplete = (project: any) => {
    const updatedProjects = projects.map((p) =>
      p.id === project.id ? { ...p, status: "Completed", progress: 100 } : p,
    )

    setProjects(updatedProjects)

    toast({
      title: "Project completed",
      description: `${project.name} has been marked as completed`,
    })
  }

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Active Projects</CardTitle>
          <CardDescription>Track your ongoing projects</CardDescription>
        </div>
        <Button size="sm" className="h-8 gap-1" onClick={() => setShowNewProjectDialog(true)}>
          <Plus className="h-3.5 w-3.5" />
          <span>New Project</span>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{project.name}</h3>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(project.status)} variant="outline">
                    {project.status}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => openEditDialog(project)}>
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => markAsComplete(project)}>
                        <Check className="mr-2 h-4 w-4" />
                        <span>Mark as Complete</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        <span>View Details</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => openDeleteConfirmation(project)}
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex -space-x-2">
                  {project.team.map((member, i) => (
                    <Avatar key={i} className="h-7 w-7 border-2 border-background">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="text-xs">{member.initials}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <span className="text-muted-foreground">Due {project.dueDate}</span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-1.5" />
              </div>
            </motion.div>
          ))}

          {projects.length === 0 && (
            <div className="text-center py-6">
              <p className="text-muted-foreground">No projects yet</p>
              <Button variant="outline" className="mt-2" onClick={() => setShowNewProjectDialog(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create your first project
              </Button>
            </div>
          )}
        </div>
      </CardContent>

      {/* New Project Dialog */}
      <Dialog open={showNewProjectDialog} onOpenChange={setShowNewProjectDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>Add a new project to your dashboard</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="project-name">Project Name</Label>
              <Input
                id="project-name"
                name="name"
                placeholder="Enter project name"
                value={newProject.name}
                onChange={handleNewProjectChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="project-description">Description</Label>
              <Textarea
                id="project-description"
                name="description"
                placeholder="Enter project description"
                value={newProject.description}
                onChange={handleNewProjectChange}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="project-status">Status</Label>
              <Select onValueChange={handleStatusChange} defaultValue={newProject.status}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="project-due-date">Due Date</Label>
              <Input
                id="project-due-date"
                name="dueDate"
                type="text"
                placeholder="e.g., Apr 30, 2025"
                value={newProject.dueDate}
                onChange={handleNewProjectChange}
              />
            </div>

            <div className="space-y-2">
              <Label>Team Members</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${
                      newProject.team.some((m: any) => m.name === member.name)
                        ? "bg-primary/10 border-primary/50"
                        : "bg-card border-border"
                    } cursor-pointer transition-colors`}
                    onClick={() => handleTeamMemberSelect(member.id)}
                  >
                    <Avatar className="h-5 w-5">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="text-[10px]">{member.initials}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs">{member.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setShowNewProjectDialog(false)}>
              Cancel
            </Button>
            <Button onClick={createNewProject}>Create Project</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Project Dialog */}
      <Dialog open={showEditProjectDialog} onOpenChange={setShowEditProjectDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>Update project details</DialogDescription>
          </DialogHeader>

          {currentProject && (
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="edit-project-name">Project Name</Label>
                <Input
                  id="edit-project-name"
                  value={currentProject.name}
                  onChange={(e) => setCurrentProject({ ...currentProject, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-project-description">Description</Label>
                <Textarea
                  id="edit-project-description"
                  value={currentProject.description}
                  onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-project-status">Status</Label>
                <Select
                  defaultValue={currentProject.status}
                  onValueChange={(value) => {
                    setCurrentProject({
                      ...currentProject,
                      status: value,
                      progress: calculateProgress(value),
                    })
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-project-due-date">Due Date</Label>
                <Input
                  id="edit-project-due-date"
                  value={currentProject.dueDate}
                  onChange={(e) => setCurrentProject({ ...currentProject, dueDate: e.target.value })}
                />
              </div>
            </div>
          )}

          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setShowEditProjectDialog(false)}>
              Cancel
            </Button>
            <Button onClick={editProject}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteConfirmation} onOpenChange={setShowDeleteConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this project? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {currentProject && (
            <div className="bg-muted/50 p-4 rounded-md mt-4">
              <h4 className="font-medium">{currentProject.name}</h4>
              <p className="text-sm text-muted-foreground mt-1">{currentProject.description}</p>
            </div>
          )}

          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setShowDeleteConfirmation(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={deleteProject}>
              Delete Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

