import type {
  LoginDto,
  RegisterDto,
  AuthResponse,
  ProfileResponse,
} from "../model/types";

export const authApi = {
  async login(data: LoginDto): Promise<AuthResponse> {
    const config = useRuntimeConfig();
    return $fetch(`${config.public.apiBase}/auth/login`, {
      method: "POST",
      body: data,
    });
  },
  async register(data: RegisterDto): Promise<AuthResponse> {
    const config = useRuntimeConfig();
    return $fetch(`${config.public.apiBase}/auth/registration`, {
      method: "POST",
      body: data,
    });
  },

  async profile(token: string): Promise<ProfileResponse> {
    const config = useRuntimeConfig();
    return $fetch(`${config.public.apiBase}/auth/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};