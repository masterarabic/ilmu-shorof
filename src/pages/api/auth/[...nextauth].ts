// resource: https://github.com/wpcodevo/nextauth-nextjs13-prisma/tree/main
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth, { AuthOptions } from "next-auth";
import { Adapter, AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();

function CustomPrismaAdapter(p: typeof prisma): Adapter {
  // @ts-ignore
  return {
    ...PrismaAdapter(p),
    async createUser(user: Omit<AdapterUser, "id">) {
      const created = await p.user.create({
        data: {
          image: user.image,
          role: user.role,
          emailVerified: user.emailVerified,
          name: user.name,
          email: user.email,
        },
      });

      return created as AdapterUser;
    },
  };
}

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET!,
  adapter: CustomPrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      // allowDangerousEmailAccountLinking: true,
      profile: (profile) => {
        return {
          id: profile.sub,
          name: profile.name,
          firstname: profile.given_name,
          lastname: profile.family_name,
          email: profile.email,
          image: profile.picture,
          role: profile.role ?? "student",
        };
      },
    }),
  ],

  // debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  callbacks: {
    signIn({ user, account }) {
      console.log({
        user,
        account,
      });
      return true;
    },
    jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    // session({ session, user }) {
    //   session.user.role = user.role;
    //   return session;
    // },
  },
};

export default NextAuth(authOptions);
