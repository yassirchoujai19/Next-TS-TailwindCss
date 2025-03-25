"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { ParticleCanvas } from "@/components/particle-canvas"
import { useRouter } from "next/navigation"

export function HeroSection() {
  const router = useRouter()

  const handleGetStarted = () => {
    router.push("/auth")
  }

  const handleLearnMore = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Particle Background */}
      <div className="absolute inset-0 z-0">
        <ParticleCanvas />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background z-10"></div>

      <div className="container mx-auto px-4 z-20 py-20">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20">
              The Future is Now
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
          >
            <span className="block">Discover the Next</span>
            <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              Digital Frontier
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-foreground/70 max-w-2xl mb-10"
          >
            Explore cutting-edge technology and immersive digital experiences that redefine the boundaries of what's
            possible in the digital realm.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={handleGetStarted}
            >
              <span className="relative z-10">Get Started</span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="group border-primary/20 text-primary hover:bg-primary/10"
              onClick={handleLearnMore}
            >
              Learn More
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="flex flex-col items-center"
        >
          <span className="text-foreground/50 text-sm mb-2">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
            className="w-6 h-10 rounded-full border-2 border-foreground/20 flex justify-center pt-2"
            onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
            style={{ cursor: "pointer" }}
          >
            <motion.div
              animate={{ height: [6, 12, 6] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
              className="w-1 bg-primary rounded-full"
            ></motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

