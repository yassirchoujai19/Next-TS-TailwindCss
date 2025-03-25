"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Cpu, Globe, Shield, Zap, Layers, Sparkles } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export function FeaturesSection() {
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null)
  const [featureImages, setFeatureImages] = useState<string[]>([])
  const [imagesLoaded, setImagesLoaded] = useState(false)

  useEffect(() => {
    // Fetch images from Unsplash for feature backgrounds
    const fetchImages = async () => {
      try {
        const images = [
          "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80", // AI
          "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80", // Global
          "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80", // Security
          "https://images.unsplash.com/photo-1534224039826-c7a0eda0e6b3?w=800&q=80", // Speed
          "https://images.unsplash.com/photo-1545987796-200677ee1011?w=800&q=80", // Modular
          "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80", // Immersive
        ]

        setFeatureImages(images)

        // Preload images
        const imagePromises = images.map((src) => {
          return new Promise((resolve, reject) => {
            const img = new Image()
            img.src = src
            img.onload = resolve
            img.onerror = reject
            img.crossOrigin = "anonymous"
          })
        })

        await Promise.all(imagePromises)
        setImagesLoaded(true)
      } catch (error) {
        console.error("Error loading images:", error)
        // Fallback to empty array if there's an error
        setFeatureImages([])
        setImagesLoaded(true)
      }
    }

    fetchImages()
  }, [])

  const features = [
    {
      icon: Cpu,
      title: "AI-Powered",
      description: "Advanced artificial intelligence that learns and adapts to your needs.",
      details:
        "Our AI technology uses state-of-the-art machine learning algorithms to understand user behavior and preferences. It continuously improves over time, providing increasingly personalized experiences and recommendations based on your interactions with the platform.",
    },
    {
      icon: Globe,
      title: "Global Network",
      description: "Connect with users and services from around the world instantly.",
      details:
        "Our distributed network spans across 6 continents with over 200 edge locations, ensuring minimal latency regardless of where your users are located. This global infrastructure enables real-time collaboration and communication across borders and time zones.",
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Enterprise-grade security with end-to-end encryption for all your data.",
      details:
        "We implement military-grade AES-256 encryption for all data at rest and in transit. Our security protocols include regular penetration testing, compliance with SOC 2, GDPR, and HIPAA regulations, and a comprehensive disaster recovery plan with 99.99% uptime guarantee.",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance ensures minimal latency and maximum speed.",
      details:
        "Our platform is built on a cutting-edge tech stack optimized for performance. With server response times averaging under 100ms and a globally distributed CDN, your content loads instantly. We employ advanced caching strategies and code splitting to ensure even complex applications run smoothly.",
    },
    {
      icon: Layers,
      title: "Modular Design",
      description: "Customize and extend functionality with our modular architecture.",
      details:
        "Our platform is built with a microservices architecture that allows for seamless integration of new features. The modular design means you can pick and choose the components that matter to your business, creating a tailored solution without unnecessary bloat. Our extensive API documentation makes extending functionality straightforward.",
    },
    {
      icon: Sparkles,
      title: "Immersive Experience",
      description: "Cutting-edge visuals and interactions that engage and delight users.",
      details:
        "We combine the latest in 3D rendering, motion design, and haptic feedback to create truly immersive digital experiences. Our design system incorporates subtle animations, responsive interactions, and accessibility features to ensure all users enjoy a seamless and engaging experience across devices.",
    },
  ]

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

  // Function to render the icon component
  const renderIcon = (index: number) => {
    if (index === null || index >= features.length) return null

    const IconComponent = features[index].icon
    return <IconComponent className="h-5 w-5 text-primary" />
  }

  return (
    <section id="features" className="py-20 bg-background relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent opacity-70"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Cutting-Edge <span className="text-primary">Features</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-foreground/70 max-w-2xl mx-auto"
          >
            Discover the powerful capabilities that set our platform apart and drive the future of digital experiences.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => {
            const FeatureIcon = feature.icon

            return (
              <motion.div key={index} variants={itemVariants}>
                <Card
                  className="h-full border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors duration-300 cursor-pointer overflow-hidden group"
                  onClick={() => setSelectedFeature(index)}
                >
                  {imagesLoaded && featureImages[index] && (
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
                      <img
                        src={featureImages[index] || "/placeholder.svg"}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 border border-primary/20">
                      <FeatureIcon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-foreground/70">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Feature Details Dialog */}
      <Dialog open={selectedFeature !== null} onOpenChange={() => setSelectedFeature(null)}>
        <DialogContent className="sm:max-w-md border border-primary/20 bg-card/95 backdrop-blur-md">
          {selectedFeature !== null && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                    {renderIcon(selectedFeature)}
                  </div>
                  <DialogTitle className="text-xl">{features[selectedFeature].title}</DialogTitle>
                </div>
                <DialogDescription className="text-foreground/70">
                  {features[selectedFeature].description}
                </DialogDescription>
              </DialogHeader>

              {imagesLoaded && featureImages[selectedFeature] && (
                <div className="mt-2 rounded-md overflow-hidden">
                  <img
                    src={featureImages[selectedFeature] || "/placeholder.svg"}
                    alt={features[selectedFeature].title}
                    className="w-full h-40 object-cover"
                  />
                </div>
              )}

              <div className="text-sm text-foreground/80 mt-4">{features[selectedFeature].details}</div>
              <div className="mt-4 flex justify-end">
                <Button onClick={() => setSelectedFeature(null)} className="bg-primary hover:bg-primary/90">
                  Close
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}

