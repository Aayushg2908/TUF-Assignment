import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FlashCard",
  description: "A Flashcard app built using Nextjs and Prisma.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={`${inter.className} dark`}>
          <NextTopLoader color="#ffffff" />
          <Toaster richColors />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
