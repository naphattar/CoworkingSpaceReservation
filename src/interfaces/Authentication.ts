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

  export interface SessionUser{
      name?: string | null;
      email?: string | null;
      image?: string | null;
      token? : string | null
  }
