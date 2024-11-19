import { makeFetchDelay } from "../utils";

export default async function getCoworkingspace(id : string){
    
    makeFetchDelay()
    try {
    const API_URL = (process.env.API_URL || 'http://localhost:5000')+ '/api/v1/coworkingspaces/' + id;
    
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