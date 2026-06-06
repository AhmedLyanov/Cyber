<template>
  <div
    v-bind="$attrs"
    ref="dropdownRef"
    class="relative"
  >
    <button
      @click="toggleDropdown"
      type="button"
      class="
        w-full
        flex
        items-center
        justify-between
        gap-3
        px-4
        py-2
        text-sm
        font-medium
        border
        border-dropdown-border
        rounded-md
        cursor-pointer
        focus:outline-none
        transition-all
        duration-150
      "
    >
      <span
        class="
          text-[14px]
          leading-5
          font-medium
          text-primary
          truncate
        "
      >
        {{ selectedItem || defaultLabel }}
      </span>

      <Icon
        name="filter-arrow"
        class="
          w-3
          h-[7px]
          text-primary
          flex-shrink-0
          transition-transform
          duration-150
        "
        :class="{ 'rotate-180': isOpen }"
      />
    </button>

    <Transition name="dropdown">
      <div
        v-if="isOpen"
        class="
          absolute
          z-10
          w-full
          mt-1
          py-1
          bg-white
          border
          border-dropdown-border
          rounded-md
          shadow-lg
          overflow-hidden
        "
      >
        <button
          v-for="(item, index) in items"
          :key="index"
          type="button"
          class="
            w-full
            px-4
            py-2
            text-left
            text-sm
            text-primary
            hover:bg-input
            transition-colors
            duration-100
          "
          :class="{
            'bg-input text-primary font-medium':
              selectedItem === item
          }"
          @click="selectItem(item)"
        >
          {{ item }}
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import {
  ref,
  watch,
  onMounted,
  onBeforeUnmount
} from 'vue'

import Icon from '../icon/icon.vue'

defineOptions({
  inheritAttrs: false
})

const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: () => []
  },

  defaultLabel: {
    type: String,
    default: 'Выберите опцию'
  },

  modelValue: {
    type: String,
    default: null
  }
})

const emit = defineEmits([
  'select',
  'update:modelValue'
])

const isOpen = ref(false)
const selectedItem = ref(props.modelValue)
const dropdownRef = ref(null)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectItem = (item) => {
  selectedItem.value = item
  isOpen.value = false

  emit('select', item)
  emit('update:modelValue', item)
}

const handleClickOutside = (event) => {
  if (
    dropdownRef.value &&
    !dropdownRef.value.contains(event.target)
  ) {
    isOpen.value = false
  }
}

const handleEscape = (event) => {
  if (
    event.key === 'Escape' &&
    isOpen.value
  ) {
    isOpen.value = false
  }
}

watch(
  () => props.modelValue,
  (newValue) => {
    selectedItem.value = newValue
  }
)

onMounted(() => {
  document.addEventListener(
    'click',
    handleClickOutside
  )

  document.addEventListener(
    'keydown',
    handleEscape
  )
})

onBeforeUnmount(() => {
  document.removeEventListener(
    'click',
    handleClickOutside
  )

  document.removeEventListener(
    'keydown',
    handleEscape
  )
})
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>