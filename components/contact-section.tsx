"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send, Mail, Phone, MapPin } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function ContactSection() {
  const { toast } = useToast()
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Show success toast
    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you as soon as possible.",
      variant: "default",
    })

    // Reset form
    setFormState({ name: "", email: "", message: "" })
    setIsSubmitting(false)
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "contact@nexus.com",
      href: "mailto:contact@nexus.com",
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+1 (555) 123-4567",
      href: "tel:+15551234567",
    },
    {
      icon: MapPin,
      title: "Location",
      content: "San Francisco, CA",
      href: "https://maps.google.com/?q=San+Francisco,+CA",
      target: "_blank",
      rel: "noopener noreferrer",
    },
  ]

  return (
    <section id="contact" className="py-20 bg-background relative">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Get in <span className="text-primary">Touch</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-foreground/70 max-w-2xl mx-auto"
          >
            Have a question or want to learn more? Reach out to our team and we'll get back to you as soon as possible.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-semibold mb-6">Send us a message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  name="name"
                  placeholder="Your Name"
                  value={formState.name}
                  onChange={handleChange}
                  className="bg-card/50 border-border/50 focus:border-primary/50"
                  required
                />
              </div>
              <div>
                <Input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  value={formState.email}
                  onChange={handleChange}
                  className="bg-card/50 border-border/50 focus:border-primary/50"
                  required
                />
              </div>
              <div>
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  value={formState.message}
                  onChange={handleChange}
                  className="bg-card/50 border-border/50 focus:border-primary/50 min-h-[150px]"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isSubmitting}
              >
                <span className="relative z-10 flex items-center">
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
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
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-between"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    target={item.target}
                    rel={item.rel}
                    className="flex items-start space-x-4 group"
                  >
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-foreground/70 group-hover:text-primary transition-colors">{item.content}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-12 p-6 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm">
              <h4 className="font-semibold mb-2">Working Hours</h4>
              <p className="text-foreground/70 mb-4">Our team is available to assist you during the following hours:</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

