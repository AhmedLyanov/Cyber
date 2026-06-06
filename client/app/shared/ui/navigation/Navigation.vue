<template>
  <nav class="flex items-center gap-16">
    <div class="flex gap-13">
      <NuxtLink :to="routes.home">
        <Typography variant="navigation">Home</Typography>
      </NuxtLink>
      <NuxtLink :to="routes.about">
        <Typography variant="navigation">About</Typography>
      </NuxtLink>
      <NuxtLink :to="routes.contact">
        <Typography variant="navigation">Contact Us</Typography>
      </NuxtLink>
      <NuxtLink :to="routes.blog">
        <Typography variant="navigation">Blog</Typography>
      </NuxtLink>
    </div>
    <div class="flex gap-6">
      <NuxtLink :to="routes.favourites">
        <img :src="FavouritesLogo" alt="Favourites" />
      </NuxtLink>
      <NuxtLink :to="routes.cart">
        <img :src="CartLogo" alt="Cart" />
      </NuxtLink>
      <NuxtLink :to="routes.account">
        <img :src="AccountLogo" alt="Account" />
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
import Typography from '~/shared/ui/typography/Typography.vue'
import FavouritesLogo from '~/assets/images/Favourites.svg'
import CartLogo from '~/assets/images/Cart.svg'
import AccountLogo from '~/assets/images/Account.svg'
import { routes } from '~/shared/constants'
</script>