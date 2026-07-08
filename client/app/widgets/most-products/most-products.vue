<template>
    <div>
        <div class="grid grid-cols-4">

            <template v-if="isLoading">
                <div v-for="i in 4" :key="i" :class="[
                    'flex flex-col gap-4 py-14',
                    getCardColor(i)
                ]">
                    <Skeleton class="mx-auto h-[320px] w-[260px] rounded-xl" />

                    <div class="flex flex-col gap-3 px-4">

                        <Skeleton class="h-10 w-3/4" />
                        <Skeleton class="h-5 w-full" />
                        <Skeleton class="h-5 w-11/12" />
                        <Skeleton class="h-5 w-4/5" />


                        <Skeleton class="mt-4 h-14 w-[210px] rounded-xl" />

                    </div>
                </div>
            </template>

            <MostProductCard v-else v-for="product in mockProducts" :key="product.id" :product="product"
                :bg-color="getCardColor(product.id)" :is-dark="product.id === 4" />

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

import { Skeleton } from "~/shared/ui";
import MostProductCard from "~/widgets/most-product/ui/most-product-card.vue";

const isLoading = ref(true);

const mockProducts = [
    {
        id: 1,
        title: "Apple AirPods Max",
        description:
            "Experience high-fidelity audio with the Apple AirPods Max. With dynamic drivers and computational audio, they deliver immersive sound quality.",
        image: "/images/airpods-watch.png",
    },
    {
        id: 2,
        title: "Ipad Pro",
        description:
            "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
        image: "/images/IPad.png",
    },
    {
        id: 3,
        title: "Samsung Galaxy",
        description:
            "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
        image: "/images/smasung-phone.png",
    },
    {
        id: 4,
        title: "Macbook Pro",
        description:
            "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
        image: "/images/most-macbook.png",
    },
];

const getCardColor = (id: number) => {
    switch (id) {
        case 3:
            return "gray";
        case 4:
            return "black";
        default:
            return "white";
    }
};

onMounted(() => {
    setTimeout(() => {
        isLoading.value = false;
    }, 500);
});
</script>