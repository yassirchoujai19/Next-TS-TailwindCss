"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Github, Twitter, Linkedin, Instagram } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export function Footer() {
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Subscribed!",
      description: "You've been added to our newsletter.",
      variant: "default",
    })

    setEmail("")
    setIsSubmitting(false)
  }

  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#features" },
        { name: "Pricing", href: "#" },
        { name: "Testimonials", href: "#testimonials" },
        { name: "FAQ", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "#" },
        { name: "Team", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", href: "#" },
        { name: "Documentation", href: "#" },
        { name: "Community", href: "#" },
        { name: "Support", href: "#" },
      ],
    },
  ]

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault()

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
  }

  return (
    <footer className="bg-background border-t border-border/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mb-4 inline-block"
              onClick={(e) => handleNavClick(e, "#")}
            >
              NEXUS
            </Link>
            <p className="text-foreground/70 mb-6 max-w-md">
              Pushing the boundaries of digital experiences with cutting-edge technology and futuristic design.
            </p>
            <div className="mb-6">
              <h4 className="font-medium mb-2">Subscribe to our newsletter</h4>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-card/50 border-border/50 focus:border-primary/50"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    <ArrowRight className="h-4 w-4" />
                  )}
                </Button>
              </form>
            </div>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 hover:bg-primary/20 transition-colors"
                >
                  <social.icon className="h-5 w-5 text-primary" />
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((column, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-4">{column.title}</h4>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-foreground/70 hover:text-primary transition-colors"
                      onClick={(e) => handleNavClick(e, link.href)}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border/50 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-foreground/60 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Nexus. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="#" className="text-foreground/60 hover:text-primary text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-foreground/60 hover:text-primary text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-foreground/60 hover:text-primary text-sm transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

