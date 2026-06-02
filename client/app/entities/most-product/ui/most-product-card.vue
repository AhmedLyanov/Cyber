<script setup lang="ts">
import ProductContent from "~/entities/product/ui/product-content.vue"

interface Product {
    id: number
    title: string
    description: string
    image: string
}

interface Props {
    product: Product
    bgColor?: 'white' | 'gray' | 'black'
    isDark?: boolean
}

const props = defineProps<Props>()

const bgColorClass = computed(() => {
    switch(props.bgColor) {
        case 'gray': return 'bg-product-most-gray'
        case 'black': return 'bg-product-most-black'
        default: return 'bg-product-most-white'
    }
})
</script>

<template>
    <div :class="['flex flex-col gap-4 py-14 pb-14', bgColorClass]">
        <NuxtImg 
            :src="product.image" 
            :alt="product.title" 
            class="w-full h-81.75 object-cover rounded-lg"
        />
        <div class="flex flex-col gap-2 px-4">
            <ProductContent
                :title="product.title"
                :description="product.description"
                title-variant="h3"
                showButton
                :dark="isDark"
            />
        </div>
    </div>
</template>