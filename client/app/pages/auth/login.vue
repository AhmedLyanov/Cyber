<template>
  <LoginForm />
</template>

<script setup lang="ts">
import LoginForm from "~/features/auth/ui/login-form.vue";

definePageMeta({
  layout: "auth",
});

useSeoMeta({
  title: "Sign In | Cyber",
  description:
    "Sign in to your Cyber account to access your orders, wishlist, and account settings.",

  ogTitle: "Sign In | Cyber",
  ogDescription:
    "Access your Cyber account and continue shopping.",

  robots: "noindex, nofollow",
});

useHead({
  link: [
    {
      rel: "canonical",
      href: "https://cyber.com/login",
    },
  ],
});
</script>