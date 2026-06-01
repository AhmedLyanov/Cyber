<template>
    <div class="px-40 py-16">
        <div class="flex justify-between items-center mb-8">
            <Typography variant="h3">
                Browse By Category
            </Typography>
            <div class="flex gap-4">
                <Icon name="arrow-left" size="md" />
                <Icon name="arrow-right" size="md" />
            </div>
        </div>

        <div class="flex gap-6 overflow-x-auto">
            <CategoryCard v-for="category in categories" :key="category.id" :category="category" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Typography, Button, Icon } from "~/shared/ui"
import CategoryCard from "./ui/category-card.vue"

const categories = [
    { id: 1, title: 'Computers', icon: 'computers' },
    { id: 2, title: 'Phones', icon: 'phones' },
    { id: 3, title: 'Gaming', icon: 'gaming' },
    { id: 4, title: 'Headphones', icon: 'headphones' },
    { id: 5, title: 'Cameras', icon: 'cameras' },
    { id: 6, title: 'Smart Watches', icon: 'smart-watches' }
]
</script>