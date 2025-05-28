"use server";

import db from "@/app/utils/db";
import { hash } from "bcrypt";

export async function Signup(data: {
  name: string;
  email: string;
  password: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    // check the db for the user
    const existingUser = await db.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      return { success: false, error: "user already exists" };
    }

    // hash the user's password
    const hashedPassword = await hash(data.password, 10);

    // create one
    await db.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Signup Error", error);

    return { success: false, error: "Internal Server Error---" };
  }
}
