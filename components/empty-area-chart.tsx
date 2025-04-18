"use client"

import { useEffect, useRef } from "react"
import { Chart, type ChartConfiguration, registerables } from "chart.js"

Chart.register(...registerables)

export function EmptyAreaChart() {
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

    // Generate empty data
    const labels = Array.from({ length: 30 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - 30 + i)
      return date.toLocaleDateString("es-ES", { month: "short", day: "numeric" })
    })

    const emptyData = Array(30).fill(0)

    const config: ChartConfiguration = {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Ventas",
            data: emptyData,
            borderColor: "rgba(100, 116, 139, 0.5)",
            backgroundColor: "rgba(100, 116, 139, 0.1)",
            fill: true,
            tension: 0.4,
            borderWidth: 1,
            borderDash: [5, 5],
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

    // Add "No data available" text
    const originalDraw = Chart.prototype.draw
    Chart.prototype.draw = function (this: Chart) {
      originalDraw.apply(this)

      // Verificar si todos los datos son cero o equivalentes a cero
      const hasNoData = this.data.datasets.some((dataset) => {
        return dataset.data.every((value) => {
          // Manejar diferentes tipos de datos posibles
          if (value === null || value === undefined) return true
          if (typeof value === "number") return value === 0
          if (Array.isArray(value)) return value[1] === 0
          if (typeof value === "object" && value !== null) {
            // Para Point o BubbleDataPoint
            return "y" in value ? value.y === 0 : false
          }
          return false
        })
      })

      if (hasNoData) {
        const ctx = this.ctx
        const width = this.width
        const height = this.height

        ctx.save()
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.font = "14px Arial"
        ctx.fillStyle = "#9ca3af"
        ctx.fillText("No hay datos de ventas registrados aún", width / 2, height / 2)
        ctx.restore()
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
      // Restore original draw method
      Chart.prototype.draw = originalDraw
    }
  }, [])

  return (
    <div className="h-[300px] w-full">
      <canvas ref={chartRef} />
    </div>
  )
}
