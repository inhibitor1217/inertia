import styles from "./Main.module.css"

export interface MainProps {
  children?: React.ReactNode
}

export default function Main({
  children,
}: MainProps) {
  return (
    <main className={styles.container}>
      {children}
    </main>
  )
}
