import { BezierIcon, HomeIcon, SettingsIcon, WingIcon } from "@channel.io/bezier-icons"
import { HStack, Icon, Text, VStack } from "@channel.io/bezier-react"
import Link from "next/link"

import styles from "./AppNav.module.css"

export default function AppNav() {
  return (
    <HStack className={styles.navContainer}>
      <Link className={styles.navItem} href="/">
        <NavItem icon={HomeIcon} label="Home" />
      </Link>
      <Link className={styles.navItem} href="/commit">
        <NavItem icon={WingIcon} label="Commit" />
      </Link>
      <Link className={styles.navItem} href="/settings">
        <NavItem icon={SettingsIcon} label="Settings" />
      </Link>
    </HStack>
  )
}

function NavItem({
  icon,
  label,
}: {
  icon: BezierIcon
  label: string
}) {
  return (
    <VStack className={styles.navItemContainer} justify="center" align="center" spacing={2}>
      <Icon source={icon} size="m" color="txt-black-dark" />
      <Text typo="14" color="txt-black-dark">{label}</Text>
    </VStack>
  )
}
