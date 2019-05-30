export interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  avatar: string | null;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface GetUserRequest {
  id: number;
}
