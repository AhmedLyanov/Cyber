<template>
    <div class="pb-6">
        <button class="
        w-full
        flex
        items-center
        justify-between
        py-3
        border-b-[0.5px]
        border-filters-color
        transition-all
        duration-150
      " @click="isOpen = !isOpen">
            <span class="
          text-[18px]
          leading-6
          font-medium
          text-primary
        ">
                {{ title }}
            </span>

            <Icon name="filter-arrow" class="
          w-3
          h-[7px]
          transition-transform
          duration-150
        " :class="{ 'rotate-180': isOpen }" />
        </button>

        <Transition name="dropdown">
            <div v-if="isOpen" class="pt-4">
                <div v-if="searchable" class="mb-4">
                    <Input v-model="search" placeholder="Search" icon="search" variant="compact" />
                </div>

                <label v-for="item in filteredItems" :key="item.label" class="
            flex
            items-center
            py-2
            cursor-pointer
          ">
                    <input v-model="selected" :value="item.label" type="checkbox" class="
              w-4
              h-4
              rounded
              border
              border-filters-input-color
            ">

                        <span class="
              ml-2
              text-[15px]
              font-medium
              text-primary
            ">
                            {{ item.label }}
                        </span>

                        <span class="
              ml-1
              text-[13px]
              text-filters-count
            ">
                            {{ item.count }}
                        </span>
                </label>
            </div>
        </Transition>
    </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

import Icon from '../icon/icon.vue'
import Input from '../input/input.vue'

const emit = defineEmits([
  'change'
])

const props = defineProps({
  title: {
    type: String,
    required: true
  },

  items: {
    type: Array,
    default: () => []
  },

  searchable: {
    type: Boolean,
    default: false
  }
})

const isOpen = ref(false)
const search = ref('')
const selected = ref([])

watch(selected, (value) => {
  emit('change', value)
}, { deep: true })

const filteredItems = computed(() => {
  if (!search.value) {
    return props.items
  }

  return props.items.filter(item =>
    item.label
      .toLowerCase()
      .includes(search.value.toLowerCase())
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