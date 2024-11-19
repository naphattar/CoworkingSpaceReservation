import { makeFetchDelay } from "../utils";


export default async function createCoworkingspace(
    id: string,
    name: string,
    address: string,
    operatingHours: string,
    province: string,
    postalcode: string,
    tel: string,
    picture: string,
    token?: string
) {
    const API_URL = (process.env.API_URL || 'http://localhost:5000') + '/api/v1/coworkingspaces/' + id;
    makeFetchDelay()
    try {
        const response = await fetch(`${API_URL}`, {
            method: "PUT",
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
            throw new Error("Failed to update coworkingspace with id" + id);
        }
        return await response.json()
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}