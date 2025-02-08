import { Spinner, VStack } from "@channel.io/bezier-react"

import styles from "./loading.module.css"

export default function Loading() {
  return (
    <VStack
      align="center"
      justify="center"
      spacing={8}
      className={styles.container}
    >
      <Spinner size="l" color="bg-black-darker" />
    </VStack>
  )
}
