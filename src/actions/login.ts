"use server";
import { type CredentialsSignin } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "~/auth";

export const login = async (formData: FormData) => {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  try {
    await signIn("credentials", {
      callback: "/",
      username,
      password,
      redirect: false,
    });
  } catch (error) {
    throw new Error("ไม่สามารถเข้าสู่ระบบได้ กรุณาตรวจสอบข้อมูล");
  }

  revalidatePath("/login", "layout");
  redirect("/new-member");
};
