import { Text } from "@channel.io/bezier-react"
import Link from "next/link"

import styles from "./AppHeader.module.css"

export default function AppHeader() {
  return (
    <div className={styles.container}>
      <Link href="/" className={styles.brand}>
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
