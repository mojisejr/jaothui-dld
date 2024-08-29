import { db } from "~/server/db";

export const getAdminInfo = async (id: string) => {
  const found = await db.user.findFirst({
    where: { id },
    select: {
      id: true,
      username: true,
      firstname: true,
      lastname: true,
      roleHash: true,
      AdminPosition: true,
    },
  });

  return found;
};
