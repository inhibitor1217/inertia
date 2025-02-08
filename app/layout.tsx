import type { Metadata } from "next";
import Provider from "./provider";

import "@channel.io/bezier-react/styles.css";
import "./global.css";

export const metadata: Metadata = {
  title: "Inertia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Inertia" />
        <link rel="manifest" href="/site.webmanifest" />
        <link
          rel="stylesheet"
          href="https://cf.channel.io/asset/font/Inter/inter.css"
        />
      </head>
      <body>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  )
}
