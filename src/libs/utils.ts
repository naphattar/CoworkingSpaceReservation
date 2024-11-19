import { API_DELEY_TIME } from "@/constants/constant";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'; 

export const makeFetchDelay = async() =>{
    await new Promise((resolve) => setTimeout(resolve,API_DELEY_TIME));
}

export  const  checkPermission = async (role? : string) =>{

  const session = await getServerSession(authOptions)
  if (!session || !session.user.token || session.user.role !== 'admin') {
    redirect('/');
    }

}