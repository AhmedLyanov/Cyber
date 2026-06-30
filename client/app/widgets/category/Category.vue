<template>
    <section class="bg-category-background px-4 py-8 sm:px-6 md:px-10 lg:px-40 lg:py-16">
        <div class="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-6 md:mb-8">
            <Typography variant="h3" class="text-center sm:text-left">
                Browse By Category
            </Typography>
            <div class="flex justify-center sm:justify-end gap-3 md:gap-4">
                <Icon 
                    name="arrow-left" 
                    size="md" 
                    class="cursor-pointer hover:opacity-70 transition-opacity"
                    @click="scroll('left')"
                />
                <Icon 
                    name="arrow-right" 
                    size="md" 
                    class="cursor-pointer hover:opacity-70 transition-opacity"
                    @click="scroll('right')"
                />
            </div>
        </div>

        <div class="relative">
            <div 
                ref="scrollContainer"
                class="flex gap-4 md:gap-6 overflow-x-auto scroll-smooth hide-scrollbar"
            >
                <CategoryCard 
                    v-for="category in categories" 
                    :key="category.id" 
                    :category="category"
                    class="shrink-0 w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px]"
                />
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Typography, Icon } from "~/shared/ui";
import CategoryCard from "./ui/category-card.vue";

const categories = [
    { id: 1, title: 'Computers', icon: 'computers' },
    { id: 2, title: 'Phones', icon: 'phones' },
    { id: 3, title: 'Gaming', icon: 'gaming' },
    { id: 4, title: 'Headphones', icon: 'headphones' },
    { id: 5, title: 'Cameras', icon: 'cameras' },
    { id: 6, title: 'Smart Watches', icon: 'smart-watches' }
];

const scrollContainer = ref<HTMLElement | null>(null);

const scroll = (direction: 'left' | 'right') => {
    const el = scrollContainer.value;
    if (!el) return;
    
    const cardWidth = window.innerWidth < 640 ? 140 : window.innerWidth < 768 ? 160 : window.innerWidth < 1024 ? 180 : 200;
    const gap = window.innerWidth < 768 ? 16 : 24;
    const scrollAmount = direction === 'left' ? -(cardWidth + gap) : (cardWidth + gap);
    
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
};
</script>

<style scoped>
.hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.hide-scrollbar::-webkit-scrollbar {
    display: none;
}
</style>