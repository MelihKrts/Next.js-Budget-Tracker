import { connectDB } from "@/lib/mongodb";
import Income from "@/models/Income";
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

    const income = await Income.create({ amount, category });

    return NextResponse.json(
      { message: "Income created successfully", income },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating income", error: error.message },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const incomes = await Income.find();
    return NextResponse.json({ incomes }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching incomes", error: error.message },
      { status: 500 },
    );
  }
}
