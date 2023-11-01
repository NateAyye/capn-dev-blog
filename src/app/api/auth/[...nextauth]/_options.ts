import clientPromise from '@/lib/clientPromise';
import connectMongo from '@/lib/connectDb';
import User from '@/models/User';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import bcrypt from 'bcrypt';
import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(clientPromise, { databaseName: 'test' }),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const mongo = await connectMongo();

        const user = await User.findOne({ email: credentials?.email });
        if (!user) return null;

        const isValid = await bcrypt.compare(
          credentials?.password || '',
          user.password,
        );

        const loggedInUser = await User.findOneAndUpdate(
          { email: credentials?.email },
          { $inc: { amount_logged_in: 1 } },
          { new: true },
        );

        if (isValid) return loggedInUser;
        await mongo?.disconnect()
        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/signIn',
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log('signIn', { user, account, profile, email, credentials });
      return true;
    },
    async redirect({ url, baseUrl }) {
      // console.log('redirect', { url, baseUrl });
      return baseUrl;
    },
    async session({ session, user, token }) {
      session.token = token;
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // console.log('jwt', { token, user, account, profile, isNewUser });
      return token;
    },
  },
};

export default authOptions;
