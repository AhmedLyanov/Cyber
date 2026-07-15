<template>
  <div class="max-w-md mx-auto mt-12 p-5 bg-white rounded-lg">
    <h2 class="text-3xl text-center mb-1">Create account</h2>
    <p class="text-[16px] leading-6 text-gray text-center mb-5">Create a new account to start shopping</p>

    <form @submit.prevent="handleSubmit" class="space-y-3">
      <div class="flex gap-3">
        <div class="flex-1">
          <label class="block text-sm font-medium text-primary mb-1">Name</label>
          <input v-model="name" type="text" required :disabled="isPending"
            class="w-full px-3 py-1.5 bg-input border border-dropdown-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed text-sm" />
        </div>

        <div class="flex-1">
          <label class="block text-sm font-medium text-primary mb-1">Surname</label>
          <input v-model="surname" type="text" required :disabled="isPending"
            class="w-full px-3 py-1.5 bg-input border border-dropdown-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed text-sm" />
        </div>
      </div>

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

      <div>
        <label class="block text-sm font-medium text-primary mb-1">Confirm password</label>
        <input v-model="confirmPassword" type="password" required :disabled="isPending"
          class="w-full px-3 py-1.5 bg-input border border-dropdown-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed text-sm" />
      </div>

      <Alert v-if="validationError || error" variant="destructive">
        <AlertTitle>
          {{ validationError ? "Validation error" : "Registration failed" }}
        </AlertTitle>

        <AlertDescription>
          {{ validationError || error?.message || "Unable to create your account." }}
        </AlertDescription>
      </Alert>

      <div class="flex items-center justify-between pt-1">
        <button type="submit" :disabled="isPending"
          class="px-4 py-1.5 bg-primary text-white rounded-lg font-medium transition-opacity duration-200 hover:opacity-70 disabled:opacity-50 disabled:cursor-not-allowed text-sm">
          {{ isPending ? 'Registering...' : 'Register' }}
        </button>
        <NuxtLink :to="routes.login" class="text-sm text-primary hover:opacity-70 transition-opacity duration-200">Sign
          in</NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRegister } from '../model/use-register'
import { routes } from '~/shared/constants/routes'
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "~/shared/ui/shadcn/alert";

const name = ref('')
const surname = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const validationError = ref('')

const { register, isPending, error } = useRegister()

const handleSubmit = () => {
  validationError.value = ''

  if (password.value !== confirmPassword.value) {
    validationError.value = 'Passwords do not match'
    return
  }

  register({
    name: name.value,
    surname: surname.value,
    email: email.value,
    password: password.value,
  })
}
</script>