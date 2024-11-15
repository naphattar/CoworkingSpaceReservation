import { makeFetchDelay } from "../utils";

export default async function getCoworkingspaces(){
    
    makeFetchDelay()
    const API_URL = (process.env.API_URL || 'http://localhost:5000')+ '/api/v1/coworkingspaces';

    const response = await fetch(API_URL ,{
        method: 'GET'
      });
    if(!response.ok){
        throw new Error("Failed to fetch coworkingspaces");
    }
    return await response.json()
}