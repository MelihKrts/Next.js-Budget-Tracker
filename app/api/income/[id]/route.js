import { connectDB } from "@/lib/mongodb";
import Income from "@/models/Income";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    console.log("ID:", id);

    const income = await Income.findById(id);
    if (!income) {
      return NextResponse.json(
        { message: "Income not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ income }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching income", error: error.message },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    await Income.findByIdAndDelete(id);
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

    const updatedIncome = await Income.findByIdAndUpdate(
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
