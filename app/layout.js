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
    apple: [{ url: "/ios/180.png", sizes: "180x180", type: "image/png" }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Budget Tracking",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
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
      </head>
      <body className={`${exo.className}  bg-[#cbdfbd]`}>
        <Header />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
