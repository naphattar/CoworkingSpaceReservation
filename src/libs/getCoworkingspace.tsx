import { API_DELEY_TIME, API_URL } from "@/constants/constant";

export default async function getCoworkingspaces(){
    
    await new Promise((resolve) => setTimeout(resolve,API_DELEY_TIME));
    
    const response = await fetch(`${API_URL}/coworkingspaces`);
    if(!response.ok){
        throw new Error("Failed to fetch coworkingspaces");
    }
    return await response.json();
}