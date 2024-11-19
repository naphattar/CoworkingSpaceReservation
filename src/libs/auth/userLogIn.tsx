import { makeFetchDelay } from "../utils";
import { UserLogInResponse } from '@/interfaces/Authentication';
const API_URL = (process.env.API_URL || 'http://localhost:5000') + '/api/v1/auth/login';
const userLogIn = async (userEmail: string, userPassword: string): Promise<UserLogInResponse> => {
  makeFetchDelay();
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
      }),
    });

    if (!res.ok) {
      throw new Error('Failed to log in');
    }

    const data = await res.json();
    return data;
  }
  catch (error) {
    console.error(error);
    throw error;
  }

};

export default userLogIn;