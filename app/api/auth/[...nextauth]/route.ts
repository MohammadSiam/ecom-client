import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const {
          email,
          accessToken,
          refreshToken,
          access_token_expiresIn,
          refresh_token_expiresIn,
          phone,
          name,
        } = credentials as {
          email: string;
          accessToken: string;
          refreshToken: string;
          access_token_expiresIn: string;
          refresh_token_expiresIn: string;
          phone: string;
          name: string;
        };

        // Authenticate the user, returning the necessary fields for the session
        return {
          id: "123",
          email,
          name,
          accessToken: accessToken,
          refreshToken: refreshToken,
          accessTokenExpiresIn: access_token_expiresIn,
          refreshTokenExpiresIn: refresh_token_expiresIn,
          phone,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id as string,
        email: token.email as string,
        name: token.name,
        phone: token.phone as string,
        accessToken: token.accessToken as string,
        refreshToken: token.refreshToken as string,
        accessTokenExpiresIn: token.accessTokenExpiresIn as string,
        refreshTokenExpiresIn: token.refreshTokenExpiresIn as string,
      };
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.phone = user.phone;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpiresIn = user.accessTokenExpiresIn;
        token.refreshTokenExpiresIn = user.refreshTokenExpiresIn;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
