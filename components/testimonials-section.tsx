"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      content:
        "This platform has completely transformed how we approach digital innovation. The futuristic interface and powerful features have given us a competitive edge.",
      author: "Alex Morgan",
      role: "CTO, TechVision",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces&q=80",
    },
    {
      id: 2,
      content:
        "The immersive experience and cutting-edge design elements have helped us create digital products that truly stand out in a crowded market.",
      author: "Samantha Chen",
      role: "Design Director, Innovate Co",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces&q=80",
    },
    {
      id: 3,
      content:
        "We've seen a 200% increase in user engagement since implementing this platform. The futuristic UI components and smooth animations keep users coming back.",
      author: "Marcus Johnson",
      role: "Product Lead, FutureTech",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces&q=80",
    },
  ])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState(false)

  useEffect(() => {
    // Preload images
    const imagePromises = testimonials.map((testimonial) => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = testimonial.avatar
        img.onload = resolve
        img.onerror = reject
        img.crossOrigin = "anonymous"
      })
    })

    Promise.all(imagePromises)
      .then(() => setImagesLoaded(true))
      .catch((error) => console.error("Error preloading images:", error))
  }, [testimonials])

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  return (
    <section id="testimonials" className="py-20 bg-background relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            What Our <span className="text-primary">Team</span> Says
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-foreground/70 max-w-2xl mx-auto"
          >
            Hear from our innovative team members who are pushing the boundaries of what's possible in digital
            experiences.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center">
                  <Quote className="h-10 w-10 text-primary/40 mb-6" />
                  <p className="text-lg mb-8 text-foreground/80">{testimonials[currentIndex].content}</p>
                  <Avatar className="h-20 w-20 border-2 border-primary/20 p-1 mb-4">
                    <AvatarImage src={testimonials[currentIndex].avatar} alt={testimonials[currentIndex].author} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {testimonials[currentIndex].author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h4 className="font-semibold text-xl">{testimonials[currentIndex].author}</h4>
                  <p className="text-foreground/60">{testimonials[currentIndex].role}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="flex justify-center mt-8 gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full border-primary/20 text-primary hover:bg-primary/10 hover:text-primary"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full border-primary/20 text-primary hover:bg-primary/10 hover:text-primary"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

