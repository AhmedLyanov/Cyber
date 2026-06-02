<template>
    <div>
        <div class="grid grid-cols-4">
            <MostProductCard 
                v-for="product in mockProducts" 
                :key="product.id"
                :product="product"
                :bg-color="getCardColor(product.id)"
                :is-dark="product.id === 4"
            />
        </div>
    </div>
</template>

<script setup lang="ts">

import MostProductCard from "~/entities/most-product/ui/most-product-card.vue"

const mockProducts = [
    {
        id: 1,
        title: "Apple AirPods Max",
        description: "Experience high-fidelity audio with the Apple AirPods Max. With dynamic drivers and computational audio, they deliver immersive sound quality.",
        image: "/images/airpods-watch.png"
    },
    {
        id: 2,
        title: "Ipad Pro",
        description: "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
        image: "/images/IPad.png"
    },
    {
        id: 3,
        title: "Samsung Galaxy",
        description: "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
        image: "/images/smasung-phone.png"
    },
    {
        id: 4,
        title: "Macbook Pro",
        description: "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
        image: "/images/most-macbook.png"
    }
]


const getCardColor = (id: number) => {
    switch(id) {
        case 3: return 'gray'      
        case 4: return 'black'     
        default: return 'white'    
    }
}
</script>