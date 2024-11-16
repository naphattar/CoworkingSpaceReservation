import { Session } from "next-auth";

export interface UserLogInResponse {
    success: boolean,
    _id: string,
    name: string,
    email: string,
    token: string,
  }

  export interface UserProfile {
    success: boolean,
    data: {
      _id: string,
      name: string,
      email: string,
      tel: string,
      role: string,
      createdAt: string,
      __v: number,
    }
  }

