"use server";

import { type RawRegisterData } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { formUpdateDataParser } from "~/lib/parser";
import { db } from "~/server/db";

export const handleConfirmEdit = async (
  prevState: { message?: string },
  data: { info: RawRegisterData; formData: FormData },
) => {
  const { info, formData } = data;
  const province = formData.get("province") == undefined ? false : true;
  const farmProvince = formData.get("farmProvince") == undefined ? false : true;

  if (!province || farmProvince)
    return {
      message: "กรุณากรอกข้อมูลจังหวัดทั้งหมดอีกครั้ง",
    };

  const parsedData = await formUpdateDataParser(formData, info);

  const result = await db.rawRegisterData.update({
    data: parsedData,
    where: { userId: info.userId },
  });

  if (!result) {
    return { message: "ไม่สามารถแก้ไขข้อมูลได้" };
  }

  revalidatePath("/", "layout");
  redirect(`/approvement/success?type=edit&id=${info.id}`);
};
