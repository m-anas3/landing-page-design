import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SoluDrive — Concept Engineering & Food Packaging Machine Building",
  description: "Custom food packaging machine building from concept engineering to commissioning. High-performance packaging solutions for the global food industry.",
  keywords: ["SoluDrive", "Food Packaging", "Machine Building", "Concept Engineering", "Packaging Machines", "VFFS", "Flow Wrap", "Industry 4.0"],
  authors: [{ name: "SoluDrive" }],
  icons: {
    icon: "/images/logo.png",
  },
  openGraph: {
    title: "SoluDrive — Concept Engineering & Food Packaging Machine Building",
    description: "Custom food packaging machines designed, built, and commissioned for the global food industry.",
    siteName: "SoluDrive",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SoluDrive — Food Packaging Machine Building",
    description: "Concept engineering and custom packaging machines for the food industry.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
