<template>
  <div class="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md">
    <Typography variant="h2" class="text-center mb-2">Sign in</Typography>
    <Typography variant="bodyLg" class="text-center text-gray mb-6">Sign in to access your account</Typography>

    <form @submit.prevent="handleSubmit" class="space-y-4">
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

      <div v-if="error" class="text-red-600 text-sm">
        {{ error?.message || 'Login failed. Please try again.' }}
      </div>

      <div class="flex items-center justify-between">
        <Button type="submit" :disabled="isPending">
          {{ isPending ? 'Signing in...' : 'Sign in' }}
        </Button>
        <NuxtLink to="/register" class="text-sm text-blue-600 hover:underline">Register</NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Typography, Button } from '~/shared/ui'
import { useLogin } from '../model/use-login'

const email = ref('')
const password = ref('')

// Используем composable для управления логином
const { login, isPending, error } = useLogin()

const handleSubmit = () => {
  login({
    email: email.value,
    password: password.value,
  })
}
</script>