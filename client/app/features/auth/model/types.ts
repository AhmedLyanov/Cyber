export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    surname: string;
  };
}

export interface ProfileResponse {
  id: string;
  email: string;
  name: string;
  surname: string;
}
export interface ApiError {
  message: string;
  statusCode?: number;
}