"use client"

import { Button, HStack, Icon, Overlay, Text, VStack } from "@channel.io/bezier-react";
import React from "react";

import { useMainElement } from "@/src/layout/Main";

import styles from "./InstallAppPrompt.module.css"
import Image from "next/image";
import { CancelIcon } from "@channel.io/bezier-icons";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
}

export default function InstallAppPrompt() {
  const main = useMainElement()

  const [show, setShow] = React.useState(false)
  const [deferredPrompt, setDeferredPrompt] = React.useState<BeforeInstallPromptEvent | null>(null)

  React.useEffect(function listenToInstallPromptEvent() {
    const listener = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setShow(true)
    }

    window.addEventListener("beforeinstallprompt", listener)

    return () => {
      window.removeEventListener("beforeinstallprompt", listener)
    }
  }, [])

  if (!main) {
    return null
  }

  if (!show) {
    return null
  }

  return (
    <Overlay
      className={styles.overlay}
      show={show}
      container={main}
      target={main}
      position="top-center"
      marginY={-64}
      enableClickOutside
      withTransition
    >
      <HStack
        className={styles.card}
        align="center"
        spacing={8}
      >
        <Image
          src="/favicon.svg"
          alt="Inertia logo"
          width={36}
          height={36}
        />
        <VStack spacing={2}>
          <Text typo="16" bold>Install Inertia</Text>
          <Text typo="14" color="txt-black-dark">
            Add Inertia to home screen.
          </Text>
        </VStack>
        <Button
          className={styles.ctaButton}
          colorVariant="green"
          text="Install"
          onClick={() => {
            deferredPrompt?.prompt()
            setShow(false)
          }}
        />
        <Button
          className={styles.closeButton}
          size="xs"
          colorVariant="monochrome-light"
          styleVariant="floating-alt"
          leftContent={<Icon size="xxs" source={CancelIcon} />}
          onClick={() => setShow(false)}
        />
      </HStack>
    </Overlay>
  )
}
