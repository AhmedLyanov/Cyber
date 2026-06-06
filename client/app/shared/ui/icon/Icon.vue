<template>
    <img 
        :src="iconSrc" 
        :alt="name"
        class="icon"
        :class="sizeClass"
    />
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import ComputersIcon from '~/assets/images/Computers.svg'
import PhonesIcon from '~/assets/images/Phones.svg'
import GamingIcon from '~/assets/images/Gaming.svg'
import HeadphonesIcon from '~/assets/images/Headphones.svg'
import CamerasIcon from '~/assets/images/Cameras.svg'
import SmartWatchesIcon from '~/assets/images/Smart Watches.svg'
import ArrowLeft from '~/assets/images/arrow_left.svg'
import ArrowRight from '~/assets/images/arrow_right.svg'
import HeartIcon from '~/assets/images/favourite.svg'
import FilterArrow from '~/assets/images/Filter-arrow.svg'
import BreadcrumbArrow from '~/assets/images/Breadcrumb-arrow.svg'

interface Props {
    name: 'computers' | 'phones' | 'gaming' | 'headphones' | 'cameras' | 'smart-watches' | 'arrow-left' | 'arrow-right' | 'favourite' | 'filter-arrow' | 'breadcrumb-arrow';
    size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
    size: 'md'
})

const iconSrc = computed(() => {
    const icons = {
        computers: ComputersIcon,
        phones: PhonesIcon,
        gaming: GamingIcon,
        headphones: HeadphonesIcon,
        cameras: CamerasIcon,
        'smart-watches': SmartWatchesIcon,
        'arrow-left': ArrowLeft,
        'arrow-right': ArrowRight,
        favourite: HeartIcon,
        'filter-arrow': FilterArrow,
        'breadcrumb-arrow': BreadcrumbArrow
    }
    return icons[props.name]
})

const sizeClass = computed(() => ({
    'w-4 h-4': props.size === 'sm',
    'w-6 h-6': props.size === 'md',
    'w-8 h-8': props.size === 'lg'
}))
</script>