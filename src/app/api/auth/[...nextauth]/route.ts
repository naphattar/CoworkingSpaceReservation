import NextAuth,{AuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import  userLogIn  from "@/libs/auth/userLogIn";
import userRegister from "@/libs/auth/userRegister";
import {authOptions} from "./authOptions";

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};