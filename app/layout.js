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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${exo.className}  bg-[#cbdfbd]`}>
        <Header />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
