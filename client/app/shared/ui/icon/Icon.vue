<template>
    <img :src="iconSrc" :alt="name" class="icon" :class="sizeClass" />
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
import SearchIcon from '~/assets/images/Search.svg'
import ExpandArrowDown from "~/assets/images/Expand-down-light.svg"
import AccountIcon from '~/assets/images/Account.svg'
import BatteryLogoIcon from '~/assets/images/battery-logo.svg'
import CartIcon from '~/assets/images/Cart.svg'
import CoreLogoIcon from '~/assets/images/core-logo.svg'
import FavouritesIcon from '~/assets/images/Favourites.svg'
import LogoCPU from '~/assets/images/logo-cpu.svg'
import ProductCameraLogo from '~/assets/images/product-camera-logo.svg'
import ProductCameraRotate from '~/assets/images/product-camera-rotate.svg'
import ScreenSizeLogo from '~/assets/images/Screen-size-logo.svg'
import Star from '~/assets/images/Star.svg'
import Star_half from '~/assets/images/Star-half.svg'
import Close_Cart from "~/assets/images/Close-cart.svg"
import Edit from "~/assets/images/Edit.svg"
import NoEdit from "~/assets/images/NoEdit.svg"

interface Props {
    name:
    | 'computers'
    | 'phones'
    | 'gaming'
    | 'headphones'
    | 'cameras'
    | 'smart-watches'
    | 'arrow-left'
    | 'arrow-right'
    | 'favourite'
    | 'star'
    | 'star_half'
    | "close_cart"
    | 'filter-arrow'
    | 'breadcrumb-arrow'
    | 'search'
    | 'expand-arrow-down'
    | 'account'
    | 'battery-logo'
    | 'cart'
    | 'core-logo'
    | 'favourites'
    | 'logo-cpu'
    | 'product-camera-logo'
    | 'product-camera-rotate'
    | 'screen-size-logo'
    | 'edit'
    | 'noedit'

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
        'expand-arrow-down': ExpandArrowDown,
        star: Star,
        'star-half': Star_half,
        'close_cart': Close_Cart,
        favourite: HeartIcon,
        'filter-arrow': FilterArrow,
        'breadcrumb-arrow': BreadcrumbArrow,
        search: SearchIcon,
        account: AccountIcon,
        'battery-logo': BatteryLogoIcon,
        cart: CartIcon,
        'core-logo': CoreLogoIcon,
        favourites: FavouritesIcon,
        'logo-cpu': LogoCPU,
        'product-camera-logo': ProductCameraLogo,
        'product-camera-rotate': ProductCameraRotate,
        'screen-size-logo': ScreenSizeLogo,
        edit: Edit,
        noedit: NoEdit
    }
    return icons[props.name]
})

const sizeClass = computed(() => ({
    'w-4 h-4': props.size === 'sm',
    'w-6 h-6': props.size === 'md',
    'w-8 h-8': props.size === 'lg'
}))
</script>