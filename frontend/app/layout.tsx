import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./components/NavBar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tic-Tac-Toe",
  description: "This is an accessible tic-tac-toe game for everyone!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Tic-Tac-Toe</title>
        <link rel="icon" href="/logo.svg" />
      </head>
      <body className={inter.className}>
        <main>
          <NavBar />
          {children}
        </main>
      </body>
    </html>
  );
}
