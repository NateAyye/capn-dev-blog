import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    expires?: string;
    token?: JWT;
  }
}
