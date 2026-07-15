<template>
  <div class="max-w-md mx-auto mt-12 p-5 bg-white rounded-lg">
    <h2 class="text-3xl text-center mb-1">Sign in</h2>
    <p class="text-[16px] leading-6 text-gray text-center mb-5">Sign in to access your account</p>

    <form @submit.prevent="handleSubmit" class="space-y-3">
      <div>
        <label class="block text-sm font-medium text-primary mb-1">Email</label>
        <input v-model="email" type="email" required :disabled="isPending"
          class="w-full px-3 py-1.5 bg-input border border-dropdown-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed text-sm" />
      </div>

      <div>
        <label class="block text-sm font-medium text-primary mb-1">Password</label>
        <input v-model="password" type="password" required :disabled="isPending"
          class="w-full px-3 py-1.5 bg-input border border-dropdown-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed text-sm" />
      </div>

      <Alert v-if="error" variant="destructive">
        <AlertTitle>Sign in failed</AlertTitle>

        <AlertDescription>
          {{ error?.message || "Invalid email or password." }}
        </AlertDescription>
      </Alert>

      <div class="flex items-center justify-between pt-1">
        <button type="submit" :disabled="isPending"
          class="px-4 py-1.5 bg-primary text-white rounded-lg font-medium transition-opacity duration-200 hover:opacity-70 disabled:opacity-50 disabled:cursor-not-allowed text-sm">
          {{ isPending ? 'Signing in...' : 'Sign in' }}
        </button>
        <NuxtLink :to="routes.register" class="text-sm text-primary hover:opacity-70 transition-opacity duration-200">
          Register</NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLogin } from '../model/use-login'
import { routes } from '~/shared/constants/routes'
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "~/shared/ui/shadcn/alert";

const email = ref('')
const password = ref('')
const { login, isPending, error } = useLogin()

const handleSubmit = () => {
  login({
    email: email.value,
    password: password.value,
  })
}
</script>