"use client"

import { Line, LineChart, Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function TrainingDataSection() {
  const durationData = [
    { week: "Week 1", duration: 120 },
    { week: "Week 2", duration: 150 },
    { week: "Week 3", duration: 180 },
    { week: "Week 4", duration: 160 },
    { week: "Week 5", duration: 210 },
    { week: "Week 6", duration: 240 },
    { week: "Week 7", duration: 220 },
    { week: "Week 8", duration: 270 },
  ]

  const frequencyData = [
    { day: "Monday", frequency: 3 },
    { day: "Tuesday", frequency: 2 },
    { day: "Wednesday", frequency: 1 },
    { day: "Thursday", frequency: 1 },
    { day: "Friday", frequency: 3 },
    { day: "Saturday", frequency: 5 },
    { day: "Sunday", frequency: 2 },
  ]

  const trainingRecords = [
    {
      date: "2025-04-01",
      type: "Swing Practice",
      duration: 45,
      completion: "90%",
      notes: "Forehand technique improved",
    },
    { date: "2025-04-03", type: "Footwork", duration: 30, completion: "85%", notes: "Need to improve movement speed" },
    { date: "2025-04-07", type: "Serve Practice", duration: 60, completion: "95%", notes: "Good spin control" },
    { date: "2025-04-13", type: "Rally Practice", duration: 90, completion: "80%", notes: "Backhand needs work" },
    {
      date: "2025-04-14",
      type: "Tactical Training",
      duration: 45,
      completion: "75%",
      notes: "Need to improve tactical awareness",
    },
  ]

  return (
    <Card className="border-0 bg-zinc-900 text-white">
      <CardHeader className="pb-2 border-b border-zinc-800">
        <CardTitle className="text-xl text-orange-500">Training Data</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <div className="h-[200px]">
            <p className="text-sm font-medium mb-2">Training Duration Trend</p>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={durationData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="week" tick={{ fill: "white" }} axisLine={{ stroke: "rgba(255,255,255,0.3)" }} />
                <YAxis tick={{ fill: "white" }} axisLine={{ stroke: "rgba(255,255,255,0.3)" }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#333", border: "none" }}
                  labelStyle={{ color: "white" }}
                  itemStyle={{ color: "white" }}
                />
                <Line
                  type="monotone"
                  dataKey="duration"
                  stroke="#f97316"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#f97316" }}
                  activeDot={{ r: 6, fill: "#f97316" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="h-[200px]">
            <p className="text-sm font-medium mb-2">Weekly Training Frequency</p>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={frequencyData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="day" tick={{ fill: "white" }} axisLine={{ stroke: "rgba(255,255,255,0.3)" }} />
                <YAxis tick={{ fill: "white" }} axisLine={{ stroke: "rgba(255,255,255,0.3)" }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#333", border: "none" }}
                  labelStyle={{ color: "white" }}
                  itemStyle={{ color: "white" }}
                />
                <Bar dataKey="frequency" fill="#f97316" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-4">
          <p className="text-sm font-medium mb-2">Training Record Details</p>
          <div className="border rounded-md border-zinc-800">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-zinc-800 border-b border-zinc-800">
                  <TableHead className="text-orange-400">Date</TableHead>
                  <TableHead className="text-orange-400">Training Type</TableHead>
                  <TableHead className="text-orange-400">Duration (min)</TableHead>
                  <TableHead className="text-orange-400">Completion</TableHead>
                  <TableHead className="text-orange-400">Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trainingRecords.map((record, index) => (
                  <TableRow key={index} className="hover:bg-zinc-800 border-b border-zinc-800">
                    <TableCell>{record.date}</TableCell>
                    <TableCell>{record.type}</TableCell>
                    <TableCell>{record.duration}</TableCell>
                    <TableCell>{record.completion}</TableCell>
                    <TableCell>{record.notes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
