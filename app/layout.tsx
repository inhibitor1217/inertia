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
