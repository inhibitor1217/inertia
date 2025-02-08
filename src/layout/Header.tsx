import styles from "./Header.module.css"

export interface HeaderProps {
  children?: React.ReactNode
}

export default function Header({
  children,
}: HeaderProps) {
  return (
    <header className={styles.container}>
      {children}
    </header>
  )
}
