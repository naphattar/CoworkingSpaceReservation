
import NextAuth,{AuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import  userLogIn  from "@/libs/auth/userLogIn";
import userRegister from "@/libs/auth/userRegister";
export const authOptions: AuthOptions = {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "email", placeholder: "your-email" },
          password: { label: "Password", type: "password", placeholder: "password" },
        },
        async authorize(credentials) {
          if (!credentials) {
            throw new Error("No credentials provided");
          }
          const user = await userLogIn(credentials.email, credentials.password);
          if (user && user.token) {
            // Return user object
            return { id: user._id, name: user.name, email: user.email, token: user.token  };
          }
          throw new Error("Login failed");
        },
      }),
      CredentialsProvider({
        id: "register",
        name: "register",
        credentials: {
          name: {
            label: "Name",
            type: "text",
            placeholder: "your-name",
          },
          email: {
            label: "Email",
            type: "email",
            placeholder: "your-email",
          },
          password: { label: "Password", type: "password", placeholder: "password" },
          telephone: { label: "Telephone", type: "text", placeholder: "your-telephone" },
          role: { label: "Role", type: "text", placeholder: "user-role" },
          
        },
        async authorize(credentials) {
       
            if (!credentials) {
              throw new Error("No credentials provided");
            }
            const user = await userRegister(credentials.email, credentials.password,credentials.name,credentials.telephone,credentials.role);
            if (user && user.token) {
              // Return user object
              return { id: user._id, name: user.name, email: user.email, token: user.token };
            }
            throw new Error("Register failed");
          
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