import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import LoadingProvider from "./components/LoadingProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chaedir | Full Stack Developer",
  description: "Portfolio of Chaedir, a full stack web developer specializing in modern web technologies.",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col`}>
        <ThemeProvider>
          <LoadingProvider>
            <Navigation />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
