import { Text, VStack } from "@channel.io/bezier-react"

import styles from "./Watermark.module.css"

export function Watermark() {
  return (
    <VStack className={styles.container} align="center" justify="center" spacing={8}>
      <Text typo="22" bold color="txt-black-dark">
        Inertia
      </Text>

      <Text typo="14" color="txt-black-dark">
        Keep moving things moving
      </Text>
    </VStack>
  )
}
