import { makeFetchDelay } from "../utils";

export default async function getCoworkingspace(id : string){
    
    makeFetchDelay()
    const API_URL = (process.env.API_URL || 'http://localhost:5000')+ '/api/v1/coworkingspaces/' + id;
    
    const response = await fetch(API_URL ,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if(!response.ok){
        throw new Error("Failed to fetch coworkingspace");
    }
    return await response.json()
}