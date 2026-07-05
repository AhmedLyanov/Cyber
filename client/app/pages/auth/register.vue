<template>
  <RegisterForm />
</template>

<script setup lang="ts">
import RegisterForm from "~/features/auth/ui/register-form.vue";

definePageMeta({
  layout: "auth",
});

useSeoMeta({
  title: "Create Account | Cyber",
  description:
    "Create a Cyber account to save your wishlist, track orders, and enjoy a faster checkout experience.",

  ogTitle: "Create Account | Cyber",
  ogDescription:
    "Join Cyber and start shopping today.",

  robots: "noindex, nofollow",
});

useHead({
  link: [
    {
      rel: "canonical",
      href: "https://cyber.com/register",
    },
  ],
});
</script>