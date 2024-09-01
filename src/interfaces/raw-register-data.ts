import { ApprovementInfo, type RawRegisterData } from "@prisma/client";

export type RawRegisterDataWithMemberApprovement = RawRegisterData & {
  MemberApprovement: ApprovementInfo | null;
};
