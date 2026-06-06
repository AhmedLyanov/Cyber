import { useMutation } from '@tanstack/vue-query'
import type { RegisterDto, AuthResponse } from './types'
import { authApi } from '../api/auth.api'

/**
 * Composable для управления регистрацией пользователя
 * Использует TanStack Query для мутаций
 * НЕ выполняет автоматический вход после регистрации
 */
export const useRegister = () => {
  const router = useRouter()

  const registerMutation = useMutation({
    mutationFn: (data: RegisterDto) => authApi.register(data),
    onSuccess: (response: AuthResponse) => {
      // После успешной регистрации перенаправляем на страницу входа
      // НЕ автоматизируем вход, пользователь должен войти вручную
      router.push('/auth')
    },
    onError: (error: any) => {
      console.error('Registration failed:', error)
      // Ошибка будет доступна в компоненте через error ref
    },
  })

  return {
    // Основная мутация для регистрации
    register: (data: RegisterDto) => registerMutation.mutate(data),
    
    // Состояние мутации
    isPending: registerMutation.isPending,
    isSuccess: registerMutation.isSuccess,
    isError: registerMutation.isError,
    
    // Данные и ошибки
    data: registerMutation.data,
    error: registerMutation.error,
  }
}
