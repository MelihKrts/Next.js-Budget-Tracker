"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const getPageTitle = (pathname) => {
  const segments = pathname.split("/");
  const id = segments[segments.length - 1];

  if (pathname.includes("/editExpenseForm/")) return `Edit Expense `;
  if (pathname.includes("/editExpense/")) return `Edit Expense `;
  if (pathname.includes("/editIncomeForm/")) return `Edit Income `;
  if (pathname.includes("/editIncome/")) return `Edit Income `;
  if (pathname === "/expense") return "Add Expenses";
  if (pathname === "/income") return "Add Incomes";
  return "Budget Tracking";
};

export default function Template({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    document.title = `${getPageTitle(pathname)} `;
  }, [pathname]);

  return <div>{children}</div>;
}
