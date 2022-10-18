import User from "database/models/user";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  callbacks: {
    async signIn({ profile }): Promise<any> {
      User.findOrCreate({
        where: {
          email: profile.email!
        },
        defaults: {
          email: profile.email!
        }
      });
      return true;
    }
  }
});
