<template>
  <div class="pb-2">
    <button
      class="
        w-full
        flex
        items-center
        justify-between
        py-3
        border-b
        border-[#CDCDCD]
        transition-all
        duration-150
      "
      @click="isOpen = !isOpen"
    >
      <span
        class="
          text-[18px]
          leading-6
          font-medium
          text-primary
        "
      >
        {{ title }}
      </span>

      <Icon
        name="filter-arrow"
        class="
          w-3
          h-[7px]
          transition-transform
          duration-150
        "
        :class="{ 'rotate-180': isOpen }"
      />
    </button>

    <Transition name="dropdown">
      <div
        v-if="isOpen"
        class="pt-4"
      >
        <div
          v-if="searchable"
          class="
            flex
            items-center
            gap-2
            h-10
            px-4
            mb-4
            rounded-lg
            bg-[#F5F5F5]
          "
        >
          <input
            v-model="search"
            type="text"
            placeholder="Search"
            class="
              flex-1
              bg-transparent
              outline-none
              text-[14px]
            "
          >
        </div>

        <label
          v-for="item in filteredItems"
          :key="item.label"
          class="
            flex
            items-center
            gap-3
            py-2
            cursor-pointer
          "
        >
          <input
            v-model="selected"
            :value="item.label"
            type="checkbox"
            class="
              w-4
              h-4
              rounded
              border
              border-[#D1D1D1]
            "
          >

          <span
            class="
              flex-1
              text-[15px]
              font-medium
              text-primary
            "
          >
            {{ item.label }}
          </span>

          <span
            class="
              text-[15px]
              text-[#8B8B8B]
            "
          >
            {{ item.count }}
          </span>
        </label>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import Icon from '../icon/icon.vue'

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