import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const viewport: Viewport = {
  themeColor: "#0A0E14",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://hasbi.dev"),
  title: {
    default: "Hasbi As Shiddiq — Informatics Student · AI & Software",
    template: "%s | Hasbi As Shiddiq",
  },
  description:
    "Informatics Engineering student exploring AI, software development, and modern web systems. Building intelligent applications, robust algorithms, and clean digital experiences.",
  keywords: [
    "Hasbi As Shiddiq",
    "Informatics Engineering",
    "Software Development",
    "Artificial Intelligence",
    "Web Developer Portfolio",
  ],
  authors: [{ name: "Hasbi As Shiddiq" }],
  creator: "Hasbi As Shiddiq",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Hasbi As Shiddiq — Informatics Student · AI & Software",
    description:
      "Informatics Engineering student exploring AI, software development, and modern web systems. Building intelligent applications, robust algorithms, and clean digital experiences.",
    siteName: "Hasbi As Shiddiq Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Hasbi As Shiddiq — Informatics Student · AI & Software",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hasbi As Shiddiq — Informatics Student · AI & Software",
    description:
      "Informatics Engineering student exploring AI, software development, and modern web systems. Building intelligent applications, robust algorithms, and clean digital experiences.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/icon.svg",
  },
};

import CustomCursor from "@/components/ui/CustomCursor";
import { ThemeProvider } from "@/context/ThemeContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem("theme");
                  var theme = saved ? saved : "dark";
                  document.documentElement.setAttribute("data-theme", theme);
                } catch (e) {
                  document.documentElement.setAttribute("data-theme", "dark");
                }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col relative">
        <ThemeProvider>
          <div className="page-vignette" aria-hidden="true" />
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
