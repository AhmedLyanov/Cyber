<template>
  <div>
    <Typography variant="h2" class="text-center mb-2">Create account</Typography>
    <Typography variant="bodyLg" class="text-center text-gray mb-6">Create a new account to start shopping</Typography>

    <form @submit.prevent="onSubmit" class="space-y-4">
      <div>
        <label class="block text-sm text-gray-700 mb-1">Name</label>
        <input v-model="name" type="text" required class="mt-1 w-full border rounded px-3 py-2" />
      </div>

      <div>
        <label class="block text-sm text-gray-700 mb-1">Email</label>
        <input v-model="email" type="email" required class="mt-1 w-full border rounded px-3 py-2" />
      </div>

      <div>
        <label class="block text-sm text-gray-700 mb-1">Password</label>
        <input v-model="password" type="password" required class="mt-1 w-full border rounded px-3 py-2" />
      </div>

      <div>
        <label class="block text-sm text-gray-700 mb-1">Confirm password</label>
        <input v-model="confirmPassword" type="password" required class="mt-1 w-full border rounded px-3 py-2" />
      </div>

      <div v-if="error" class="text-red-600 text-sm">{{ error }}</div>

      <div class="flex items-center justify-between">
        <Button type="submit">Register</Button>
        <NuxtLink to="/auth" class="text-sm text-blue-600">Sign in</NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Typography, Button } from '~/shared/ui'

definePageMeta({ layout: 'auth' })

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const router = useRouter()

function onSubmit() {
  error.value = ''
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match'
    return
  }

  // TODO: replace with real registration API call and error handling
  console.log('Register', name.value, email.value)
  router.push('/')
}
</script>
