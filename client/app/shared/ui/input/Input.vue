<template>
  <div class="flex items-center bg-input rounded-lg max-w-96 w-96 h-14">
      <div class="py-4 pl-4">
          <img :src="SearchLogo" class="w-6 h-6" alt="Search"/>
      </div>
    <input type="text" placeholder="Search" class="w-full h-full placeholder:color-placeholder outline-0" />
  </div>
</template>

<script setup lang="ts">
import SearchLogo from "~/assets/images/Search.svg"
</script>