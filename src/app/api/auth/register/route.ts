import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { hashPassword, generateToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    await dbConnect();
    
    const body = await req.json();
    const { username, email, password, firstName, lastName } = body;

    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email or username already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      name: `${firstName || ''} ${lastName || ''}`.trim(),
      image: `https://ui-avatars.com/api/?name=${username}&background=random`,
      role: "user"
    });

    const token = generateToken({ 
      id: newUser._id, 
      email: newUser.email,
      role: newUser.role 
    });

    return NextResponse.json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role
      },
      token
    }, { status: 201 });

  } catch (error: any) {
    console.error("Registration Error:", error);
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
