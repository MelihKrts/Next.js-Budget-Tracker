"use client";
import { useState } from "react";

import Select from "@/app/component/Select";
import InputField from "@/app/component/Input";
import Button from "@/app/component/Button";
import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export default function Home() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Education");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || amount < 1) {
      toast.error("Please enter valid amount", {
        position: "top-right",
        theme: "colored",
        autoClose: 3000,
        closeOnClick: true,
        transition: Slide,
      });
      return;
    }

    try {
      const response = await fetch("/api/expense", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Number(amount),
          category: String(category),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "An error occurred");
      }

      toast.success("Expense information has been successfully saved", {
        position: "top-right",
        theme: "colored",
        autoClose: 3000,
        closeOnClick: true,
        transition: Slide,
      });

      setAmount("");
      setCategory("Education");

      setTimeout(() => {
        window.location.reload();
      }, 3050);
    } catch (err) {
      toast.error(err.message, {
        position: "top-right",
        theme: "colored",
        autoClose: 3000,
        closeOnClick: true,
        transition: Slide,
      });
    }
  };

  return (
    <section className="w-full">
      <div className="container flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold py-4">Add Expense</h2>
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="w-full my-4">
            <label
              htmlFor="expenseCategory"
              className="font-semibold block mb-4"
            >
              Expense Category
            </label>

            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full transition duration-150 ease-in-out rounded-md outline-0 p-2 mb-4  border border-[#ced4da] focus:border-[#00b6fd] focus:shadow-custom"
            >
              <option value="Education">Education</option>
              <option value="Food costs">Food Costs</option>
              <option value="Rent">Rent</option>
              <option value="Invoice expense">Invoice Expense</option>
              <option value="Clothes expense">Clothes Expense</option>
              <option value="Credit card expense">Credit Card Expense</option>
            </Select>

            <label
              htmlFor="expenseAmount"
              className="font-semibold mt-2 mb-3 block"
            >
              Expense Amount
            </label>

            <InputField
              type="number"
              min="1"
              value={amount}
              placeholder="Enter a expense amount"
              onChange={(e) => setAmount(e.target.value)}
              required
              onInvalid={(e) =>
                e.target.setCustomValidity("Please enter a valid amount")
              }
              onInput={(e) => e.target.setCustomValidity("")}
              className="w-full transition duration-150 ease-in-out rounded-md outline-0 p-2 mb-8 border border-[#ced4da] focus:border-[#00b6fd] focus:shadow-custom"
            />

            <Button type="submit" variant="save" text="Save" />
          </div>
        </form>
        <ToastContainer />
      </div>
    </section>
  );
}
