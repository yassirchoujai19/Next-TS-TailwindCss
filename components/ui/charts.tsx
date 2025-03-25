"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

interface ChartProps {
  data: number[]
  labels: string[]
  color?: string
  colors?: string[]
}

export function LineChart({ data, labels, color = "#3b82f6" }: ChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const textColor = theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)"
    const gridColor = theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set dimensions
    const width = canvas.width
    const height = canvas.height
    const padding = 10
    const graphWidth = width - padding * 2
    const graphHeight = height - padding * 2

    // Find max value for scaling
    const maxValue = Math.max(...data) * 1.1

    // Draw line
    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.lineWidth = 2

    data.forEach((value, index) => {
      const x = padding + (index / (data.length - 1)) * graphWidth
      const y = height - (padding + (value / maxValue) * graphHeight)

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.stroke()

    // Fill area under the line
    ctx.lineTo(padding + graphWidth, height - padding)
    ctx.lineTo(padding, height - padding)
    ctx.closePath()
    ctx.fillStyle = `${color}20`
    ctx.fill()

    // Add dots at data points
    data.forEach((value, index) => {
      const x = padding + (index / (data.length - 1)) * graphWidth
      const y = height - (padding + (value / maxValue) * graphHeight)

      ctx.beginPath()
      ctx.arc(x, y, 3, 0, Math.PI * 2)
      ctx.fillStyle = color
      ctx.fill()
      ctx.strokeStyle = theme === "dark" ? "#000" : "#fff"
      ctx.lineWidth = 1
      ctx.stroke()
    })
  }, [data, labels, color, theme])

  return <canvas ref={canvasRef} width="300" height="60" />
}

export function BarChart({ data, labels, color = "#3b82f6" }: ChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const textColor = theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)"
    const gridColor = theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set dimensions
    const width = canvas.width
    const height = canvas.height
    const padding = 10
    const graphWidth = width - padding * 2
    const graphHeight = height - padding * 2

    // Find max value for scaling
    const maxValue = Math.max(...data) * 1.1

    // Draw bars
    const barWidth = (graphWidth / data.length) * 0.8
    const barSpacing = (graphWidth / data.length) * 0.2

    data.forEach((value, index) => {
      const x = padding + index * (barWidth + barSpacing)
      const barHeight = (value / maxValue) * graphHeight
      const y = height - padding - barHeight

      // Create gradient for bar
      const gradient = ctx.createLinearGradient(x, y, x, height - padding)
      gradient.addColorStop(0, color)
      gradient.addColorStop(1, `${color}50`)

      ctx.fillStyle = gradient
      ctx.fillRect(x, y, barWidth, barHeight)

      // Add border to bar
      ctx.strokeStyle = color
      ctx.lineWidth = 1
      ctx.strokeRect(x, y, barWidth, barHeight)
    })
  }, [data, labels, color, theme])

  return <canvas ref={canvasRef} width="300" height="60" />
}

export function PieChart({
  data,
  labels,
  colors = ["#3b82f6", "#8b5cf6", "#ec4899", "#10b981", "#6b7280"],
}: ChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set dimensions
    const width = canvas.width
    const height = canvas.height
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(centerX, centerY) - 10

    // Calculate total for percentages
    const total = data.reduce((sum, value) => sum + value, 0)

    // Draw pie segments
    let startAngle = -Math.PI / 2 // Start at top

    data.forEach((value, index) => {
      const sliceAngle = (value / total) * (Math.PI * 2)
      const endAngle = startAngle + sliceAngle

      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.closePath()

      ctx.fillStyle = colors[index % colors.length]
      ctx.fill()

      // Add border
      ctx.strokeStyle = theme === "dark" ? "#1f2937" : "#f9fafb"
      ctx.lineWidth = 1
      ctx.stroke()

      startAngle = endAngle
    })

    // Draw center circle for donut effect
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius * 0.6, 0, Math.PI * 2)
    ctx.fillStyle = theme === "dark" ? "#1f2937" : "#f9fafb"
    ctx.fill()
  }, [data, labels, colors, theme])

  return <canvas ref={canvasRef} width="300" height="60" />
}

