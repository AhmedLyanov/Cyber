import type {
  LoginDto,
  RegisterDto,
  AuthResponse,
  ProfileResponse,
} from "../model/types";

/**
 * Единый API клиент для работы с авторизацией
 * Использует runtimeConfig для динамического URL API
 */
export const authApi = {
  /**
   * Вход пользователя
   * @param data - LoginDto с email и password
   * @returns Promise<AuthResponse> с токеном и данными пользователя
   */
  async login(data: LoginDto): Promise<AuthResponse> {
    const config = useRuntimeConfig();
    return $fetch(`${config.public.apiBase}/api/auth/login`, {
      method: "POST",
      body: data,
    });
  },

  /**
   * Регистрация нового пользователя
   * @param data - RegisterDto с name, surname, email, password
   * @returns Promise<AuthResponse> с токеном и данными пользователя
   */
  async register(data: RegisterDto): Promise<AuthResponse> {
    const config = useRuntimeConfig();
    return $fetch(`${config.public.apiBase}/auth/registration`, {
      method: "POST",
      body: data,
    });
  },

  /**
   * Получение профиля текущего пользователя
   * @param token - JWT токен из Authorization header
   * @returns Promise<ProfileResponse> с данными пользователя
   */
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