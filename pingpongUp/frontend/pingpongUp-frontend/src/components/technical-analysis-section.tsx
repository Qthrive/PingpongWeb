"use client"

import {
  Line,
  LineChart,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function TechnicalAnalysisSection() {
  const technicalData = [
    { date: "2025-01-15", speed: 65, power: 50, angle: 70 },
    { date: "2025-02-15", speed: 68, power: 55, angle: 72 },
    { date: "2025-03-15", speed: 72, power: 60, angle: 75 },
    { date: "2025-03-18", speed: 75, power: 65, angle: 78 },
    { date: "2025-04-02", speed: 78, power: 70, angle: 80 },
    { date: "2025-04-13", speed: 82, power: 75, angle: 83 },
  ]

  const skillData = [
    { subject: "Serve", value: 85, fullMark: 100 },
    { subject: "Return", value: 75, fullMark: 100 },
    { subject: "Forehand", value: 90, fullMark: 100 },
    { subject: "Backhand", value: 70, fullMark: 100 },
    { subject: "Defense", value: 80, fullMark: 100 },
    { subject: "Footwork", value: 65, fullMark: 100 },
  ]

  const technicalAnalysisRecords = [
    {
      date: "2025-03-21",
      technique: "Forehand Attack",
      score: 90,
      strength: "Power and Speed",
      weakness: "Angle Control",
    },
    { date: "2025-03-22", technique: "Backhand Attack", score: 75, strength: "Stability", weakness: "Lack of Power" },
    { date: "2025-03-24", technique: "Serve", score: 85, strength: "Spin Control", weakness: "Lack of Variation" },
    { date: "2025-03-30", technique: "Footwork", score: 70, strength: "Reaction Speed", weakness: "Movement Range" },
    { date: "2025-03-31", technique: "Defense", score: 80, strength: "Stability", weakness: "Return Quality" },
  ]

  return (
    <Card className="border-0 bg-zinc-900 text-white">
      <CardHeader className="pb-2 border-b border-zinc-800">
        <CardTitle className="text-xl text-orange-500">Technical Analysis</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <div className="h-[200px]">
            <p className="text-sm font-medium mb-2">Technical Metrics Trend</p>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={technicalData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis
                  dataKey="date"
                  tick={{ fill: "white" }}
                  axisLine={{ stroke: "rgba(255,255,255,0.3)" }}
                  tickFormatter={(value) => {
                    const date = new Date(value)
                    return `${date.getMonth() + 1}/23`
                  }}
                />
                <YAxis tick={{ fill: "white" }} axisLine={{ stroke: "rgba(255,255,255,0.3)" }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#333", border: "none" }}
                  labelStyle={{ color: "white" }}
                  itemStyle={{ color: "white" }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="speed"
                  name="Speed"
                  stroke="#f97316"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#f97316" }}
                  activeDot={{ r: 6, fill: "#f97316" }}
                />
                <Line
                  type="monotone"
                  dataKey="power"
                  name="Power"
                  stroke="#fb923c"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#fb923c" }}
                  activeDot={{ r: 6, fill: "#fb923c" }}
                />
                <Line
                  type="monotone"
                  dataKey="angle"
                  name="Angle"
                  stroke="#fdba74"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#fdba74" }}
                  activeDot={{ r: 6, fill: "#fdba74" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="h-[200px]">
            <p className="text-sm font-medium mb-2">Skills Radar Chart</p>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillData}>
                <PolarGrid stroke="rgba(255,255,255,0.3)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "white" }} />
                {/* 通过将 tick 设置为 false 隐藏坐标数字 */}
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                <Radar name="Skill Rating" dataKey="value" stroke="#f97316" fill="#f97316" fillOpacity={0.6} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#333", border: "none" }}
                  labelStyle={{ color: "white" }}
                  itemStyle={{ color: "white" }}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-4">
          <p className="text-sm font-medium mb-2">Technical Analysis Details</p>
          <div className="border rounded-md border-zinc-800">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-zinc-800 border-b border-zinc-800">
                  <TableHead className="text-orange-400">Date</TableHead>
                  <TableHead className="text-orange-400">Technique</TableHead>
                  <TableHead className="text-orange-400">Score</TableHead>
                  <TableHead className="text-orange-400">Strength</TableHead>
                  <TableHead className="text-orange-400">Weakness</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {technicalAnalysisRecords.map((record, index) => (
                  <TableRow key={index} className="hover:bg-zinc-800 border-b border-zinc-800">
                    <TableCell>{record.date}</TableCell>
                    <TableCell>{record.technique}</TableCell>
                    <TableCell>{record.score}</TableCell>
                    <TableCell>{record.strength}</TableCell>
                    <TableCell>{record.weakness}</TableCell>
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
