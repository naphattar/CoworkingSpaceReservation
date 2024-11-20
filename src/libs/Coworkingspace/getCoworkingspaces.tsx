import { makeFetchDelay } from "../utils";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';

export default async function getCoworkingspaces(){
    
    makeFetchDelay()
    try {
    const API_URL = API_BASE_URL+ '/api/v1/coworkingspaces';

    const response = await fetch(API_URL ,{
        headers: {
            'Content-Type': 'application/json',
          },
        method: 'GET'
      });
    if(!response.ok){
        throw new Error("Failed to fetch coworkingspaces");
    }
    const data = await response.json()
    return data;
}
catch(error) {
    console.error(error);
    throw error;
}
}