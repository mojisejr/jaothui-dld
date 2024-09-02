import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "./server/db";
import { verifyPassword } from "./lib/hashing";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const username = parseInt(credentials.username as string);
          const password = credentials.password as string | undefined;

          if (!username || !password)
            throw new Error("username หรือ password ผิดพลาด");

          const user = await db.user.findUnique({
            where: { username: username },
          });

          if (!user) throw new Error("ไม่พบข้อมูล");

          const authorized = await verifyPassword(password, user.pwdHash);

          if (!authorized)
            throw new Error(
              "ไม่สามารถเช้าสู่ระบบได้ กรุณาตรวจสอบ username และ password",
            );

          const userData = {
            id: user.id,
            name: `${user.firstname} ${user.lastname}`,
            role: `${user.roleHash}`,
          };

          return userData;
        } catch (error) {
          throw new Error("ไม่สามารถเข้าสู่ระบบได้");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET!,
  callbacks: {
    async session({ session, token }) {
      if (token.sub && token.role) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
});
