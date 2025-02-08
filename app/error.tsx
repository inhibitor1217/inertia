"use client"

import { Button, Text, VStack } from "@channel.io/bezier-react"

import styles from "./error.module.css"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <VStack
      align="center"
      justify="center"
      spacing={8}
      className={styles.container}
    >
      <Text as="h1" typo="22" bold>
        Oops, something went wrong
      </Text>
      <Text as="p" typo="15" color="txt-black-dark">
        {error.message || "An unexpected error occurred"}
      </Text>
      <Button onClick={reset} size="l" text="Try again" />
    </VStack>
  )
}
