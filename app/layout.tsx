import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Link Shortener - Simplify Your URLs",
  description:
    "Create short, memorable links in seconds. Track clicks, manage your links, and share with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body className="antialiased">
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
