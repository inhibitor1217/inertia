"use client"

import { HexahedronFilledIcon, HexahedronIcon, TrashIcon } from "@channel.io/bezier-icons"
import { Button, ButtonGroup, ListItem, Select, SelectRef, Text, VStack } from "@channel.io/bezier-react"
import { useLiveQuery } from "dexie-react-hooks"
import React from "react"

import db, { Repository } from "@/src/db/schema"

import Card from "./Card"
import styles from "./CommitForm.module.css"
import { Gauge } from "./Gauge"

export default function CommitForm() {
  const repositories = useLiveQuery<Repository[]>(() => db.repositories.toArray())
  const [selectedRepositoryId, setSelectedRepositoryId] = React.useState<number | null>(null)

  React.useEffect(function initializeRepositories() {
    if (!repositories) return
    if (repositories.length > 0) {
      setSelectedRepositoryId(repositories[0].id)
      return
    }

    // create default repository: "workout"
    db.repositories.add({
      name: "workout",
      createdAt: new Date(),
    })

    // create default repository: "weekend walk"
    db.repositories.add({
      name: "weekend-walk",
      createdAt: new Date(),
    })

    // create default repository: "wake up alarm"
    db.repositories.add({
      name: "wake-up-alarm",
      createdAt: new Date(),
    })
  }, [repositories])

  return (
    <div className={styles.wrap}>
      <VStack spacing={8}>
        <RepositorySelector
          repositories={repositories}
          selectedRepositoryId={selectedRepositoryId}
          onSelectRepository={setSelectedRepositoryId}
        />

        <Card>
          <TodayContributionSpeedDial selectedRepositoryId={selectedRepositoryId} />
        </Card>

        <Card>
          <CommitButtonForm selectedRepositoryId={selectedRepositoryId} />
        </Card>
      </VStack>
    </div>
  )
}

function RepositorySelector({
  repositories,
  selectedRepositoryId,
  onSelectRepository,
}: {
  repositories: Repository[] | undefined
  selectedRepositoryId: number | null
  onSelectRepository: (repositoryId: number) => void
}) {
  const selectedRepository = useLiveQuery<Repository | undefined>(() => {
    if (!selectedRepositoryId) return undefined
    return db.repositories.get(selectedRepositoryId)
  }, [selectedRepositoryId])

  const selectRef = React.useRef<SelectRef>(null)

  return (
    <Select
      ref={selectRef}
      className={styles.repositorySelect}
      leftContent={HexahedronFilledIcon}
      placeholder="Select repository"
      text={selectedRepository?.name}
    >
      <div className={styles.repositorySelectDropdown}>
        {repositories?.map(repository => (
          <ListItem
            key={repository.id}
            leftContent={HexahedronIcon}
            content={repository.name}
            active={repository.id === selectedRepositoryId}
            onClick={() => {
              onSelectRepository(repository.id)
              selectRef.current?.handleHideDropdown()
            }}
          />
        ))}
      </div>
    </Select>
  )
}

function TodayContributionSpeedDial({
  selectedRepositoryId,
}: {
  selectedRepositoryId: number | null
}) {
  const todayContributions = useLiveQuery<number>(() => {
    if (!selectedRepositoryId) return 0
    const today = new Date().toISOString().split("T")[0]
    return db.commits
      .where("repositoryId")
      .equals(selectedRepositoryId)
      .and(commit => commit.createdAt.toISOString().split("T")[0] === today)
      .toArray()
      .then(commits => commits.reduce((acc, commit) => acc + commit.contribution, 0))
  }, [selectedRepositoryId])

  return (
    <VStack className={styles.todayContributionContainer} align="center" justify="center">
      <Text as="h2" className={styles.todayContribution} bold>
        {todayContributions}
      </Text>

      <Text typo="16">
        Today&apos;s contribution
      </Text>

      <Gauge value={todayContributions ?? 0} size={320} className={styles.todayContributionGauge} />
    </VStack>
  )
}

function CommitButtonForm({
  selectedRepositoryId,
}: {
  selectedRepositoryId: number | null
}) {
  const [amount, setAmount] = React.useState(0)

  const commit = async () => {
    if (!selectedRepositoryId) return

    await db.commits.add({
      repositoryId: selectedRepositoryId,
      createdAt: new Date(),
      contribution: amount,
    })

    setAmount(0)
  }

  const resetToday = async () => {
    if (!selectedRepositoryId) return

    const today = new Date().toISOString().split("T")[0]
    await db.commits
      .where("repositoryId")
      .equals(selectedRepositoryId)
      .and(commit => commit.createdAt.toISOString().split("T")[0] === today)
      .delete()
  }

  return (
    <VStack align="stretch" spacing={8}>
      <Text as="h2" typo="16" className={styles.commitAmount}>
        Add <b>{amount}</b> commits for today
      </Text>

      <ButtonGroup>
        <Button className={styles.commitButton} colorVariant="green" styleVariant="secondary" text="-1" onClick={() => setAmount(x => x - 1)} />
        <Button className={styles.commitButton} colorVariant="green" styleVariant="secondary" text="0" onClick={() => setAmount(0)} />
        <Button className={styles.commitButton} colorVariant="green" styleVariant="secondary" text="+1" onClick={() => setAmount(x => x + 1)} />
        <Button className={styles.commitButton} colorVariant="green" styleVariant="secondary" text="+5" onClick={() => setAmount(x => x + 5)} />
        <Button className={styles.commitButton} colorVariant="green" styleVariant="secondary" text="+10" onClick={() => setAmount(x => x + 10)} />
      </ButtonGroup>

      <Button colorVariant="green" styleVariant="primary" text="Commit" onClick={commit} />

      <Button className={styles.resetButton} colorVariant="monochrome" styleVariant="tertiary" leftContent={TrashIcon} size="xs" text="Reset today" onClick={resetToday} />
    </VStack>
  )
}
