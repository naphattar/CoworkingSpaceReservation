import { makeFetchDelay } from "../utils";

const API_URL = (process.env.API_URL || 'http://localhost:5000') + '/api/v1/coworkingspaces/';

export default async function createCoworkingspace(
    name: string,
    address: string,
    operatingHours: string,
    province: string,
    postalcode: string,
    tel: string,
    picture: string,
    token?: string
) {
    makeFetchDelay()
    try {
        const response = await fetch(`${API_URL}`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                address: address,
                operatingHours: operatingHours,
                province: province,
                postalcode: postalcode,
                tel: tel,
                picture: picture
            }),

        }
        

        );
        if (!response.ok) {
            throw new Error("Failed to create coworkingspace");
        }
        const data = await response.json()
        return data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}