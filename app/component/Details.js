"use client";
import { useEffect, useState } from "react";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
);

export default function Details() {
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

  const [categoryData, setCategoryData] = useState({});
  const [expenseCategoryData, setExpenseCategoryData] = useState({});

  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  const [highestIncome, setHighestIncome] = useState(0);
  const [highestExpense, setHighestExpense] = useState(0);

  // Routing income page

  const handlePushIncome = () => {
    window.open("/income", "_blank");
  };

  // Routing expense page

  const handlePushExpense = () => {
    window.open("/expense", "_blank");
  };

  // Routing editIncome page

  const handlePushEditIncome = () => {
    window.open("/editIncome/id", "_blank");
  };

  const handlePushEditExpense = () => {
    window.open("/editExpense/id", "_blank");
  };

  useEffect(() => {
    const fetchIncomeData = async () => {
      try {
        const response = await fetch("/api/income");
        const data = await response.json();

        if (response.ok) {
          setIncomeData(data.incomes);

          const categoryMap = data.incomes.reduce((acc, item) => {
            acc[item.category] = (acc[item.category] || 0) + item.amount;
            return acc;
          }, {});

          setCategoryData(categoryMap);

          const highestIncomeValue =
            data.incomes.length > 0
              ? Math.max(...data.incomes.map((item) => item.amount))
              : 0;
          setHighestIncome(highestIncomeValue);

          const total = data.incomes.reduce(
            (acc, item) => acc + item.amount,
            0,
          );
          setTotalIncome(total);
        } else {
          console.error("Fetch data error:", data.message);
        }
      } catch (error) {
        console.error("API error:", error);
      }
    };

    const fetchExpenseData = async () => {
      try {
        const response = await fetch("/api/expense");
        const data = await response.json();
        if (response.ok) {
          setExpenseData(data.expense);

          const expensesCategoryMap = data.expense.reduce((acc, item) => {
            acc[item.category] = (acc[item.category] || 0) + item.amount;
            return acc;
          }, {});
          setExpenseCategoryData(expensesCategoryMap);
          const totalExp = data.expense.reduce(
            (acc, item) => acc + item.amount,
            0,
          );
          setTotalExpense(totalExp);
          const highestExpenseValue =
            data.expense.length > 0
              ? Math.max(...data.expense.map((item) => item.amount))
              : 0;
          setHighestExpense(highestExpenseValue);
        } else {
          console.log("Error", data.message);
        }
      } catch (error) {
        console.error("API error", error);
      }
    };

    fetchIncomeData();
    fetchExpenseData();
  }, []);

  const incomePieData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        data: Object.values(categoryData),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  const expensePieData = {
    labels: Object.keys(expenseCategoryData),
    datasets: [
      {
        data: Object.values(expenseCategoryData),
        backgroundColor: [
          "#FF6384",
          "#FF9F40",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  const totalBudget = totalIncome - totalExpense;
  const balanceColor =
    totalBudget > 0
      ? "text-green-500"
      : totalBudget < 0
        ? "text-red-500"
        : "text-yellow-500";

  return (
    <section className="w-full">
      <h2 className="text-center font-semibold text-2xl sm:text-lg md:text-xl lg:text-2xl px-4 py-2">
        Income & Expense State
      </h2>

      {/* Budget State Balance Tracking info */}

      <div className="container flex flex-col  gap-4 ">
        {/* Budget Category highest info */}

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className=" bg-[#F8FCFD] sm:w-full md:w-1/2 lg:w-1/2 w-1/2 rounded-md my-2 md:mx-2 lg:mx-0">
            <h2 className=" text-center font-bold px-4 text-2xl py-4 sm:text-lg md:text-xl lg:text-2xl ">
              Current State
            </h2>

            <div className="flex flex-col justify-center ">
              <p className="text-xl sm:text-md md:text-lg lg:text-xl font-semibold text-left px-4 py-2">
                Total Income Item: {Object.entries(categoryData).length}
              </p>

              <p className="text-xl sm:text-md md:text-lg lg:text-xl font-semibold text-left px-4 py-2">
                Total Expense Item: {Object.entries(expenseCategoryData).length}
              </p>

              <p className="text-xl sm:text-md md:text-lg lg:text-xl font-semibold text-left px-4 py-2">
                Highest Income: {highestIncome}
              </p>

              <p className="text-xl sm:text-md md:text-lg lg:text-xl font-semibold text-left px-4 py-2 pb-4 ">
                Highest Expense: {highestExpense}
              </p>
            </div>
          </div>

          {/* Income, Expense, Total Balance */}

          <div className="w-1/2 md:mx-2 lg:mx-0 bg-[#e3f7ff] rounded-md sm:w-full md:w-1/2 lg:w-1/2">
            <h2 className=" text-center font-bold px-4 text-2xl py-4 sm:text-lg md:text-xl lg:text-2xl ">
              Budget Balance
            </h2>

            <div className="flex flex-col justify-center ">
              <p className="text-lg sm:text-md md:text-lg lg:text-xl font-semibold text-left px-4 py-2  ">
                Balance:{" "}
                <span className={`${balanceColor} text-center `}>
                  {totalBudget}
                </span>
              </p>

              <p className="text-lg sm:text-md md:text-lg lg:text-xl font-semibold text-left px-4 py-2  ">
                Total Income:{" "}
                <span className="text-green-500">{totalIncome}</span>
              </p>

              <p className="text-lg sm:text-md md:text-lg lg:text-xl font-semibold text-left px-4 py-2  ">
                Total Expense:{" "}
                <span className="text-red-500">{totalExpense}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="w-full">
          <h2 className="text-center font-semibold text-2xl sm:text-lg md:text-xl lg:text-2xl px-4 py-2">
            Income Expense Graphics Schema
          </h2>
          <div className="flex flex-col md:flex-row  gap-4  justify-around items-center ">
            <div className="w-1/4 text-center  sm:w-6/12 md:w-1/4 lg:w-1/4">
              <h4 className="text-center font-semibold text-lg sm:text-lg md:text-lg lg:text-xl px-4 py-2">
                Income Distribution
              </h4>
              <Pie className="mt-2 mb-4 w-2/4" data={incomePieData} />
            </div>
            <div className="w-1/4 text-center  sm:w-6/12 md:w-1/4 lg:w-1/4">
              <h4 className="text-center font-semibold text-lg sm:text-lg md:text-xl lg:text-xl px-4 py-2">
                Expense Distribution
              </h4>
              <Pie className="mt-2 mb-4 w-2/4" data={expensePieData} />
            </div>
          </div>
        </div>

        <div className="w-full">
          <h2 className="text-center font-semibold text-2xl sm:text-lg md:text-xl lg:text-2xl px-4 py-2 ">
            Quick Access
          </h2>

          <div className="flex flex-wrap my-4 ">
            <div className="w-1/4 sm:w-full md:w-1/2 lg:w-1/4  mb-8 px-4 ">
              <button
                type="button"
                className="bg-[#c0e8f5] text-[#005A7D] px-4 py-2 text-center rounded-md w-full  flex-shrink-0"
                onClick={handlePushIncome}
              >
                Add Income
              </button>
            </div>
            <div className="w-1/4 sm:w-full md:w-1/2 lg:w-1/4  mb-8 px-4">
              <button
                type="button"
                className="bg-[#c0e8f5] text-[#005A7D] px-4 py-2 text-center rounded-md w-full flex-shrink-0"
                onClick={handlePushExpense}
              >
                Add Expense
              </button>
            </div>
            <div className="w-1/4 sm:w-full md:w-1/2 lg:w-1/4  mb-8 px-4">
              <button
                type="button"
                className="bg-[#c0e8f5] text-[#005A7D] px-4 py-2 text-center rounded-md w-full flex-shrink-0"
                onClick={handlePushEditIncome}
              >
                Edit Income
              </button>
            </div>
            <div className="w-1/4 sm:w-full md:w-1/2 lg:w-1/4  mb-8 px-4 ">
              <button
                type="button"
                className="bg-[#c0e8f5] text-[#005A7D] px-4 py-2 text-center rounded-md w-full flex-shrink-0"
                onClick={handlePushEditExpense}
              >
                Edit Expense
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
