"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { LoginSchema, RegisterSchema } from "@/lib/schema";
import { db } from "@/lib/db";
import { AuthError } from "next-auth";
import { auth, signIn } from "@/auth";
import { DEFAULT_REDIRECT } from "@/lib/constants";
import { redirect } from "next/navigation";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, name, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await db.user.findFirst({
    where: {
      email,
    },
  });
  if (existingUser) {
    return { error: "Email already in use!" };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return { success: "Confirmation Email Sent!" };
};

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await db.user.findFirst({
    where: {
      email,
    },
  });
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};

export const getUserInfo = async () => {
  const session = await auth();
  if (!session?.user?.id) {
    return redirect("/sign-in");
  }

  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  return user;
};
