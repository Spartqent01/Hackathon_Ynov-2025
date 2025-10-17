import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { verifyJwtAndAuthorize } from "@/lib/auth";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const user = await prisma.user.findUnique({
      where: { user_id: id }, // use your primary key field name, e.g., user_id
      select: {
        user_id: true,
        name: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Fetch user error:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const deletedUser = await prisma.user.delete({
      where: { user_id: id },
    });

    return NextResponse.json({ message: `User ${id} deleted successfully.` });
  } catch (error) {
    console.error("Delete user error:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}


export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = verifyJwtAndAuthorize(request, ["ADMIN", "USER"]);
  if (auth instanceof NextResponse) return auth;

  const { user } = auth;
  const { id } = params;

  // non-admins can only update themselves
  if (user.role !== "ADMIN" && user.userId !== id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const data = await request.json();

    // Only admins can update role
    const updateData: {
      name?: string;
      username?: string;
      email?: string;
      role?: string;
    } = {};
    if (typeof data.name === "string") updateData.name = data.name;
    if (typeof data.username === "string") updateData.username = data.username;
    if (typeof data.email === "string") updateData.email = data.email;
    if (user.role === "ADMIN" && typeof data.role === "string")
      updateData.role = data.role;

    const updatedUser = await prisma.user.update({
      where: { user_id: id },
      data: updateData,
      select: {
        user_id: true,
        name: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Update user error:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
