import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string | null;
      name?: string | null;
      phone?: string | null;
      accessToken?: string | null;
      refreshToken?: string | null;
      accessTokenExpiresIn?: string | null;
      refreshTokenExpiresIn?: string | null;
    };
  }

  interface User {
    id: string;
    email: string | null;
    name?: string | null;
    phone?: string | null;
    accessToken?: string | null;
    refreshToken?: string | null;
    accessTokenExpiresIn?: string | null;
    refreshTokenExpiresIn?: string | null;
  }

  interface JWT {
    id: string;
    email: string | null;
    name?: string | null;
    phone?: string | null;
    accessToken?: string | null;
    refreshToken?: string | null;
    accessTokenExpiresIn?: string | null;
    refreshTokenExpiresIn?: string | null;
  }
}
