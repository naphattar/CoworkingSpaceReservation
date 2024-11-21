import { makeFetchDelay } from "../utils";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';

export default async function updateCoworkingspace(
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
    const API_URL = API_BASE_URL + '/api/v1/coworkingspaces/' + id;
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

        });
        if (response.status === 404) {
            throw new Error(`Coworkingspace with ID ${id} not found.`);
        }
        if (!response.ok) {
            throw new Error("Failed to update coworkingspace with id" + id);
        }
        const data = await response.json()
        return data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}