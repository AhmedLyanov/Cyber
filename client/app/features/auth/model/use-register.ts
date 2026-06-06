import { useMutation } from '@tanstack/vue-query'
import type { RegisterDto, AuthResponse } from './types'
import { authApi } from '../api/auth.api'

export const useRegister = () => {
  const router = useRouter()

  const registerMutation = useMutation({
    mutationFn: (data: RegisterDto) => authApi.register(data),
    onSuccess: (response: AuthResponse) => {
      router.push('/auth/login')
    },
    onError: (error: any) => {
      console.error('Registration failed:', error)
    },
  })

  return {
    register: (data: RegisterDto) => registerMutation.mutate(data),
    isPending: registerMutation.isPending,
    isSuccess: registerMutation.isSuccess,
    isError: registerMutation.isError,
    data: registerMutation.data,
    error: registerMutation.error,
  }
}
