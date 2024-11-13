import { connectDB } from "@/lib/mongodb";
import Expense from "@/models/Expense";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();
    const { amount, category } = await request.json();

    if (!category) {
      return NextResponse.json(
        { message: "Category is required" },
        { status: 400 },
      );
    }

    const expense = await Expense.create({ amount, category });
    return NextResponse.json(
      { message: "Expense created successfully", expense },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating expense", error: error.message },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const expense = await Expense.find();
    return NextResponse.json({ expense }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching expense", error: error.message },
      { status: 500 },
    );
  }
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  try {
    await connectDB();
    await Expense.findByIdAndDelete(id);
    return NextResponse.json({
      message: "Expense deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error deleting expense",
      error: error.message,
    });
  }
}
