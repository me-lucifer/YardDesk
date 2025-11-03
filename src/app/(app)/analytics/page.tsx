"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { analyticsData } from "@/lib/mock-data"
import { Bar, BarChart, CartesianGrid, XAxis, Pie, PieChart, Cell } from "recharts"

const barChartConfig = {
  tickets: {
    label: "Tickets",
    color: "hsl(var(--primary))",
  },
}

const pieChartConfig = {
    "5 Stars": { label: "5 Stars", color: "hsl(145, 58%, 55%)" },
    "4 Stars": { label: "4 Stars", color: "hsl(145, 58%, 45%)" },
    "3 Stars": { label: "3 Stars", color: "hsl(145, 58%, 35%)" },
    "2 Stars": { label: "2 Stars", color: "hsl(40, 58%, 55%)" },
    "1 Star": { label: "1 Star", color: "hsl(0, 58%, 55%)" },
}

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
            <CardDescription>Last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">$28,500</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Open Tickets</CardTitle>
            <CardDescription>Currently needing attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Avg. Response Time</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">2.4 hours</div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Tickets per Day</CardTitle>
            <CardDescription>Last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={barChartConfig} className="h-[250px] w-full">
              <BarChart data={analyticsData.ticketsByDay} margin={{ top: 20, right: 20, left: -10, bottom: 0}}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="tickets" fill="var(--color-tickets)" radius={8} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Customer Satisfaction</CardTitle>
            <CardDescription>All-time ratings</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
             <ChartContainer
                config={pieChartConfig}
                className="mx-auto aspect-square h-[250px]"
                >
                <PieChart>
                    <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                    />
                    <Pie
                    data={analyticsData.satisfactionData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    strokeWidth={5}
                    >
                    {analyticsData.satisfactionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                    </Pie>
                    <ChartLegend content={<ChartLegendContent nameKey="name" />} />
                </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
