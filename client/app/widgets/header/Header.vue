<template>
  <header 
    ref="headerRef"
    class="sticky top-0 z-50 w-full border-b border-header-border bg-background/80 backdrop-blur-md transition-shadow duration-300"
    :class="{ 'shadow-md': isScrolled }"
  >
    <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
      <Logo class="shrink-0" />

      <div class="hidden flex-1 md:block">
        <Input 
          placeholder="Search" 
          icon="search" 
          class="w-full max-w-md"
        />
      </div>
      <Navigation class="hidden lg:flex" />
      <div class="flex items-center gap-2 md:hidden">
        <button 
          @click="showMobileSearch = true"
          class="rounded-full p-2 hover:bg-muted/50"
          aria-label="Search"
        >
          <Icon name="search" class="size-5" />
        </button>
      
        <button 
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="rounded-full p-2 hover:bg-muted/50"
          aria-label="Toggle menu"
        >
          <Icon :name="mobileMenuOpen ? 'x' : 'menu'" class="size-5" />
        </button>
      </div>
    </div>

    <Transition name="slide-down">
      <div 
        v-if="showMobileSearch"
        class="border-t border-header-border bg-background p-4 md:hidden"
      >
        <Input 
          v-model="searchQuery"
          placeholder="Search" 
          icon="search" 
          class="w-full"
          autofocus
        />
      </div>
    </Transition>

    <Transition name="slide-down">
      <div 
        v-if="mobileMenuOpen"
        class="border-t border-header-border bg-background p-4 lg:hidden"
      >
        <Navigation class="flex flex-col gap-2" />
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Logo, Input, Navigation } from '~/shared/ui';

const headerRef = ref<HTMLElement | null>(null);
const isScrolled = ref(false);
const mobileMenuOpen = ref(false);
const showMobileSearch = ref(false);
const searchQuery = ref('');

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
const handleResize = () => {
  if (window.innerWidth >= 1024) {
    mobileMenuOpen.value = false;
    showMobileSearch.value = false;
  }
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.25s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.slide-down-enter-to,
.slide-down-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>