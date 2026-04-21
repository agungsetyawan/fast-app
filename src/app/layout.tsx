import type { Metadata, Viewport } from "next";
import { Nunito_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { Providers } from "./providers";
import { SerwistProvider } from "./serwist";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Fast App",
  description: "Fast Application",
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#0089ca",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
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
        <SerwistProvider swUrl="/serwist/sw.js" reloadOnOnline={false}>
          <ThemeProvider
            attribute="data-theme"
            defaultTheme="system"
            enableSystem
          >
            <Providers>
              {children}
              <Toaster position="top-right" richColors />
            </Providers>
          </ThemeProvider>
        </SerwistProvider>
      </body>
    </html>
  );
}
