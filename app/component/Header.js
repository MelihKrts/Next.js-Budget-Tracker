"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const navigationPath = () => {
    if (pathname.includes("/editExpenseForm/")) {
      return "/editExpense/id";
    }

    if (pathname.includes("/editIncomeForm/")) {
      return "/editIncome/id";
    }

    if (pathname === "/expense" || pathname === "/income") {
      return "/";
    }
    return "/";
  };

  const buttonText = () => {
    if (
      pathname.includes("/editExpenseForm/") ||
      pathname.includes("/editExpense/") ||
      pathname.includes("/editIncomeForm/") ||
      pathname.includes("/editIncome/")
    ) {
      return "Back";
    }

    return "Home";
  };

  return (
    <header className="w-full flex  z-10  fixed bg-teal-400  h-14">
      <nav className="container flex items-center justify-between">
        <h4 className="text-xl sm:text-md sm:mx-4 lg:mx-0 md:text-lg lg:text-xl">
          Budget Tracking
        </h4>
        <Link href={navigationPath()}>
          <button
            type="button"
            className="bg-blue-500 sm:mx-4 lg:mx-0 text-white py-2 px-4 rounded-md"
          >
            {buttonText()}
          </button>
        </Link>
      </nav>
    </header>
  );
}
