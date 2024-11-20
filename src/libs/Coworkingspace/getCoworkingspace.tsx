import { makeFetchDelay } from "../utils";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';

export default async function getCoworkingspace(id : string){
    
    makeFetchDelay()
    try {
    const API_URL = API_BASE_URL+ '/api/v1/coworkingspaces/' + id;
    
    const response = await fetch(API_URL ,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (response.status === 404) {
      throw new Error(`Coworkingspace with ID ${id} not found.`);
  }
    if(!response.ok){
        throw new Error("Failed to fetch coworkingspace");
    }
    const data = await response.json()
    return data;
  }
  catch(error) {
    console.error(error);
    throw error;
  }
}