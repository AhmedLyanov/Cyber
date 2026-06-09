<script setup lang="ts">
import { ref, computed } from "vue";
import {
    Breadcrumbs,
    Typography,
    Icon,
    Button,
    Input
} from "../shared/ui";
import ProductCard from "~/entities/product/ui/product-card.vue";

const showAllDetails = ref(false);

const allDetailSections = [
    {
        title: "Screen",
        items: [
            { label: "Screen diagonal", value: '6.7"' },
            { label: "The screen resolution", value: "2796x1290" },
            { label: "The screen refresh rate", value: "120 Hz" },
            { label: "The pixel density", value: "460 ppi" },
            { label: "Screen type", value: "OLED" },
            { label: "Additionally", value: "Dynamic Island, Always-On display, HDR display, True Tone, Wide color (P3)" }
        ]
    },
    {
        title: "CPU",
        items: [
            { label: "CPU", value: "A16 Bionic" },
            { label: "Number of cores", value: "6" }
        ]
    },
    {
        title: "Camera",
        items: [
            { label: "Main camera", value: "48-12-12 MP" },
            { label: "Front-camera", value: "12 MP" }
        ]
    },
    {
        title: "Battery",
        items: [
            { label: "Battery capacity", value: "4323 mAh" },
            { label: "Charging", value: "Fast charging, MagSafe wireless charging" },
            { label: "Battery type", value: "Li-Ion" }
        ]
    },
    {
        title: "Memory",
        items: [
            { label: "Built-in memory", value: "1TB" },
            { label: "RAM", value: "6GB" },
            { label: "Memory card support", value: "No" }
        ]
    },
    {
        title: "Protection",
        items: [
            { label: "Protection class", value: "IP68" },
            { label: "Glass protection", value: "Ceramic Shield" },
            { label: "Water resistance", value: "Up to 6 meters for 30 minutes" }
        ]
    },
    {
        title: "Additional Information",
        items: [
            { label: "Operating system", value: "iOS 16" },
            { label: "Sensors", value: "Face ID, accelerometer, gyro, proximity, compass, barometer" },
            { label: "Connectivity", value: "5G, Wi-Fi 6E, Bluetooth 5.3, NFC" }
        ]
    }
];


const visibleSections = computed(() => {
    return showAllDetails.value
        ? allDetailSections
        : allDetailSections.slice(0, 2);
});

const productImages = [
    "https://c.dns-shop.ru/thumb/st1/fit/0/0/d11418b29d34e7a7af996ecb9c716db5/e38ab5d5f2707bad34699e3ef919dabef58c7d3f1f6f0af61f4e1cde2601b5d3.jpg.webp",
    "https://c.dns-shop.ru/thumb/st1/fit/0/0/e8e45d091d1e887fd122748f5f92f731/34ac560ca7e47845cac4c328a993caf2f5956953710c12c88384e0ca789a54be.jpg.webp",
    "https://c.dns-shop.ru/thumb/st1/fit/0/0/c8756616c5522b7a30b36ac8e8e84f42/3512ff2d8615c92ddcd9c0f554b0d2e6775a281aa070fbd549c528920bb91ec4.jpg.webp",
    "https://c.dns-shop.ru/thumb/st1/fit/0/0/63fbc5338763534ee2b9d022c007b073/4b380065c2bb57c9b19efbb358cb5e2e696b5750841f225eb627b3516daf3d35.jpg.webp",
];

const selectedImage = ref(productImages[0]);

const product = {
    _id: "6852bce3d9e123456789abcd",
    title: "Apple iPhone 14 Pro Max",
    description: "Enhanced capabilities thanks to an enlarged display of 6.7 inches and work without recharging throughout the day. Incredible photos in both low and bright light using the new dual-camera system.",
    price: 1399,
    originalPrice: 1599,
    discountPercentage: 10,
    hasDiscount: true,
    isDiscountActive: true,
    type: "smartphone",
    brand: "Apple",
    image: "iphone14promax.png",
    specs: {
        screenType: "OLED",
        screenDiagonal: '6.7"',
        batteryCapacity: "4323 mAh",
        builtInMemory: "1TB",
        protectionClass: "IP68",
        cpu: "Apple A16 Bionic",
    },
    owner: "6852bce3d9e123456789ffff",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
};

const selectedGb = ref(product.specs.builtInMemory);

const capacities = ["128GB", "256GB", "512GB", "1TB"];

const colors = [
    { id: "black", name: "Black", class: "bg-product-black" },
    { id: "purple", name: "Purple", class: "bg-product-purple" },
    { id: "red", name: "Red", class: "bg-product-red" },
    { id: "gold", name: "Gold", class: "bg-product-gold" },
    { id: "silver", name: "Silver", class: "bg-product-silver border border-gray-200" },
];

const specifications = [
    { icon: "screen-size-logo", title: "Screen size", value: '6.7"' },
    { icon: "logo-cpu", title: "CPU", value: "Apple A16 Bionic" },
    { icon: "core-logo", title: "Number of Cores", value: "6" },
    { icon: "product-camera-logo", title: "Main camera", value: "48-12-12 MP" },
    { icon: "product-camera-rotate", title: "Front-camera", value: "12 MP" },
    { icon: "battery-logo", title: "Battery capacity", value: "4323 mAh" },
];

const breadcrumbItems = [
    { label: "Home", to: "/" },
    { label: "Catalog", to: "/" },
    { label: "Smartphones", to: "/" },
    { label: product.brand, to: "/" },
    { label: product.title, to: "/" },
];

const reviews = [
    {
        id: 1,
        author: "Grace Carey",
        avatar:
            "https://randomuser.me/api/portraits/women/44.jpg",
        rating: 4,
        date: "24 January,2023",
        comment:
            "I was a bit nervous to be buying a secondhand phone from Amazon, but I couldn’t be happier with my purchase!! I have a pre-paid data plan so I was worried that this phone wouldn’t connect with my data plan, since the new phones don’t have the physical Sim tray anymore, but couldn’t have been easier! I bought an Unlocked black iPhone 14 Pro Max in excellent condition and everything is PERFECT. It was super easy to set up and the phone works and looks great. It truly was in excellent condition. Highly recommend!!!🖤"
    },
    {
        id: 2,
        author: "Ronald Richards",
        avatar:
            "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 5,
        date: "24 January,2023",
        comment:
            "This phone has 1T storage and is durable. Plus all the new iPhones have a C port! Apple is phasing out the current ones! (All about the Benjamin’s) So if you want a phone that’s going to last grab an iPhone 14 pro max and get several cords and plugs."
    }
];
</script>

<template>
    <Breadcrumbs :items="breadcrumbItems" />

    <!-- hero section -->
    <section class="flex items-center gap-12 px-40 py-28">
        <div class="flex items-center gap-12">
            <div class="flex flex-col gap-4">
                <button v-for="image in productImages" :key="image" @click="selectedImage = image"
                    class="w-20 h-20 rounded-xl overflow-hidden transition-all">
                    <img :src="image" alt="" class="w-full h-full object-contain" />
                </button>
            </div>

            <div class="w-132.5 h-125 flex items-center justify-center">
                <img :src="selectedImage" :alt="product.title" class="w-full h-full object-contain" />
            </div>
        </div>

        <div class="">
            <div class="grid gap-8">
                <div>
                    <Typography as="h1" variant="titleLg" class="mb-6">
                        {{ product.title }}
                    </Typography>
                    <Typography variant="priceLg">
                        ${{ product.price }}
                    </Typography>
                </div>

                <div class="flex items-center gap-6">
                    <Typography variant="body">Select color:</Typography>
                    <div class="flex gap-2">
                        <button v-for="color in colors" :key="color.id" :class="[
                            'w-8 h-8 rounded-full transition-transform hover:scale-110',
                            color.class
                        ]" :aria-label="`${color.name} color`" />
                    </div>
                </div>

                <div class="flex flex-wrap gap-4">
                    <Button v-for="capacity in capacities" :key="capacity" variant="option"
                        :selected="selectedGb === capacity" @click="selectedGb = capacity">
                        {{ capacity }}
                    </Button>
                </div>

                <div class="flex flex-wrap gap-4">
                    <div v-for="specification in specifications" :key="specification.title"
                        class="min-w-42 flex-1 flex items-center gap-2 bg-product-attributes rounded-[7px] p-4">
                        <Icon :name="specification.icon" size="lg" class="text-product-attributes-icon" />
                        <div>
                            <Typography variant="description">{{ specification.title }}</Typography>
                            <Typography variant="description">{{ specification.value }}</Typography>
                        </div>
                    </div>
                </div>

                <Typography variant="description" class="max-w-xl">
                    {{ product.description }}
                </Typography>
            </div>

            <div class="flex gap-4 mt-8">
                <Button class="w-65" variant="outline">Add to Wishlist</Button>
                <Button class="w-65">Add to Cart</Button>
            </div>
        </div>
    </section>
    <!-- details section -->
    <section class="bg-product-details-bg px-40 py-20">
        <div class="bg-product-details-window-bg py-12 px-10 rounded-xl">
            <Typography variant="h3">Details</Typography>
            <Typography class="mt-8" variant="description">
                Just as a book is judged by its cover, the first thing you notice when you pick up a modern smartphone
                is the display. Nothing surprising, because advanced technologies allow you to practically level the
                display frames and cutouts for the front camera and speaker, leaving no room for bold design solutions.
                And how good that in such realities Apple everything is fine with displays. Both critics and mass
                consumers always praise the quality of the picture provided by the products of the Californian brand.
                And last year's 6.7-inch Retina panels, which had ProMotion, caused real admiration for many.
            </Typography>


            <div v-for="section in visibleSections" :key="section.title" class="mt-8">
                <Typography class="pb-4" variant="h3">{{ section.title }}</Typography>
                <div class="grid gap-6">
                    <div v-for="item in section.items" :key="item.label"
                        class="w-full flex pb-2 justify-between border-b border-product-details-border">
                        <Typography class="text-[16px] leading-6" variant="body">{{ item.label }}</Typography>
                        <Typography variant="body">{{ item.value }}</Typography>
                    </div>
                </div>
            </div>


            <div class="flex justify-center mt-8">
                <Button variant="outline" class="min-w-[180px]" @click="showAllDetails = !showAllDetails">
                    {{ showAllDetails ? "Show Less" : "View More" }}
                    <Icon name="expand-arrow-down" size="md" class="transition-transform duration-300 ml-2" :class="{
                        'rotate-180': showAllDetails
                    }" />
                </Button>


            </div>
        </div>
    </section>

    <!-- reviews section -->
    <section class="px-40 py-22">
        <div class="grid gap-12">
            <Typography variant="h3">
                Reviews
            </Typography>

            <div class="flex gap-15">
                <div
                    class="w-[184px] h-[192px]  bg-product-reviews-rating rounded-[16px] flex flex-col items-center justify-center">
                    <Typography class="text-[56px] font-medium leading-none" variant="body">
                        4.8
                    </Typography>

                    <Typography class="mt-4 text-product-description" variant="description">
                        of 125 reviews
                    </Typography>

                    <div class="flex gap-1 mt-6">
                        <Icon name="star" size="md" class="text-[#FFB547]" />
                        <Icon name="star" size="md" class="text-[#FFB547]" />
                        <Icon name="star" size="md" class="text-[#FFB547]" />
                        <Icon name="star" size="md" class="text-[#FFB547]" />
                        <Icon name="star-half" size="md" class="text-[#FFB547]" />
                    </div>
                </div>

                <div class="flex-1 grid gap-4">
                    <div v-for="item in [
                        { label: 'Excellent', value: 100, percent: 98 },
                        { label: 'Good', value: 11, percent: 55 },
                        { label: 'Average', value: 3, percent: 22 },
                        { label: 'Below Average', value: 8, percent: 46 },
                        { label: 'Poor', value: 1, percent: 9 }
                    ]" :key="item.label" class="grid grid-cols-[180px_1fr_40px] items-center gap-4">
                        <Typography variant="body">
                            {{ item.label }}
                        </Typography>

                        <div class="h-[6px] rounded-full bg-product-reviews-rating-empty overflow-hidden">
                            <div class="h-full rounded-full bg-product-reviews-rating-fill"
                                :style="{ width: `${item.percent}%` }" />
                        </div>

                        <Typography class="text-right text-product-description" variant="description">
                            {{ item.value }}
                        </Typography>
                    </div>
                </div>
            </div>
            <Input placeholder="Leave Comment" variant="comment" />
        </div>
        <div class="mt-8 grid gap-6">

            <div v-for="review in reviews" :key="review.id"
                class="flex gap-6 border-b bg-product-reviews-comment-bg px-4  py-6 ">

                <img :src="review.avatar" :alt="review.author" class="w-14 h-14 rounded-full object-cover shrink-0">

                <div class="flex-1">
                    <div class="flex justify-between items-start">
                        <div>
                            <Typography variant="h3" class="text-[17px] mb-3">
                                {{ review.author }}
                            </Typography>

                            <div class="flex gap-1 mb-4">
                                <Icon v-for="star in review.rating" :key="star" name="star" size="md" class="w-6 h-6" />
                            </div>
                        </div>

                        <Typography variant="description" class="text-product-description">
                            {{ review.date }}
                        </Typography>
                    </div>

                    <Typography variant="description" class="leading-8">
                        {{ review.comment }}
                    </Typography>
                </div>
            </div>
        </div>
    </section>

    <!-- Related Products sections -->
    <section class="px-40 py-20">
        <Typography variant="h3">Related Products</Typography>
        <div class="grid grid-cols-4 gap-4 mt-8">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
        </div>


    </section>
</template>