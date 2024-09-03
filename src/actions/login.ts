"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "~/auth";

export const login = async (formData: FormData) => {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  await signIn("credentials", {
    callback: "/",
    username,
    password,
    redirect: false,
  });

  revalidatePath("/login", "layout");
  redirect("/new-member");
};
