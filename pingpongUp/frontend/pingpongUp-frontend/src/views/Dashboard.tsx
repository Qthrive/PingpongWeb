"use client"

import { SectionCards } from "@/components/section-cards"
import { TrainingDataSection } from "@/components/training-data-section"
import { MatchDataSection } from "@/components/match-data-section"
import { TechnicalAnalysisSection } from "@/components/technical-analysis-section"
import { HealthDataSection } from "@/components/health-data-section"

export function Dashboard() {
  return (
    <div className="min-h-screen bg-black-700 p-4 md:p-6">
      <h1 className="text-1xl md:text-1xl font-bold text-orange-700 mb-6">PingpongUp DashBoard</h1>

      <div className="flex flex-col gap-6">
        <SectionCards />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TrainingDataSection />
          <MatchDataSection />
          <TechnicalAnalysisSection />
          <HealthDataSection />
        </div>
      </div>
    </div>
  )
}
