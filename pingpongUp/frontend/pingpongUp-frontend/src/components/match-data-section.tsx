"use client"

import {
  Line,
  LineChart,
  Pie,
  PieChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Cell,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function MatchDataSection() {
  const scoreData = [
    { match: "Match 1", score: 11, opponentScore: 7 },
    { match: "Match 2", score: 9, opponentScore: 11 },
    { match: "Match 3", score: 11, opponentScore: 5 },
    { match: "Match 4", score: 11, opponentScore: 9 },
    { match: "Match 5", score: 7, opponentScore: 11 },
    { match: "Match 6", score: 11, opponentScore: 8 },
    { match: "Match 7", score: 11, opponentScore: 6 },
    { match: "Match 8", score: 9, opponentScore: 11 },
  ]

  const keyMetricsData = [
    { name: "Serve Points", value: 35, fill: "#f97316" },
    { name: "Return Points", value: 25, fill: "#fb923c" },
    { name: "Forehand Attack", value: 20, fill: "#fdba74" },
    { name: "Backhand Defense", value: 15, fill: "#ffedd5" },
    { name: "Other Points", value: 5, fill: "#fff7ed" },
  ]

  const matchRecords = [
    {
      date: "2025-02-21",
      opponent: "Shen Gang",
      level: "Intermediate",
      result: "Win 11-7",
      keyStats: "Serve success rate 85%",
    },
    {
      date: "2025-03-12",
      opponent: "Wang Yuan",
      level: "Advanced",
      result: "Loss 9-11",
      keyStats: "Return success rate 70%",
    },
    {
      date: "2025-03-13",
      opponent: "Li Cheng",
      level: "Beginner",
      result: "Win 11-5",
      keyStats: "Forehand attack success rate 90%",
    },
    {
      date: "2025-03-15",
      opponent: "Qiu Meng",
      level: "Intermediate",
      result: "Win 11-9",
      keyStats: "Backhand defense success rate 85%",
    },
    {
      date: "2025-04-01",
      opponent: "Qu cheng",
      level: "Advanced",
      result: "Loss 7-11",
      keyStats: "Serve success rate 75%",
    },
  ]

  return (
    <Card className="border-0 bg-zinc-900 text-white">
      <CardHeader className="pb-2 border-b border-zinc-800">
        <CardTitle className="text-xl text-orange-500">Match Data</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <div className="h-[200px]">
            <p className="text-sm font-medium mb-2">Match Score Trend</p>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={scoreData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="match" tick={{ fill: "white" }} axisLine={{ stroke: "rgba(255,255,255,0.3)" }} />
                <YAxis tick={{ fill: "white" }} axisLine={{ stroke: "rgba(255,255,255,0.3)" }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#333", border: "none" }}
                  labelStyle={{ color: "white" }}
                  itemStyle={{ color: "white" }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="score"
                  name="My Score"
                  stroke="#f97316"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#f97316" }}
                  activeDot={{ r: 6, fill: "#f97316" }}
                />
                <Line
                  type="monotone"
                  dataKey="opponentScore"
                  name="Opponent Score"
                  stroke="#a3a3a3"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#a3a3a3" }}
                  activeDot={{ r: 6, fill: "#a3a3a3" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="h-[200px]">
            <p className="text-sm font-medium mb-2">Scoring Method Distribution</p>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={keyMetricsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={70}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {keyMetricsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#333", border: "none" }}
                  labelStyle={{ color: "white" }}
                  itemStyle={{ color: "white" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-4">
          <p className="text-sm font-medium mb-2">Match Record Details</p>
          <div className="border rounded-md border-zinc-800">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-zinc-800 border-b border-zinc-800">
                  <TableHead className="text-orange-400">Date</TableHead>
                  <TableHead className="text-orange-400">Opponent</TableHead>
                  <TableHead className="text-orange-400">Opponent Level</TableHead>
                  <TableHead className="text-orange-400">Result</TableHead>
                  <TableHead className="text-orange-400">Key Stats</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {matchRecords.map((record, index) => (
                  <TableRow key={index} className="hover:bg-zinc-800 border-b border-zinc-800">
                    <TableCell>{record.date}</TableCell>
                    <TableCell>{record.opponent}</TableCell>
                    <TableCell>{record.level}</TableCell>
                    <TableCell>{record.result}</TableCell>
                    <TableCell>{record.keyStats}</TableCell>
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
