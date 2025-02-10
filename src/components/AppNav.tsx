"use client"

import { BezierIcon, HomeIcon, WingIcon } from "@channel.io/bezier-icons"
import { HStack, Icon, Text, VStack } from "@channel.io/bezier-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import classnames from "@/src/lib/classnames"

import styles from "./AppNav.module.css"

export default function AppNav() {
  return (
    <HStack className={styles.navContainer}>
      <NavItem icon={HomeIcon} label="Home" href="/" />
      <NavItem icon={WingIcon} label="Commit" href="/commit" />
    </HStack>
  )
}

function NavItem({
  icon,
  label,
  href,
}: {
  icon: BezierIcon
  label: string
  href: string
}) {
  const active = usePathname() === href

  return (
    <Link className={classnames(styles.navItem, active && styles.active)} href={href}>
      <VStack className={styles.navItemContainer} justify="center" align="center" spacing={2}>
        <Icon source={icon} size="s" color={active ? "txt-black-darkest" : "txt-black-dark"} />
        <Text typo="12" color={active ? "txt-black-darkest" : "txt-black-dark"}>{label}</Text>
      </VStack>
    </Link>
  )
}
