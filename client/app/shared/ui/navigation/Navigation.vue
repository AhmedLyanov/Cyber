<template>
  <nav class="flex items-center gap-16 ">
      <div class="flex gap-13">
          <NuxtLink to="/">
              <Typography variant="navigation">Home</Typography>
          </NuxtLink>
          <NuxtLink to="/about">
              <Typography variant="navigation">About</Typography>
          </NuxtLink>
          <NuxtLink to="/contact">
              <Typography variant="navigation">Contact Us</Typography>
          </NuxtLink>
          <NuxtLink to="/blog">
              <Typography variant="navigation">Blog</Typography>
          </NuxtLink>
      </div>
      <div class="flex gap-6">
          <NuxtLink to="/favourites">
              <img :src="FavouritesLogo" alt="">
          </NuxtLink>
          <NuxtLink to="/cart">
              <img :src="CartLogo" alt="">

          </NuxtLink>
          <NuxtLink to="/account">
              <img :src="AccountLogo" alt="">
          </NuxtLink>
      </div>
  </nav>

  
</template>

<script setup lang="ts">
import Typography from '~/shared/ui/typography/Typography.vue'
import FavouritesLogo from '~/assets/images/Favourites.svg'
import CartLogo from '~/assets/images/Cart.svg'
import AccountLogo from '~/assets/images/Account.svg'
</script>