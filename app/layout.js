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
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={`${exo.className}  bg-[#cbdfbd]`}>
        <Header />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
