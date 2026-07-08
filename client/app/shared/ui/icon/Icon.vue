<template>
    <img :src="iconSrc" :alt="name" class="icon" :class="sizeClass" />
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import ComputersIcon from '~/shared/assets/images/Computers.svg'
import PhonesIcon from '~/shared/assets/images/Phones.svg'
import GamingIcon from '~/shared/assets/images/Gaming.svg'
import HeadphonesIcon from '~/shared/assets/images/Headphones.svg'
import CamerasIcon from '~/shared/assets/images/Cameras.svg'
import SmartWatchesIcon from '~/shared/assets/images/Smart Watches.svg'
import ArrowLeft from '~/shared/assets/images/arrow_left.svg'
import ArrowRight from '~/shared/assets/images/arrow_right.svg'
import HeartIcon from '~/shared/assets/images/favourite.svg'
import HeartActiveIcon from '~/shared/assets/images/favouriteActive.svg'
import FilterArrow from '~/shared/assets/images/Filter-arrow.svg'
import BreadcrumbArrow from '~/shared/assets/images/Breadcrumb-arrow.svg'
import SearchIcon from '~/shared/assets/images/Search.svg'
import ExpandArrowDown from "~/shared/assets/images/Expand-down-light.svg"
import AccountIcon from '~/shared/assets/images/Account.svg'
import BatteryLogoIcon from '~/shared/assets/images/battery-logo.svg'
import CartIcon from '~/shared/assets/images/Cart.svg'
import CoreLogoIcon from '~/shared/assets/images/core-logo.svg'
import FavouritesIcon from '~/shared/assets/images/Favourites.svg'
import LogoCPU from '~/shared/assets/images/logo-cpu.svg'
import ProductCameraLogo from '~/shared/assets/images/product-camera-logo.svg'
import ProductCameraRotate from '~/shared/assets/images/product-camera-rotate.svg'
import ScreenSizeLogo from '~/shared/assets/images/Screen-size-logo.svg'
import Star from '~/shared/assets/images/Star.svg'
import Star_half from '~/shared/assets/images/Star-half.svg'
import Delete_card from "~/shared/assets/images/Close-cart.svg"
import Edit from "~/shared/assets/images/Edit.svg"
import NoEdit from "~/shared/assets/images/NoEdit.svg"

interface Props {
    name:
    | "computers"
    | "phones"
    | "gaming"
    | "headphones"
    | "cameras"
    | "smart-watches"
    | "arrow-left"
    | "arrow-right"
    | "favourite"
    | "star"
    | "star_half"
    | "delete_card"
    | "filter-arrow"
    | "breadcrumb-arrow"
    | "search"
    | "expand-arrow-down"
    | "account"
    | "battery-logo"
    | "cart"
    | "core-logo"
    | "favourites"
    | "logo-cpu"
    | "product-camera-logo"
    | "product-camera-rotate"
    | "screen-size-logo"
    | "edit"
    | "noedit";

    size?: "sm" | "md" | "lg";

    active?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    size: "md",
    active: false,
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
        'delete_card': Delete_card,
        favourite: props.active
            ? HeartActiveIcon
            : HeartIcon,
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