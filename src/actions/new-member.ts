"use server";
import { db } from "~/server/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { formDataParser } from "~/lib/parser";

export const createNewMemberInfo = async (
  prevState: { message?: string },
  formData: FormData,
) => {
  const parsedData = await formDataParser(formData);

  const result = await db.rawRegisterData.create({ data: parsedData });

  if (!result) {
    return {
      message: "บันทึกข้อมูลไม่สำเร็จ",
    };
  }

  revalidatePath("/", "layout");
  redirect("/new-member-success");
};
