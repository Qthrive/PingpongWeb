"use client"

import {
  Line,
  LineChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function HealthDataSection() {
  const calorieData = [
    { date: "2025-03-12", calories: 320 },
    { date: "2025-03-14", calories: 280 },
    { date: "2025-03-15", calories: 350 },
    { date: "2025-03-16", calories: 400 },
    { date: "2025-03-17", calories: 320 },
    { date: "2025-03-18", calories: 380 },
    { date: "2025-03-19", calories: 420 },
  ]

  const injuryData = [
    { part: "Wrist", count: 12, fill: "#f97316" },
    { part: "Shoulder", count: 8, fill: "#fb923c" },
    { part: "Knee", count: 15, fill: "#fdba74" },
    { part: "Ankle", count: 10, fill: "#ffedd5" },
    { part: "Back", count: 7, fill: "#fff7ed" },
  ]

  const healthRecords = [
    { date: "2025-03-12", duration: 45, calories: 320, heartRate: "Avg 125", fatigue: "Low", notes: "Good condition" },
    {
      date: "2025-03-14",
      duration: 30,
      calories: 280,
      heartRate: "Avg 130",
      fatigue: "Medium",
      notes: "Slight wrist discomfort",
    },
    {
      date: "2025-03-15",
      duration: 60,
      calories: 350,
      heartRate: "Avg 135",
      fatigue: "Medium",
      notes: "Normal condition",
    },
    {
      date: "2025-03-16",
      duration: 90,
      calories: 400,
      heartRate: "Avg 140",
      fatigue: "High",
      notes: "Need sufficient rest after training",
    },
    { date: "2025-03-17", duration: 45, calories: 320, heartRate: "Avg 125", fatigue: "Low", notes: "Good recovery" },
  ]

  return (
    <Card className="border-0 bg-zinc-900 text-white">
      <CardHeader className="pb-2 border-b border-zinc-800">
        <CardTitle className="text-xl text-orange-500">Health Data</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <div className="h-[200px]">
            <p className="text-sm font-medium mb-2">Calorie Consumption</p>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={calorieData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis
                  dataKey="date"
                  tick={{ fill: "white" }}
                  axisLine={{ stroke: "rgba(255,255,255,0.3)" }}
                  tickFormatter={(value) => {
                    const date = new Date(value)
                    return `${date.getMonth() + 1}/${date.getDate()}`
                  }}
                />
                <YAxis tick={{ fill: "white" }} axisLine={{ stroke: "rgba(255,255,255,0.3)" }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#333", border: "none" }}
                  labelStyle={{ color: "white" }}
                  itemStyle={{ color: "white" }}
                />
                <Line
                  type="monotone"
                  dataKey="calories"
                  name="Calories"
                  stroke="#f97316"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#f97316" }}
                  activeDot={{ r: 6, fill: "#f97316" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="h-[200px]">
            <p className="text-sm font-medium mb-2">Injury Statistics</p>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={injuryData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="part" tick={{ fill: "white" }} axisLine={{ stroke: "rgba(255,255,255,0.3)" }} />
                <YAxis tick={{ fill: "white" }} axisLine={{ stroke: "rgba(255,255,255,0.3)" }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#333", border: "none" }}
                  labelStyle={{ color: "white" }}
                  itemStyle={{ color: "white" }}
                />
                <Bar dataKey="count" name="Injury Count" radius={[4, 4, 0, 0]}>
                  {injuryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-4">
          <p className="text-sm font-medium mb-2">Health Record Details</p>
          <div className="border rounded-md border-zinc-800">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-zinc-800 border-b border-zinc-800">
                  <TableHead className="text-orange-400">Date</TableHead>
                  <TableHead className="text-orange-400">Duration (min)</TableHead>
                  <TableHead className="text-orange-400">Calories</TableHead>
                  <TableHead className="text-orange-400">Heart Rate</TableHead>
                  <TableHead className="text-orange-400">Fatigue Level</TableHead>
                  <TableHead className="text-orange-400">Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {healthRecords.map((record, index) => (
                  <TableRow key={index} className="hover:bg-zinc-800 border-b border-zinc-800">
                    <TableCell>{record.date}</TableCell>
                    <TableCell>{record.duration}</TableCell>
                    <TableCell>{record.calories}</TableCell>
                    <TableCell>{record.heartRate}</TableCell>
                    <TableCell>{record.fatigue}</TableCell>
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
