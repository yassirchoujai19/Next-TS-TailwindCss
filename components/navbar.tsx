"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // After mounting, we can safely show the UI that depends on the theme
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark")

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Features", href: "#features" },
    { name: "Team", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsOpen(false)

    // Handle home link
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }

    // Handle section links
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border/50" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
            onClick={(e) => handleNavClick(e, "#")}
          >
            NEXUS
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-foreground/80 hover:text-primary transition-colors relative group"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            >
              {mounted &&
                (theme === "dark" ? (
                  <Sun className="h-5 w-5 text-yellow-400" />
                ) : (
                  <Moon className="h-5 w-5 text-blue-600" />
                ))}
            </Button>
            <Button
              className="bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20"
              variant="outline"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex md:hidden items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            >
              {mounted &&
                (theme === "dark" ? (
                  <Sun className="h-5 w-5 text-yellow-400" />
                ) : (
                  <Moon className="h-5 w-5 text-blue-600" />
                ))}
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-foreground">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-background/95 backdrop-blur-sm z-40 flex flex-col justify-center items-center space-y-8 transition-all duration-300 md:hidden",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
      >
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="text-2xl font-medium text-foreground hover:text-primary transition-colors"
            onClick={(e) => handleNavClick(e, link.href)}
          >
            {link.name}
          </Link>
        ))}
        <Button
          className="mt-4 bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20"
          variant="outline"
          onClick={() => {
            setIsOpen(false)
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
          }}
        >
          Get Started
        </Button>
      </div>
    </nav>
  )
}

