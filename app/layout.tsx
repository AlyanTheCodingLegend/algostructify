import type { Metadata } from "next";
import "./globals.css";
import ToastProvider from "./_components/ToastProvider";

export const metadata: Metadata = {
  title: "AlgoStructify",
  description: "Data Structures and Algorithms Visualizer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
