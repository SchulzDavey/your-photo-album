import prisma from '@/prisma/client';
import { registerSchema } from '@/src/app/schemas/registerSchema';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest, response: NextResponse) {
  const body = await request.json();
  const validation = registerSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { message: 'All fields are required' },
      { status: 400 }
    );
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (existingUser) {
    return NextResponse.json(
      { message: 'User already exists' },
      { status: 409 }
    );
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: hashedPassword,
    },
  });

  return NextResponse.json(user, { status: 200 });
}
