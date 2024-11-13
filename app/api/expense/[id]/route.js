import { connectDB } from "@/lib/mongodb";
import Expense from "@/models/Expense";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    console.log("ID:", id);

    const expense = await Expense.findById(id);
    if (!expense) {
      return NextResponse.json(
        { message: "Expense not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ expense }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching expense", error: error.message },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    await Expense.findByIdAndDelete(id);
    return NextResponse.json({ message: "Income deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting income", error: error.message },
      { status: 500 },
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const { amount, category } = await request.json();

    const updatedIncome = await Expense.findByIdAndUpdate(
      id,
      { amount, category },
      { new: true },
    );

    if (!updatedIncome) {
      return NextResponse.json(
        { message: "Income not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Income updated successfully", updatedIncome },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating income", error: error.message },
      { status: 500 },
    );
  }
}
