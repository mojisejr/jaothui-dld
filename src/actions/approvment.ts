"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "~/server/db";

export const getApprovementInfoOf = async (id: string) => {
  const found = await db.rawRegisterData.findFirst({
    where: { id },
    include: { MemberApprovement: true },
  });

  return found;
};

export const getWaitForApprovementListForProvinceAdmin = async (
  province: string,
) => {
  const found = await db.rawRegisterData.findMany({
    where: { province },
    include: { MemberApprovement: true },
  });

  console.log(found);

  const onlyWaitForApprovement = found.filter(
    (data) => data.appointment == null,
  );

  return onlyWaitForApprovement;
};

export const getWaitForApprovmentListForAll = async () => {
  const found = await db.rawRegisterData.findMany({
    include: { MemberApprovement: true },
  });
  const onlyWaitForApprovement = found.filter(
    (data) => data.appointment == null,
  );

  return onlyWaitForApprovement;
};

export const getAppointedListForProvinceAdmin = async (province: string) => {
  const found = await db.rawRegisterData.findMany({
    where: { province },
    include: { MemberApprovement: true },
  });

  const onlyAppointedApprovement = found.filter(
    (data) => data.appointment != null,
  );

  return onlyAppointedApprovement;
};

export const getAppointedListForAll = async () => {
  const found = await db.rawRegisterData.findMany({
    include: { MemberApprovement: true },
  });

  const onlyAppointedApprovement = found.filter(
    (data) => data.appointment != null,
  );

  return onlyAppointedApprovement;
};

export const confirmAppointmemt = async (id: string, formData: FormData) => {
  const appointment = formData.get("appointment") as string;
  const result = await db.rawRegisterData.update({
    where: { id },
    data: {
      appointment: new Date(appointment),
    },
  });

  if (result != null) {
    revalidatePath("/approvment/list", "layout");
    redirect("/approvement/success");
  }
};

export const getRequestCount = async (level: string, province: string) => {
  if (level == "1") {
    const count = await db.rawRegisterData.count({
      where: { MemberApprovement: null, province },
    });
    return count;
  } else {
    const count = await db.rawRegisterData.count({
      where: { MemberApprovement: null },
    });
    return count;
  }
};
