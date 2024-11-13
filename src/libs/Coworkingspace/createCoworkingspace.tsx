import { API_URL } from "@/constants/constant";
import { makeFetchDelay } from "../utils";

export default async function createCoworkingspace(
    name : string,
    address : string,
    operatingHours : string,
    province : string,
    postalcode : string,
    tel : string,
    picture : string
){
    makeFetchDelay()
    
    const response = await fetch(`${API_URL}/coworkingspaces/`,{
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
        },
        credentials: "include",
        body : JSON.stringify({
            name : name,
            address : address,
            operatingHours : operatingHours,
            province : province,
            postalcode : postalcode,
            tel : tel,
            picture : picture
        }),

    }

    );
    if(!response.ok){
        throw new Error("Failed to create coworkingspace");
    }
    return await response.json()
}