import "./globals.css";
import { Exo } from "next/font/google";
import Header from "@/app/component/Header";

const exo = Exo({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Budget Tracking",
  description: "We help you keep track of your budget",
  keywords: ["Budget", "Tracker", "Income", "Expense", "Balance"],
  authors: {
    name: "Melih Karatas",
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: [
      { url: "/ios/180.png", sizes: "180x180", type: "image/png" },
      { url: "/ios/152.png", sizes: "152x152", type: "image/png" },
      { url: "/ios/144.png", sizes: "144x144", type: "image/png" },
      { url: "/ios/120.png", sizes: "120x120", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Budget Tracking",
    startupImage: [
      {
        url: "/ios/1024.png",
        sizes: "1024x1024",
      },
    ],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: "#cbdfbd",
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="application-name" content="Budget Tracking" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#cbdfbd" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Budget Tracking" />
        <link rel="apple-touch-startup-image" href="/ios/1024.png" />
      </head>
      <body className={`${exo.className}  bg-[#cbdfbd]`}>
        <Header />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
