"use client"

import React from "react"

import styles from "./Main.module.css"

export interface MainProps {
  Overlay?: React.ReactNode
  children?: React.ReactNode
}

export const MainElementContext = React.createContext<HTMLElement | null>(null)

export default function Main({
  Overlay,
  children,
}: MainProps) {
  const [mainElement, setMainElement] = React.useState<HTMLElement | null>(null)

  return (
    <MainElementContext.Provider value={mainElement}>
      <main className={styles.container} ref={setMainElement}>
        <div className={styles.scrollContainer}>
          <div className={styles.scrollContent}>
            {children}
          </div>
        </div>
        {Overlay}
      </main>
    </MainElementContext.Provider>
  )
}

export function useMainElement(): HTMLElement | null {
  return React.useContext(MainElementContext)
}
