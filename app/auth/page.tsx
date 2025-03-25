"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ParticleCanvas } from "@/components/particle-canvas"
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff, Loader2 } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function AuthPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin")

  // Form states
  const [signinForm, setSigninForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })

  // Form validation states
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: "",
  })

  const handleSigninChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setSigninForm({
      ...signinForm,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setSignupForm({
      ...signupForm,
      [name]: type === "checkbox" ? checked : value,
    })

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const validateSignupForm = () => {
    let isValid = true
    const newErrors = { ...errors }

    // Validate name
    if (!signupForm.name.trim()) {
      newErrors.name = "Name is required"
      isValid = false
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!signupForm.email.trim()) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!emailRegex.test(signupForm.email)) {
      newErrors.email = "Please enter a valid email"
      isValid = false
    }

    // Validate password
    if (!signupForm.password) {
      newErrors.password = "Password is required"
      isValid = false
    } else if (signupForm.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
      isValid = false
    }

    // Validate confirm password
    if (signupForm.password !== signupForm.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
      isValid = false
    }

    // Validate terms agreement
    if (!signupForm.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Store user info in localStorage (in a real app, you'd use a proper auth system)
    localStorage.setItem(
      "nexus_user",
      JSON.stringify({
        email: signinForm.email,
        isAuthenticated: true,
        name: "User", // In a real app, you'd get this from your backend
      }),
    )

    toast({
      title: "Welcome back!",
      description: "You've successfully signed in.",
    })

    setIsLoading(false)
    router.push("/dashboard")
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateSignupForm()) {
      return
    }

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Store user info in localStorage (in a real app, you'd use a proper auth system)
    localStorage.setItem(
      "nexus_user",
      JSON.stringify({
        email: signupForm.email,
        name: signupForm.name,
        isAuthenticated: true,
      }),
    )

    toast({
      title: "Account created!",
      description: "Your account has been successfully created.",
    })

    setIsLoading(false)
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative">
      {/* Particle Background */}
      <div className="absolute inset-0 z-0">
        <ParticleCanvas />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background z-10"></div>

      <div className="container max-w-md px-4 z-20">
        <Link href="/" className="flex items-center text-foreground/70 hover:text-primary transition-colors mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="border border-border/50 bg-card/50 backdrop-blur-md">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold">
                {authMode === "signin" ? "Sign in to your account" : "Create an account"}
              </CardTitle>
              <CardDescription>
                {authMode === "signin"
                  ? "Enter your credentials to access your account"
                  : "Fill in the details below to create your account"}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Tabs
                defaultValue="signin"
                value={authMode}
                onValueChange={(value) => setAuthMode(value as "signin" | "signup")}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="signin">
                  <form onSubmit={handleSignin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signin-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signin-email"
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          value={signinForm.email}
                          onChange={handleSigninChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="signin-password">Password</Label>
                        <Link
                          href="#"
                          className="text-xs text-primary hover:underline"
                          onClick={(e) => {
                            e.preventDefault()
                            toast({
                              title: "Password reset",
                              description: "Password reset functionality would be implemented in a real app.",
                            })
                          }}
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signin-password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={signinForm.password}
                          onChange={handleSigninChange}
                          className="pl-10"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember-me"
                        name="rememberMe"
                        checked={signinForm.rememberMe}
                        onCheckedChange={(checked) => setSigninForm({ ...signinForm, rememberMe: checked as boolean })}
                      />
                      <label
                        htmlFor="remember-me"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Remember me
                      </label>
                    </div>

                    <Button
                      type="submit"
                      className="w-full group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground"
                      disabled={isLoading}
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Signing in...
                          </>
                        ) : (
                          "Sign In"
                        )}
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="name"
                          name="name"
                          placeholder="John Doe"
                          value={signupForm.name}
                          onChange={handleSignupChange}
                          className={`pl-10 ${errors.name ? "border-destructive" : ""}`}
                        />
                      </div>
                      {errors.name && <p className="text-destructive text-xs">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          value={signupForm.email}
                          onChange={handleSignupChange}
                          className={`pl-10 ${errors.email ? "border-destructive" : ""}`}
                        />
                      </div>
                      {errors.email && <p className="text-destructive text-xs">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={signupForm.password}
                          onChange={handleSignupChange}
                          className={`pl-10 ${errors.password ? "border-destructive" : ""}`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {errors.password && <p className="text-destructive text-xs">{errors.password}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={signupForm.confirmPassword}
                          onChange={handleSignupChange}
                          className={`pl-10 ${errors.confirmPassword ? "border-destructive" : ""}`}
                        />
                      </div>
                      {errors.confirmPassword && <p className="text-destructive text-xs">{errors.confirmPassword}</p>}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="terms"
                          name="agreeToTerms"
                          checked={signupForm.agreeToTerms}
                          onCheckedChange={(checked) =>
                            setSignupForm({ ...signupForm, agreeToTerms: checked as boolean })
                          }
                          className={errors.agreeToTerms ? "border-destructive" : ""}
                        />
                        <div className="grid gap-1.5 leading-none">
                          <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            I agree to the{" "}
                            <Link href="#" className="text-primary hover:underline">
                              terms of service
                            </Link>{" "}
                            and{" "}
                            <Link href="#" className="text-primary hover:underline">
                              privacy policy
                            </Link>
                          </label>
                        </div>
                      </div>
                      {errors.agreeToTerms && <p className="text-destructive text-xs">{errors.agreeToTerms}</p>}
                    </div>

                    <Button
                      type="submit"
                      className="w-full group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground"
                      disabled={isLoading}
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating account...
                          </>
                        ) : (
                          "Create Account"
                        )}
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>

            <CardFooter className="flex flex-col">
              <div className="mt-2 text-center text-sm text-muted-foreground">
                {authMode === "signin" ? (
                  <>
                    Don't have an account?{" "}
                    <button onClick={() => setAuthMode("signup")} className="text-primary hover:underline">
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button onClick={() => setAuthMode("signin")} className="text-primary hover:underline">
                      Sign in
                    </button>
                  </>
                )}
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

