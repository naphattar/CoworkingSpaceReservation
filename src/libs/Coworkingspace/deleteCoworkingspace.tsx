import { makeFetchDelay } from "../utils";


export default async function deleteCoworkingspace(
    id : string,
    name : string,
    address : string,
    operatingHours : string,
    province : string,
    postalcode : string,
    tel : string,
    picture : string,
    token? : string
){
    const API_URL = (process.env.API_URL || 'http://localhost:5000')+ '/api/v1/coworkingspaces/' + id;
    makeFetchDelay()
    
    const response = await fetch(`${API_URL}`,{
        method : "DELETE",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
    }

    );
    if(!response.ok){
        throw new Error("Failed to delete coworkingspace with id"+ id);
    }
    return await response.json()
}