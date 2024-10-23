import { NextRequest, NextResponse } from "next/server";
import { createUser, findUserByEmail } from "../../../../prisma/helpers/post";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();
    
    // Check if the user already exists
    const existingUser = await findUserByEmail(email);
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists.' },
        { status: 409 } // Conflict
      );
    }
    
    // Hash the password with BCrypt.
    const passwordHash = await bcrypt.hash(password, 12);
    
    // Create the new user.
    const user = await createUser(name, email, passwordHash);
    
    return NextResponse.json(
      { message: 'User registered successfully!', userId: user.id },
      { status: 201 } // User is created!.
    );
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json(
      { error: 'An error occurred while registering the user.' },
      { status: 500 }
    );
  }
}