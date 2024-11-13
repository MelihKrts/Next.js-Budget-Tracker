"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Select from "@/app/component/Select";
import InputField from "@/app/component/Input";
import Button from "@/app/component/Button";

export default function EditExpenseForm({ params }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const router = useRouter();

  const categories = [
    "Education",
    "Food costs",
    "Rent",
    "Invoice expense",
    "Clothes expense",
    "Credit card expense",
  ];

  const unwrappedParams = React.use(params);
  const { id } = unwrappedParams;

  useEffect(() => {
    async function fetchExpense() {
      try {
        let res = await fetch(`/api/expense/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch expense data");
        }
        let { expense } = await res.json();
        setAmount(expense.amount);
        setCategory(expense.category);
      } catch (error) {
        console.error("Error fetching expense:", error);
        toast.error("Failed to load expense data", {
          position: "top-right",
          theme: "colored",
          autoClose: 3000,
          closeOnClick: true,
          transition: Slide,
        });
      }
    }

    fetchExpense();
  }, [id]);

  async function handleUpdate(e) {
    e.preventDefault();
    await fetch(`/api/expense/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, category }),
    });

    if (!amount || amount < 1) {
      toast.error("Please enter valid amount", {
        position: "top-right",
        theme: "colored",
        autoClose: 3000,
        closeOnClick: true,
        transition: Slide,
      });
    }

    toast.success(
      "Data has been successfully updated. You are redirecting to the edit page",
      {
        position: "top-right",
        theme: "colored",
        autoClose: 2000,
        closeOnClick: true,
        transition: Slide,
      },
    );

    setTimeout(() => {
      router.push("/editExpense/id");
    }, 2500);
  }

  return (
    <section className="w-full">
      <div className="container flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold text-center py-4 ">
          Change Category / Amount
        </h2>

        <form
          onSubmit={handleUpdate}
          className="w-full max-w-md flex flex-col  justify-center"
        >
          <label htmlFor="Category" className="font-semibold block mb-4">
            Category
          </label>

          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full transition duration-150 ease-in-out rounded-md outline-0 p-2 mb-4  border border-[#ced4da] focus:border-[#00b6fd] focus:shadow-custom"
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Select>

          <label htmlFor="Amount" className="font-semibold mt-2 mb-3 block">
            Amount
          </label>

          <InputField
            type="number"
            min="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            onInvalid={(e) =>
              e.target.setCustomValidity("Please enter a valid amount")
            }
            onInput={(e) => e.target.setCustomValidity("")}
            className="w-full transition duration-150 ease-in-out rounded-md outline-0 p-2 mb-8 border border-[#ced4da] focus:border-[#00b6fd] focus:shadow-custom"
          />

          <Button type="submit" variant="save" text="Save" />
        </form>
        <ToastContainer />
      </div>
    </section>
  );
}
