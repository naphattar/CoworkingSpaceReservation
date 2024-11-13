import { API_DELEY_TIME } from "@/constants/constant";

export const makeFetchDelay = async() =>{
    await new Promise((resolve) => setTimeout(resolve,API_DELEY_TIME));
}