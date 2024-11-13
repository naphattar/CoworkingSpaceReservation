import { API_URL } from "@/constants/constant";
import { makeFetchDelay } from "../utils";

export default async function getCoworkingspaces(){
    
    makeFetchDelay()
    
    const response = await fetch(`${API_URL}/coworkingspaces/`);
    if(!response.ok){
        throw new Error("Failed to fetch coworkingspaces");
    }
    return await response.json()
}