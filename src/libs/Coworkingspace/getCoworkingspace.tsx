import { API_DELEY_TIME, API_URL } from "@/constants/constant";

export default async function getCoworkingspace(id : string){
    
    await new Promise((resolve) => setTimeout(resolve,API_DELEY_TIME));
    
    const response = await fetch(`${API_URL}/coworkingspaces/${id}`);
    if(!response.ok){
        throw new Error("Failed to fetch coworkingspace");
    }
    return await response.json()
}