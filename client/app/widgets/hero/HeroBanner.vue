<template>
  <section class="grid grid-cols-2 h-[600px]">
    <div class="grid h-full grid-rows-2">
      <ProductCardMedium />

      <div class="grid grid-cols-2">
        <ProductCardSmall
          class="h-full"
          title="Apple AirPods"
          subtitle="Max"
          description="Computational audio. Listen, it's powerful."
          image="/images/AppleAirpods.png"

        />

        <ProductCardSmall
          dark
          class="h-full"
          title="Apple Vision"
          subtitle="Pro"
          description="An immersive way to experience entertainment."
          image="/images/AppleVision.png"

        />
      </div>
    </div>

    <ProductCardLarge />
  </section>
</template>

<script setup lang="ts">
import ProductCardLarge from "./cards/ProductCardL.vue"
import ProductCardMedium from "./cards/ProductCardM.vue"
import ProductCardSmall from "./cards/ProductCardS.vue"
</script>