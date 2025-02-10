import ContributionCalendar from "@/src/components/ContributionCalendar"
import { ContributionSummary } from "@/src/components/ContributionSummary"
import { Watermark } from "@/src/components/Watermark"

export default function Home() {
  return (
    <>
      <ContributionCalendar />
      <ContributionSummary />
      <Watermark />
    </>
  )
}
