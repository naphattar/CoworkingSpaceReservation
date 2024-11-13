import NextAuth,{AuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import  userLogIn  from "@/libs/auth/userLogIn";
export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your-email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("No credentials provided");
        }
        const user = await userLogIn(credentials.email, credentials.password);
        if (user && user.token) {
          // Return user object
          return { id: user._id, name: user.name, email: user.email, token: user.token };
        }
        throw new Error("Login failed");
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }: { token: any, user: any }) {
      return { ...token, ...user };
    },
    async session({ session, token }: { session: any, token: any }) {
      session.user = token as any;
      return session;
      
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
};
const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};