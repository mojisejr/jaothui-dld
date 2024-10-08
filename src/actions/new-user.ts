"use server";
import { type NewUserDTO } from "~/interfaces/new-user";
import { hashGen } from "~/lib/hashing";
import { db } from "~/server/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createNewMember = async (
  prevState: { message?: string },
  formData: FormData,
) => {
  const password = formData.get("password") as string;
  const cfmPassword = formData.get("confirmPassword") as string;

  if (password != cfmPassword)
    return {
      message: "รหัสผ่านไม่ตรงกัน",
    };

  const newUser: NewUserDTO = {
    firstname: formData.get("firstname") as string,
    lastname: formData.get("lastname") as string,
    username: parseInt(formData.get("username") as string),
    pwdHash: formData.get("password") as string,
    roleHash: process.env.NUSER!,
  };

  const found = await db.user.findFirst({
    where: { username: newUser.username },
  });

  if (found) {
    return {
      message: "สมัครสมาชิกไปแล้ว",
    };
  }
  // console.log({ ...newUser, pwdHash: (await hashGen(password)) as string });

  const result = await db.user.create({
    data: {
      ...newUser,
      pwdHash: (await hashGen(password))!,
    },
  });

  if (!result) {
    return {
      message: "ไม่สามารถสมัครสมาชิกได้",
    };
  }

  revalidatePath("/register", "layout");
  redirect(`/register-success?id=${result.id}`);
  // redirect("/register-success");
};
