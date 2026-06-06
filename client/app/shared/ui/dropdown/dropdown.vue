<template>
  <div class="w-full" ref="dropdownRef">
    <button
      @click="toggleDropdown"
      type="button"
      class="w-full flex items-center justify-between gap-3 transition-all duration-150"
      :class="buttonClasses"
    >
      <span :class="textClasses">{{ selectedItem || defaultLabel }}</span>
      <Icon 
        name="filter-arrow" 
        class="text-gray-500 transition-transform duration-150 flex-shrink-0" 
        :class="[iconSizeClasses, { 'rotate-180': isOpen }]"
      />
    </button>

    <Transition name="dropdown">
      <div
        v-if="isOpen"
        class="mt-1 w-full bg-white overflow-hidden py-1"
        :class="dropdownWrapperClasses"
      >
        <button
          v-for="(item, index) in items"
          :key="index"
          @click="selectItem(item)"
          type="button"
          class="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-100 text-sm"
          :class="{ 'bg-gray-100 text-gray-900 font-medium': selectedItem === item }"
        >
          {{ item }}
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue'
import Icon from '../icon/icon.vue'

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
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'bordered'].includes(value)
  }
})

const emit = defineEmits(['select', 'update:modelValue'])

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
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

const handleEscape = (event) => {
  if (event.key === 'Escape' && isOpen.value) {
    isOpen.value = false
  }
}

watch(() => props.modelValue, (newVal) => {
  if (newVal !== selectedItem.value) {
    selectedItem.value = newVal
  }
})

const buttonClasses = computed(() => {
  if (props.variant === 'bordered') {
    return 'px-4 py-2 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2'
  }
  return 'py-3 text-sm font-medium border-b hover:bg-gray-50 focus:outline-none'
})

const textClasses = computed(() => {
  if (props.variant === 'bordered') {
    return 'text-[14px] leading-5 font-medium truncate'
  }
  return 'text-[18px] leading-6 font-medium truncate'
})

const iconSizeClasses = computed(() => {
  return 'w-3 h-[7px]'
})

const dropdownWrapperClasses = computed(() => {
  if (props.variant === 'bordered') {
    return 'border border-gray-300 rounded-md mt-1'
  }
  return ''
})

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleEscape)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleEscape)
})
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>