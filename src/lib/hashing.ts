import bcrypt from "bcrypt";

const saltRounds = 10;

export const hashGen = async (pwd: string) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(pwd, salt);
    return hash;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const verifyPassword = async (pwd: string, userHash: string) => {
  try {
    const result = await bcrypt.compare(pwd, userHash);
    if (result) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
