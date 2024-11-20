import { makeFetchDelay } from "../utils";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';

export default async function deleteCoworkingspace(
    id: string,
    token?: string
) {
    const API_URL = API_BASE_URL + '/api/v1/coworkingspaces/' + id;
    makeFetchDelay()
    try {
        const response = await fetch(`${API_URL}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        }

        );
        if (!response.ok) {
            throw new Error("Failed to delete coworkingspace with id" + id);
        }
        return await response.json()
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}