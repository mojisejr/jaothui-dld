"use server";

import { type RawRegisterData } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { formUpdateDataParser } from "~/lib/parser";
import { db } from "~/server/db";

export const handleConfirmEdit = async (
  info: RawRegisterData,
  formData: FormData,
) => {
  const province = formData.get("province") == undefined ? false : true;
  const farmProvince = formData.get("farmProvince") == undefined ? false : true;

  if (!province || farmProvince) throw Error("กรุณากรอกข้อมูลจังหวัดอีกครั้ง");

  const parsedData = await formUpdateDataParser(formData, info);

  try {
    await db.rawRegisterData.update({
      data: parsedData,
      where: { userId: info.userId },
    });
  } catch (error) {
    throw new Error("แก้ไขข้อมูลผิดพลาด");
  }

  revalidatePath("/", "layout");
  redirect(`/approvement/success?type=edit&id=${info.id}`);
};
