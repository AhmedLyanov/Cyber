<template>
  <nav class="flex px-40 py-10">
    <div class="flex items-center text-sm" style="gap: 25px">
      <template v-for="(item, index) in breadcrumbItems" :key="index">
        <router-link 
          v-if="!item.isActive && item.to"
          :to="item.to"
          class="font-medium text-[16px] leading-4 text-breadcrumbs-link"
        >
          {{ item.label }}
        </router-link>
        <span v-else class="text-primary font-medium text-[16px] leading-4">
          {{ item.label }}
        </span>
        <Icon 
          v-if="index !== breadcrumbItems.length - 1" 
          name="breadcrumb-arrow"
          size="sm"
          class="w-4 h-4"
        />
      </template>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import Icon from '../icon/icon.vue'

const props = defineProps({
  items: { type: Array, required: true }
})

const breadcrumbItems = computed(() => 
  props.items.map((item, idx) => ({ 
    ...item, 
    isActive: idx === props.items.length - 1 
  }))
)
</script>