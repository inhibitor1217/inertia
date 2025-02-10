"use client"

import { HexahedronFilledIcon, HexahedronIcon } from "@channel.io/bezier-icons"
import { Button, ButtonGroup, ListItem, Select, SelectRef, Text, VStack } from "@channel.io/bezier-react"
import { useLiveQuery } from "dexie-react-hooks"
import React from "react"

import db, { Repository } from "@/src/db/schema"

import Card from "./Card"
import styles from "./CommitForm.module.css"

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
          <VStack>
            {/* TODO display speed dial for today's commit */}
            <CommitButtonForm />
          </VStack>
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

function CommitButtonForm() {
  const [amount, setAmount] = React.useState(0)

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

      <Button colorVariant="green" styleVariant="primary" text="Commit" />
    </VStack>
  )
}
