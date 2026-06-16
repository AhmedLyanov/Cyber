import type {
  LoginDto,
  RegisterDto,
  AuthResponse,
  ProfileResponse,
} from "../model/types";
import { useApi } from "~/shared/core/client";

export const authApi = {
  async login(data: LoginDto): Promise<AuthResponse> {
    const api = useApi();

    return api("/auth/login", {
      method: "POST",
      body: data,
    });
  },

  async register(data: RegisterDto): Promise<AuthResponse> {
    const api = useApi();

    return api("/auth/registration", {
      method: "POST",
      body: data,
    });
  },

  async profile(token: string): Promise<ProfileResponse> {
    const api = useApi();

    return api("/auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};