import { Text, VStack } from "@channel.io/bezier-react"
import Link from "next/link"

import styles from "./not-found.module.css"

export default function NotFound() {
  return (
    <VStack
      align="center"
      justify="center"
      spacing={8}
      className={styles.container}
    >
      <Text as="h1" typo="30" bold>
        404
      </Text>
      <Text as="p" typo="15" color="txt-black-dark">
        Page not found
      </Text>
      <Link href="/" className={styles.link}>
        <Text typo="13" color="bgtxt-teal-normal">
          Return Home
        </Text>
      </Link>
    </VStack>
  )
}
