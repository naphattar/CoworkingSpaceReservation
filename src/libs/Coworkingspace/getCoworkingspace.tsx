import { API_URL } from "@/constants/constant";
import { makeFetchDelay } from "../utils";

export default async function getCoworkingspace(id : string){
    
    makeFetchDelay
    
    const response = await fetch(`${API_URL}/coworkingspaces/${id}`);
    if(!response.ok){
        throw new Error("Failed to fetch coworkingspace");
    }
    return await response.json()
}