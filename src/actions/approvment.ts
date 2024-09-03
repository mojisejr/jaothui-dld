"use server";
import { type ApprovementInfo, type RawRegisterData } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { memberApprovementParser } from "~/lib/parser";
import { db } from "~/server/db";

export const getApprovementInfoOf = async (userId: string) => {
  const found = await db.rawRegisterData.findFirst({
    where: { userId },
    include: { MemberApprovement: true },
  });

  return found;
};

export const getApprovementInfo = async (id: string) => {
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
    (data) =>
      data.appointment != null &&
      data.MemberApprovement?.managementApproved == null,
  );

  return onlyAppointedApprovement;
};

export const getAppointedListForAll = async () => {
  const found = await db.rawRegisterData.findMany({
    include: { MemberApprovement: true },
  });

  const onlyAppointedApprovement = found.filter(
    (data) =>
      data.appointment != null &&
      data.MemberApprovement?.managementApproved == null,
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
    redirect(`/approvement/success?type=appointed&id=${id}`);
  }
};

export const getRequestCount = async (level: string, province: string) => {
  if (level == "1") {
    const found = await db.rawRegisterData.findMany({
      where: { province },
      include: { MemberApprovement: true },
    });

    const filtered = found.filter(
      (f) => f.MemberApprovement?.centralApproved == null,
    );

    return filtered.length;
  } else {
    const found = await db.rawRegisterData.findMany({
      include: { MemberApprovement: true },
    });

    const filtered = found.filter(
      (f) => f.MemberApprovement?.centralApproved == null,
    );

    return filtered.length;
  }
};

export const getCompletedCount = async (level: string, province: string) => {
  if (level == "1") {
    const count = await db.rawRegisterData.count({
      where: {
        MemberApprovement: { managementApproved: { not: null } },
        province,
      },
    });
    return count;
  } else {
    const count = await db.rawRegisterData.count({
      where: { MemberApprovement: { managementApproved: { not: null } } },
    });
    return count;
  }
};

export const handleSubmitApprovementInfo = async (
  prevState: { message?: string },
  data: { registerId: string; adminId: string; formData: FormData },
) => {
  const { registerId, adminId, formData } = data;
  const parsedData = await memberApprovementParser(
    formData,
    registerId,
    adminId,
  );

  try {
    await db.approvementInfo.create({
      data: parsedData,
    });
  } catch (error) {
    return { message: "ไม่สามารถเพิ่มข้อมูลการอนุมัติได้" };
  }

  revalidatePath("/", "layout");
  redirect(`/approvement/success?type=approved&id=${registerId}`);
};

export const handleSubmitApprovment = async (
  prevState: { message?: string },
  data: {
    adminId: string;
    info: RawRegisterData & {
      MemberApprovement: ApprovementInfo;
    };
  },
) => {
  const user = await db.user.findUnique({
    where: { id: data.adminId },
    include: { AdminPosition: true },
  });

  const approver = data.info.MemberApprovement.provinceApproved.filter(
    (a) =>
      (JSON.parse(a) as { adminId: string; name: string }).adminId ==
      data.adminId,
  );

  if (approver.length > 0)
    return { message: `คุณ ${user?.firstname} ได้อนุมติไปแล้ว` };

  if (user?.AdminPosition?.level == "1") {
    if (data.info.MemberApprovement.provinceApproved.length == 3)
      return {
        message:
          "เจ้าหน้าที่ระดับจังหวัดอนุมัติครบสามคนแล้ว โปรดรอเจ้าหน้าที่ระดับสูงอนุมัติต่อไป",
      };

    await db.approvementInfo.update({
      where: { id: data.info.MemberApprovement.id },
      data: {
        provinceApproved: {
          push: JSON.stringify({
            adminId: data.adminId,
            name: `${user.firstname} ${user.lastname}`,
          }),
        },
      },
    });
  }

  //Central
  if (user?.AdminPosition?.level == "2") {
    if (data.info.MemberApprovement.provinceApproved.length < 3)
      return { message: "เจ้าหน้าที่ระดับจังหวัด ยังอนุมัติไม่ครบ" };
    if (data.info.MemberApprovement.centralApproved != null)
      return { message: "เจ้าหน้าที่ส่วนกลางอนุมัติเรียบร้อยแล้ว" };
    await db.approvementInfo.update({
      where: { id: data.info.MemberApprovement.id },
      data: {
        centralApproved: JSON.stringify({
          adminId: data.adminId,
          name: `${user.firstname} ${user.lastname}`,
        }),
      },
    });
  }

  //Management
  if (user?.AdminPosition?.level == "3") {
    if (
      data.info.MemberApprovement.provinceApproved.length < 3 ||
      data.info.MemberApprovement.centralApproved == null
    )
      return { message: "เจ้าหน้าที่ระดับล่างยังอนุมัติไม่ครบ" };
    if (data.info.MemberApprovement.managementApproved != null)
      return { message: "เจ้าหน้าที่ทุกส่วนได้ทำการอนุมัติเรียบร้อยแล้ว" };
    await db.approvementInfo.update({
      where: { id: data.info.MemberApprovement.id },
      data: {
        managementApproved: JSON.stringify({
          adminId: data.adminId,
          name: `${user.firstname} ${user.lastname}`,
        }),
      },
    });
  }

  revalidatePath("/", "layout");
  redirect(
    `/approvement/success?type=accept&userId=${data.adminId}&id=${data.info.id}`,
  );
};

export const getCompletedListOf = async (province: string) => {
  const found = await db.rawRegisterData.findMany({
    where: { province },
    include: { MemberApprovement: true },
  });

  const filtered = found.filter(
    (d) => d.MemberApprovement?.managementApproved != null,
  );

  return filtered;
};

export const getCompletedListAll = async () => {
  const found = await db.rawRegisterData.findMany({
    include: { MemberApprovement: true },
  });

  const filtered = found.filter(
    (d) => d.MemberApprovement?.managementApproved != null,
  );

  return filtered;
};
