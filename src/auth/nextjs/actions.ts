"use server";
import { z } from "zod";
import { redirect } from "next/navigation";
import { signInSchema, signUpSchema } from "./schemas";
import { db } from "@/database";
import {
  comparePasswords,
  generateSalt,
  hashPassword,
} from "../core/passwordHasher";
import { cookies } from "next/headers";
import { createUserSession, removeUserFromSession } from "../core/session";
/**
 * @author adhanji8
 */
/**
 * Sign In with validation schema handled by zod, stores session token in cookies
 * @param unsafeData form data for logging in (e.g. email, password)
 * @returns error message if user cannot log in, finally redirects to home page
 */
export async function signIn(unsafeData: z.infer<typeof signInSchema>) {
  const { success, data } = signInSchema.safeParse(unsafeData);

  if (!success) return "Unable to log you in";

  const user = await db.user.findFirst({
    where: { email: data.email },
  });
  
  if (!user || !user.password || !user.salt) {
    return "Unable to log you in";
  }

  const isCorrectPassword = await comparePasswords({
    hashedPassword: user.password,
    password: data.password,
    salt: user.salt,
  });

  if (!isCorrectPassword) return "Unable to log you in";

  await createUserSession(user, await cookies());

  redirect("/");
}

/**
 * Sign up
 * @param unsafeData form data for registering a new user (e.g. name, email, password)
 * @returns error message if user cannot log in, finally redirects to home page
 */
export async function signUp(unsafeData: z.infer<typeof signUpSchema>) {
  const { success, data } = signUpSchema.safeParse(unsafeData);

  if (!success) return "Email must be a valid email. Password must be at least 8 characters. Please try again";

  const existingUser = await db.user.findFirst({
    where: { email: data.email },
  });

  if (existingUser) return "Account already exists for this email.";

  try {
    const salt = generateSalt();
    const hashedPassword = await hashPassword(data.password, salt);

    const user = await db.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        salt: salt,
      },
    });

    if (!user) return "Unable to create account";
    await createUserSession(user, await cookies());
  } catch {
    return "Unable to create account";
  }

  redirect("/");
}

/**
 * Log out - logs the user out of the current session and redirects home
 */
export async function logOut() {
  await removeUserFromSession(await cookies());
  redirect("/");
}
