import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // Import jwt
import { findUserByEmail } from "../../../../prisma/helpers/post";

const JWT_SECRET = process.env.JWT_SECRET! || 'your_jwt_secret'; // Use type assertion

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    // Fetch the user from the database using the email
    const user: any = await findUserByEmail(email);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 } // Unauthorized
      );
    }
    
    // Compare the hashed password with the password provided
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    
    if (!isMatch) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 } // Unauthorized
      );
    }
    
    // Create a JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email }, // Payload
      JWT_SECRET, // Secret
      { expiresIn: '1h' } // Token expiration time
    );
    
    // Instead of setting a cookie, return the token in the JSON response
    return NextResponse.json(
      { message: 'Login successful!', token }, // Include the token in the response
      { status: 200 } // OK
    );
  } catch (error) {
    console.error('Error logging in user:', error);
    return NextResponse.json(
      { error: 'An error occurred during login.' },
      { status: 500 } // Internal Server Error
    );
  }
}
