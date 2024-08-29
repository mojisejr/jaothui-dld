"use server";
import { db } from "~/server/db";

export const getUserById = async (id: string) => {
  const found = await db.user.findFirst({
    where: { id },
    select: {
      id: true,
      firstname: true,
      lastname: true,
      roleHash: true,
      RawRegisterData: true,
    },
  });

  return found;
};
