'use client'

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from 'convex/react'

import { Toaster } from "./components/ui/toaster";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider publishableKey='pk_test_aHVtYW5lLXdhbGxhYnktNS5jbGVyay5hY2NvdW50cy5kZXYk'>
          <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
            {children}
            <Toaster />
          </ConvexProviderWithClerk>
        </ClerkProvider>
      </body>
    </html>
  );
}
