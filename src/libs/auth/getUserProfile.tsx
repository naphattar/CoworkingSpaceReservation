import { makeFetchDelay } from "../utils";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';
const API_URL = API_BASE_URL + '/api/v1/auth/me';
const getUserProfile = async (token: string) => {
  makeFetchDelay();
  try {
    const res = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,  // ส่ง Bearer Token
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch user profile');
    }

    const data = await res.json();  // Return ค่าที่ได้รับจาก backend API
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export default getUserProfile;