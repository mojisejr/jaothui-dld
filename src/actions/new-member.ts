"use server";
import { db } from "~/server/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { formDataParser } from "~/lib/parser";

export const createNewMemberInfo = async (
  userId: string,
  formData: FormData,
) => {
  const parsedData = await formDataParser(formData, userId);

  try {
    await db.rawRegisterData.create({ data: parsedData });
  } catch (error) {
    throw new Error("บันทึกข้อมูลผิดพลาด");
  }

  revalidatePath("/", "layout");
  redirect("/new-member-success");
};
