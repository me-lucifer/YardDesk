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
} from "@/components/ui/chart"
import { analyticsData } from "@/lib/store"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu"
import { Calendar as CalendarIcon, ListFilter } from "lucide-react"

const barChartConfig = {
  tickets: {
    label: "Tickets",
    color: "hsl(var(--primary))",
  },
  parts: {
      label: "Count",
      color: "hsl(var(--primary))",
  }
}

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-1.5">
                <CalendarIcon className="h-4 w-4" />
                <span>Date range</span>
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 gap-1">
                    <ListFilter className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                    </span>
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuCheckboxItem checked>
                        Channel
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Status</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader>
            <CardTitle>New tickets today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">5</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>First response time</CardTitle>
             <CardDescription>Median</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">12m</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Missed-call recovery</CardTitle>
             <CardDescription>Mock data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">88%</div>
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle>Close rate</CardTitle>
             <CardDescription>Mock data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">75%</div>
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle>Breaching SLA</CardTitle>
             <CardDescription>Mock data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-destructive">2</div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
                <div>
                    <CardTitle>Tickets per Day</CardTitle>
                    <CardDescription>Last 7 days</CardDescription>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">7d</Button>
                    <Button variant="ghost" size="sm">30d</Button>
                </div>
            </div>
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
            <CardTitle>Top Requested Parts</CardTitle>
            <CardDescription>An overview of the most requested parts.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={barChartConfig} className="h-[250px] w-full">
               <BarChart data={analyticsData.topParts} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid horizontal={false} />
                    <YAxis
                        dataKey="part"
                        type="category"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={10}
                        width={80}
                        className="text-xs"
                    />
                    <XAxis dataKey="count" type="number" hide />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="count" fill="var(--color-parts)" radius={5} />
                </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
       <Card>
        <CardHeader>
            <CardTitle>Response Time Distribution</CardTitle>
            <CardDescription>Histogram of response times.</CardDescription>
        </CardHeader>
        <CardContent>
             <ChartContainer config={barChartConfig} className="h-[200px] w-full">
                <BarChart data={analyticsData.responseTimeDistribution} margin={{ top: 20, right: 20, left: -10, bottom: 0}}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="bucket" tickLine={false} axisLine={false} tickMargin={8} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="count" fill="var(--color-tickets)" radius={4} />
                </BarChart>
            </ChartContainer>
        </CardContent>
       </Card>
    </div>
  )
}
