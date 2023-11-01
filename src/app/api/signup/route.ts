import connectMongo from '@/lib/connectDb';
import User from '@/models/User';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, username, password } = await req.json();

    // const mongo = await connectMongo();

    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return NextResponse.json(
        { message: 'User with Email Already Exists!' },
        { status: 400 },
      );
    }

    if (email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json(
        { message: 'This Email Is Not Authorized to make an account!' },
        { status: 401 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    // await mongo?.disconnect();
    return NextResponse.json(
      { message: 'User Registered!', user },
      { status: 201 },
    );
  } catch (error: Error | any) {
    return NextResponse.json(
      { message: 'Something Went Wrong. Please try again later.' },
      { status: 500 },
    );
  }
}
