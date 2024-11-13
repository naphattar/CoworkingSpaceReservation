import { promises } from "dns";
import {userLogInResponse} from '@/interfaces/Authentication';
const API_URL = (process.env.API_URL || 'http://localhost:5000')+ '/api/v1/auth/login';
const  userLogIn = async (userEmail: string, userPassword: string): Promise<userLogInResponse> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
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
  };
  
export default userLogIn;