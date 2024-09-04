import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";

const sfPro = localFont({
  src: "../fonts/SF-Pro.ttf",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pomodoro",
  description: "A pomodoro timer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn(sfPro.className, "antialiased")}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
