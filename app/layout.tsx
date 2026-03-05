import type { Metadata, Viewport } from "next";
import { Nunito_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { SerwistProvider } from "./serwist";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export const viewport: Viewport = {
  themeColor: "#1976d2",
};

const nunitoSans = Nunito_Sans({
  variable: "--font-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${nunitoSans.className} antialiased`}>
        <SerwistProvider swUrl="/serwist/sw.js">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </SerwistProvider>
      </body>
    </html>
  );
}
