<template>
  <div class="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md">
    <Typography variant="h2" class="text-center mb-2">Create account</Typography>
    <Typography variant="bodyLg" class="text-center text-gray mb-6">Create a new account to start shopping</Typography>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block text-sm text-gray-700 mb-1">Name</label>
        <input 
          v-model="name" 
          type="text" 
          required 
          :disabled="isPending"
          class="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
        />
      </div>

      <div>
        <label class="block text-sm text-gray-700 mb-1">Surname</label>
        <input 
          v-model="surname" 
          type="text" 
          required 
          :disabled="isPending"
          class="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
        />
      </div>

      <div>
        <label class="block text-sm text-gray-700 mb-1">Email</label>
        <input 
          v-model="email" 
          type="email" 
          required 
          :disabled="isPending"
          class="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
        />
      </div>

      <div>
        <label class="block text-sm text-gray-700 mb-1">Password</label>
        <input 
          v-model="password" 
          type="password" 
          required 
          :disabled="isPending"
          class="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
        />
      </div>

      <div>
        <label class="block text-sm text-gray-700 mb-1">Confirm password</label>
        <input 
          v-model="confirmPassword" 
          type="password" 
          required 
          :disabled="isPending"
          class="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
        />
      </div>

      <div v-if="validationError" class="text-red-600 text-sm">{{ validationError }}</div>
      <div v-if="error" class="text-red-600 text-sm">
        {{ error?.message || 'Registration failed. Please try again.' }}
      </div>

      <div class="flex items-center justify-between">
        <Button type="submit" :disabled="isPending">
          {{ isPending ? 'Registering...' : 'Register' }}
        </Button>
        <NuxtLink to="/auth" class="text-sm text-blue-600 hover:underline">Sign in</NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Typography, Button } from '~/shared/ui'
import { useRegister } from '../model/use-register'

const name = ref('')
const surname = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const validationError = ref('')

// Используем composable для управления регистрацией
const { register, isPending, error } = useRegister()

const handleSubmit = () => {
  // Очищаем предыдущую ошибку валидации
  validationError.value = ''
  
  // Проверяем совпадение паролей
  if (password.value !== confirmPassword.value) {
    validationError.value = 'Passwords do not match'
    return
  }

  // Отправляем данные регистрации
  register({
    name: name.value,
    surname: surname.value,
    email: email.value,
    password: password.value,
  })
}
</script>