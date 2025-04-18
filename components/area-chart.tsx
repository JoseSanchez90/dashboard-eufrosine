"use client"

import { useEffect, useRef } from "react"
import { Chart, type ChartConfiguration, registerables } from "chart.js"

Chart.register(...registerables)

export function AreaChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // Generate random data
    const labels = Array.from({ length: 90 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - 90 + i)
      return date.toLocaleDateString("es-ES", { month: "short", day: "numeric" })
    })

    const generateData = () => {
      return Array.from({ length: 90 }, () => Math.floor(Math.random() * 1000) + 500)
    }

    const data1 = generateData()
    const data2 = generateData().map((val) => val * 0.7)

    const config: ChartConfiguration = {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Visitors",
            data: data1,
            borderColor: "rgba(100, 116, 139, 0.8)",
            backgroundColor: "rgba(100, 116, 139, 0.2)",
            fill: true,
            tension: 0.4,
            borderWidth: 2,
          },
          {
            label: "Unique Visitors",
            data: data2,
            borderColor: "rgba(148, 163, 184, 0.8)",
            backgroundColor: "rgba(148, 163, 184, 0.2)",
            fill: true,
            tension: 0.4,
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            mode: "index",
            intersect: false,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              maxTicksLimit: 12,
              font: {
                size: 10,
              },
            },
          },
          y: {
            grid: {
              color: "rgba(0, 0, 0, 0.05)",
            },
            ticks: {
              font: {
                size: 10,
              },
            },
            beginAtZero: true,
          },
        },
        interaction: {
          mode: "nearest",
          axis: "x",
          intersect: false,
        },
        elements: {
          point: {
            radius: 0,
            hoverRadius: 3,
          },
        },
      },
    }

    chartInstance.current = new Chart(ctx, config)

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return (
    <div className="h-[300px] w-full">
      <canvas ref={chartRef} />
    </div>
  )
}
