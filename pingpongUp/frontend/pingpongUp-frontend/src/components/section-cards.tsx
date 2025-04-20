"use client"

import { Activity, Calendar, Medal, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function SectionCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border-0 bg-zinc-900 text-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">UP Days</CardTitle>
          <Users className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">17</div>
          <p className="text-xs text-orange-400">+12% from last month</p>
        </CardContent>
      </Card>

      <Card className="border-0 bg-zinc-900 text-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Training Hours</CardTitle>
          <Activity className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2,34 hours</div>
          <p className="text-xs text-orange-400">+5.2% from last month</p>
        </CardContent>
      </Card>

      <Card className="border-0 bg-zinc-900 text-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Match Count</CardTitle>
          <Medal className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">22</div>
          <p className="text-xs text-orange-400">+2.1% from last month</p>
        </CardContent>
      </Card>

      <Card className="border-0 bg-zinc-900 text-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Consecutive check-ins</CardTitle>
          <Calendar className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">112</div>
          <p className="text-xs text-orange-400">UpUp!</p>
        </CardContent>
      </Card>
    </div>
  )
}
