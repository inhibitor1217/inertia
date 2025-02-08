import { HStack, Text } from "@channel.io/bezier-react"
import Image from "next/image"
import Link from "next/link"

import styles from "./AppHeader.module.css"

export default function AppHeader() {
  return (
    <HStack
      align="center"
      className={styles.container}>
      <Link href="/" className={styles.brand}>
        <HStack align="center" spacing={8}>
          <Image
            src="/favicon.svg"
            alt="Inertia logo"
            width={32}
            height={32}
            className={styles.logo}
        />
          <Text
            as="h1"
            typo="22"
            color="txt-black-darkest"
            bold
          >
            Inertia
          </Text>
        </HStack>
      </Link>
    </HStack>
  )
}
