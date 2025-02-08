import { Text } from "@channel.io/bezier-react"
import Image from "next/image"
import Link from "next/link"

import styles from "./AppHeader.module.css"

export default function AppHeader() {
  return (
    <div className={styles.container}>
      <Link href="/" className={styles.brand}>
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
      </Link>
    </div>
  )
}
