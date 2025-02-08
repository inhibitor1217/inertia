"use client"

import { AppProvider } from "@channel.io/bezier-react"

export default function Provider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppProvider>
      {children}
    </AppProvider>
  )
}
