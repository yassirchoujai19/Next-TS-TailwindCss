"use client"

import { useRef, useEffect } from "react"
import { useTheme } from "next-themes"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
}

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []
    const mousePosition = { x: 0, y: 0 }
    let isMouseMoving = false

    // Set canvas to full window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.x = e.clientX
      mousePosition.y = e.clientY
      isMouseMoving = true

      // Add a few particles at mouse position
      if (Math.random() > 0.9) {
        for (let i = 0; i < 3; i++) {
          addParticle(mousePosition.x, mousePosition.y)
        }
      }

      // Reset mouse movement flag after a delay
      setTimeout(() => {
        isMouseMoving = false
      }, 100)
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Create particles
    function initParticles() {
      particles = []
      const particleCount = Math.min(Math.floor(window.innerWidth * 0.05), 100)

      for (let i = 0; i < particleCount; i++) {
        addParticle()
      }
    }

    function addParticle(x?: number, y?: number) {
      const primaryColor =
        theme === "dark"
          ? ["rgba(59, 130, 246, 0.7)", "rgba(168, 85, 247, 0.7)", "rgba(236, 72, 153, 0.7)"]
          : ["rgba(37, 99, 235, 0.7)", "rgba(126, 34, 206, 0.7)", "rgba(219, 39, 119, 0.7)"]

      particles.push({
        x: x || Math.random() * canvas.width,
        y: y || Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 1 - 0.5,
        speedY: Math.random() * 1 - 0.5,
        color: primaryColor[Math.floor(Math.random() * primaryColor.length)],
      })
    }

    // Update and draw particles
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Bounce off edges
        if (particle.x > canvas.width || particle.x < 0) {
          particle.speedX *= -1
        }

        if (particle.y > canvas.height || particle.y < 0) {
          particle.speedY *= -1
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // Connect particles that are close to each other
        connectParticles(particle, index)

        // Interact with mouse
        if (isMouseMoving) {
          const dx = mousePosition.x - particle.x
          const dy = mousePosition.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            const angle = Math.atan2(dy, dx)
            particle.speedX += Math.cos(angle) * 0.02
            particle.speedY += Math.sin(angle) * 0.02
          }
        }

        // Add some randomness to movement
        if (Math.random() > 0.99) {
          particle.speedX += (Math.random() - 0.5) * 0.2
          particle.speedY += (Math.random() - 0.5) * 0.2
        }

        // Limit speed
        const maxSpeed = 1.5
        const speed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY)
        if (speed > maxSpeed) {
          particle.speedX = (particle.speedX / speed) * maxSpeed
          particle.speedY = (particle.speedY / speed) * maxSpeed
        }
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    function connectParticles(particle: Particle, index: number) {
      for (let i = index + 1; i < particles.length; i++) {
        const dx = particle.x - particles[i].x
        const dy = particle.y - particles[i].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 120) {
          ctx.beginPath()
          ctx.strokeStyle = `rgba(150, 150, 255, ${0.2 * (1 - distance / 120)})`
          ctx.lineWidth = 0.5
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(particles[i].x, particles[i].y)
          ctx.stroke()
        }
      }
    }

    // Start animation
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [theme])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

