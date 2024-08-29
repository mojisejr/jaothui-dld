export interface NewUserDTO {
  firstname: string;
  lastname: string;
  username: number;
  pwdHash: string;
  roleHash: string;
}

export type User = Omit<NewUserDTO, "password">;
