"use client";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const handleAddIncome = () => {
    router.push("/income");
  };
  const handleAddExpense = () => {
    router.push("/expense");
  };

  return (
    <div className="w-full">
      <div className="container flex flex-col">
        <div onClick={handleAddIncome}>Add Income</div>
        <div onClick={handleAddExpense}>Add Expense</div>
      </div>
    </div>
  );
}
