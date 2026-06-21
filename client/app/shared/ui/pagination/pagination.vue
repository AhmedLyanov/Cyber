<template>
  <div class="pagination">
    <Button
      class="w-8 h-8"
      v-for="page in pages"
      :key="page"
      :variant="currentPage === page ? 'primary' : 'ghost'"
      @click="$emit('change', page)"
    >
      {{ page }}
    </Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from "~/shared/ui";

defineProps<{
  currentPage: number;
  pages: number;
}>();

defineEmits<{
  change: [page: number];
}>();
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  gap: 8px;
}
</style>