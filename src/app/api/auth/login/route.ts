import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { verifyPassword, generateToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Missing email or password" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !user.password) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isValid = await verifyPassword(password, user.password);

    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = generateToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });

    return NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          image: user.image,
        },
        token,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
