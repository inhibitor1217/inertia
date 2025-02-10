"use client"

import { HStack, Text, VStack } from "@channel.io/bezier-react"
import { useLiveQuery } from "dexie-react-hooks"
import React from "react"

import db, { Commit, Repository } from "@/src/db/schema"

import Card from "./Card"
import styles from "./ContributionSummary.module.css"

export function ContributionSummary() {
  const [thisMonth] = React.useState(() => {
    const today = new Date()
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1)
    return monthStart
  })

  return (
    <div className={styles.wrap}>
      <Card>
        <VStack className={styles.content} spacing={16}>
          <Text as="h2" typo="14">
            Your journey
          </Text>

          <ContributionMonthSummary monthStart={thisMonth} />
        </VStack>
      </Card>
    </div>
  )
}

function ContributionMonthSummary({
  monthStart,
}: {
  monthStart: Date
}) {
  const commits = useLiveQuery<Commit[]>(() => {
    const monthEnd = new Date(monthStart)
    monthEnd.setMonth(monthStart.getMonth() + 1)
    return db.commits
      .where("createdAt")
      .between(monthStart, monthEnd)
      .toArray()
  }, [monthStart])

  const contributionsByRepository = React.useMemo(() => {
    const aggregated = new Map<number, number>()
    commits?.forEach(commit => {
      aggregated.set(commit.repositoryId, (aggregated.get(commit.repositoryId) ?? 0) + commit.contribution)
    })
    return Array.from(aggregated.entries())
  }, [commits])

  return (
    <VStack spacing={4}>
      <Text typo="13" bold marginBottom={8}>
        {monthStart.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
      </Text>

      {contributionsByRepository.map(([repositoryId, contribution]) => (
        <RepositorySummaryItem key={repositoryId} repositoryId={repositoryId} contribution={contribution} />
      ))}

      {contributionsByRepository.length === 0 && <EmptySummary />}
    </VStack>
  )
}

function RepositorySummaryItem({
  repositoryId,
  contribution,
}: {
  repositoryId: number
  contribution: number
}) {
  const repository = useLiveQuery<Repository | undefined>(() => {
    return db.repositories.get(repositoryId)
  }, [repositoryId])

  return (
    <HStack spacing={8} paddingLeft={8}>
      <Text typo="13" color="txt-black-darkest">{repository?.name}</Text>
      <Text typo="12" color="txt-black-darker">{contribution} {contribution === 1 ? "commit" : "commits"}</Text>
    </HStack>
  )
}

function EmptySummary() {
  return (
    <Text typo="13" color="txt-black-darker" align="center">
      No contributions yet
    </Text>
  )
}
