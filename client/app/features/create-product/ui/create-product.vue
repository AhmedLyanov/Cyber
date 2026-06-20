<template>
  <div class="create-product-page">
    <div class="flex flex-wrap items-center justify-between gap-4 mb-8">
      <div>
        <Typography variant="h3" class="text-2xl md:text-3xl font-semibold">
          Create new product
        </Typography>
        <Typography variant="bodySm" class="text-gray-500 mt-1">
          Fill all fields — the product will be visible in the catalog
        </Typography>
      </div>
      <div class="flex gap-3">
        <Button 
          variant="outline" 
          @click="saveDraft"
          :disabled="isLoading"
        >
          <Icon name="save" size="sm" class="mr-1" />
          Save draft
        </Button>
      </div>
    </div>
    
    <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
      {{ error }}
    </div>
    <div v-if="successMessage" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
      {{ successMessage }}
    </div>
    
    <form @submit.prevent="submitForm" class="flex flex-col lg:flex-row gap-8">
      <div class="flex-1 space-y-6">
        <div class="bg-white rounded-lg border border-gray-100 p-6 shadow-sm">
          <div class="flex items-center justify-between mb-4">
            <Typography variant="h3" class="text-lg font-semibold">
              Product image
            </Typography>
            <span class="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full">Required</span>
          </div>
          <div class="flex flex-col sm:flex-row gap-6 items-start">
            <div
              class="w-40 h-40 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden">
              <img :src="imagePreview || '/images/placeholder.png'" alt="Preview"
                class="max-w-full max-h-full object-contain" />
            </div>
            <div class="flex-1 space-y-3">
              <label class="block">
                <span class="text-sm font-medium text-gray-700">Upload image</span>
                <input type="file" accept="image/*" @change="handleImageUpload" class="hidden" ref="fileInput">
                <Button type="button" variant="outline" @click="() => fileInput?.click()" :disabled="isLoading">
                  <Icon name="upload" size="sm" class="mr-1" />
                  Choose file
                </Button>
              </label>
              <Typography variant="caption" class="text-gray-400">
                Recommended: PNG, JPG up to 5MB
              </Typography>
              <p v-if="imageFile" class="text-xs text-green-600">
                Selected: {{ imageFile.name }}
              </p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg border border-gray-100 p-6 shadow-sm space-y-5">
          <Typography variant="h3" class="text-lg font-semibold border-b border-gray-100 pb-2">
            General information
          </Typography>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Product title *</label>
            <input v-model="form.title" type="text"
              class="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:border-gray-400 focus:ring-1 focus:ring-black/5 outline-none transition"
              placeholder="Apple iPhone 14 Pro Max 128GB Deep Purple" :disabled="isLoading">
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea v-model="form.description" rows="4"
              class="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:border-gray-400 focus:ring-1 focus:ring-black/5 outline-none resize-none"
              placeholder="Detailed product description..." :disabled="isLoading"></textarea>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Type *</label>
              <select v-model="form.type" class="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white"
                :disabled="isLoading">
                <option value="">Select type</option>
                <option v-for="type in PRODUCT_TYPES" :key="type" :value="type">
                  {{ type }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Brand *</label>
              <select v-model="form.brand" class="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white"
                :disabled="isLoading">
                <option value="">Select brand</option>
                <option v-for="brand in PRODUCT_BRANDS" :key="brand" :value="brand">
                  {{ brand }}
                </option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Price (USD) *</label>
              <input v-model.number="form.price" type="number" step="0.01"
                class="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm" :disabled="isLoading"
                placeholder="0.00">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Original price</label>
              <input v-model.number="form.originalPrice" type="number" step="0.01"
                class="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm" :disabled="isLoading"
                placeholder="0.00">
              <Typography variant="caption" class="text-gray-400">If discount applied</Typography>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg border border-gray-100 p-6 shadow-sm">
          <div class="flex items-center justify-between cursor-pointer" @click="toggleDiscount">
            <Typography variant="h3" class="text-lg font-semibold">
              Discount settings
            </Typography>
            <Icon name="chevron-down" size="sm" class="text-gray-400 transition-transform duration-200"
              :class="{ 'rotate-180': discountOpen }" />
          </div>
          <div v-show="discountOpen" class="mt-4 space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Discount %</label>
                <input v-model.number="form.discountPercentage" type="number" step="1" min="0" max="99"
                  class="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm" :disabled="isLoading"
                  placeholder="0">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Start date</label>
                <input v-model="form.discountStart" type="datetime-local"
                  class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" :disabled="isLoading">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">End date</label>
                <input v-model="form.discountEnd" type="datetime-local"
                  class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" :disabled="isLoading">
              </div>
            </div>
            <div class="bg-gray-50 p-2 rounded-md">
              <Typography variant="caption" class="text-gray-400">
                If discount > 0, the final price will be automatically calculated
              </Typography>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg border border-gray-100 p-6 shadow-sm space-y-5">
          <Typography variant="h3" class="text-lg font-semibold border-b border-gray-100 pb-2">
            Technical specifications
          </Typography>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Screen type</label>
              <select v-model="form.specs.screenType"
                class="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white" :disabled="isLoading">
                <option value="">Not specified</option>
                <option v-for="type in SCREEN_TYPES" :key="type" :value="type">
                  {{ type }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Screen diagonal</label>
              <select v-model="form.specs.screenDiagonal"
                class="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white" :disabled="isLoading">
                <option value="">Not specified</option>
                <option v-for="diag in SCREEN_DIAGONALS" :key="diag" :value="diag">
                  {{ diag }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Battery capacity</label>
              <select v-model="form.specs.batteryCapacity"
                class="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white" :disabled="isLoading">
                <option value="">Not specified</option>
                <option v-for="cap in BATTERY_CAPACITIES" :key="cap" :value="cap">
                  {{ cap }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Built-in memory</label>
              <select v-model="form.specs.builtInMemory"
                class="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white" :disabled="isLoading">
                <option value="">Not specified</option>
                <option v-for="mem in BUILT_IN_MEMORIES" :key="mem" :value="mem">
                  {{ mem }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Protection class</label>
              <select v-model="form.specs.protectionClass"
                class="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white" :disabled="isLoading">
                <option value="">Not specified</option>
                <option v-for="prot in PROTECTION_CLASSES" :key="prot" :value="prot">
                  {{ prot }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">CPU / Processor</label>
              <select v-model="form.specs.cpu"
                class="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white" :disabled="isLoading">
                <option value="">Not specified</option>
                <option v-for="cpu in CPU_TYPES" :key="cpu" :value="cpu">
                  {{ cpu }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg border border-gray-100 p-6 shadow-sm">
          <div class="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div>
              <Typography variant="bodySm" class="text-gray-500">
                Ready to publish this product?
              </Typography>
              <Typography variant="caption" class="text-gray-400">
                All required fields must be filled
              </Typography>
            </div>
            <Button 
              type="submit"
              variant="primary" 
              :loading="isLoading"
              :disabled="isLoading"
              class="w-full sm:w-auto bg-black hover:bg-gray-800 text-white transition-colors"
            >
              <Icon name="plus" size="sm" class="mr-1" />
              {{ isLoading ? 'Creating...' : 'Publish product' }}
            </Button>
          </div>
        </div>
      </div>
      
      <div class="lg:w-96 space-y-6">
        <div class="bg-white rounded-lg border border-gray-100 p-5 shadow-sm sticky top-6">
          <Typography variant="h3" class="text-md font-semibold mb-3 flex items-center gap-2">
            <Icon name="eye" size="sm" />
            Live preview
          </Typography>

          <div class="border-t border-gray-100 pt-4">
            <div class="w-full bg-white rounded-lg border border-gray-100 p-5 flex flex-col items-center">
              <div class="w-full flex items-center justify-end">
                <Icon name="favourite" size="lg" class="text-gray-400 hover:text-red-500 cursor-pointer" />
              </div>
              <div class="w-full h-52 flex items-center justify-center mb-3">
                <img :src="imagePreview || '/images/image-not-found.png'" alt="Product Image"
                  class="max-w-full max-h-full object-contain" />
              </div>
              <div class="grid gap-4 w-full">
                <div class="text-center">
                  <Typography variant="p" class="text-center text-sm font-medium text-gray-800">
                    {{ form.title || 'Apple iPhone 14 Pro Max 128GB Deep Purple' }}
                  </Typography>
                  <div class="mt-2 flex items-center justify-center gap-2">
                    <Typography variant="h3" class="text-2xl font-bold">
                      ${{ finalPrice }}
                    </Typography>
                    <Typography v-if="hasValidDiscount" variant="p" class="text-sm text-gray-400 line-through">
                      ${{ originalDisplayPrice }}
                    </Typography>
                  </div>
                  <span v-if="hasValidDiscount"
                    class="inline-block text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full mt-1">
                    -{{ form.discountPercentage }}%
                  </span>
                </div>
                <Button variant="primary" class="w-full">
                  Publish
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { Typography, Button, Icon, Breadcrumbs } from '~/shared/ui'
import { useCreateProduct } from '~/features/create-product/model/use-create-product'
import {
  PRODUCT_TYPES,
  PRODUCT_BRANDS,
  SCREEN_TYPES,
  SCREEN_DIAGONALS,
  BATTERY_CAPACITIES,
  BUILT_IN_MEMORIES,
  PROTECTION_CLASSES,
  CPU_TYPES,
  type ProductType,
  type ProductBrand,
} from '~/features/create-product/model/types'

const breadcrumbItems = [
  { label: 'Home', to: '/' },
  { label: 'Admin', to: '/admin' },
  { label: 'Create Product' },
]

const form = reactive({
  title: '',
  description: '',
  price: null as number | null,
  type: '' as ProductType | '',
  brand: '' as ProductBrand | '',
  originalPrice: null as number | null,
  discountPercentage: 0,
  discountStart: '',
  discountEnd: '',
  specs: {
    screenType: '',
    screenDiagonal: '',
    batteryCapacity: '',
    builtInMemory: '',
    protectionClass: '',
    cpu: '',
  },
})

const imageFile = ref<File | null>(null)
const imagePreview = ref<string>('')
const fileInput = ref<HTMLInputElement>()
const discountOpen = ref(false)
const successMessage = ref('')
const { isLoading, error, createProduct, resetState } = useCreateProduct()

const finalPrice = computed(() => {
  let price = form.price || 0
  let original = form.originalPrice || form.price || 0
  const discount = form.discountPercentage || 0

  if (discount > 0 && original > 0) {
    return (original * (1 - discount / 100)).toFixed(2)
  }
  return price.toFixed(2)
})

const originalDisplayPrice = computed(() => {
  if (hasValidDiscount.value) {
    return (form.originalPrice || form.price || 0).toFixed(2)
  }
  return ''
})

const hasValidDiscount = computed(() => {
  return (form.discountPercentage || 0) > 0 && (form.originalPrice || form.price || 0) > 0
})

const specsSummary = computed(() => {
  const specsList = []
  if (form.specs.screenType) specsList.push(form.specs.screenType)
  if (form.specs.builtInMemory) specsList.push(form.specs.builtInMemory)
  if (form.specs.cpu) specsList.push(form.specs.cpu)
  return specsList.join(', ') || null
})

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    imageFile.value = file
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const toggleDiscount = () => {
  discountOpen.value = !discountOpen.value
}

const saveDraft = () => {
  console.log('Saving draft:', form)
}

const submitForm = async () => {
  successMessage.value = ''

  const formData = new FormData()

  formData.append('title', form.title)
  formData.append('description', form.description || '')
  formData.append('price', String(form.price))
  formData.append('type', form.type)
  formData.append('brand', form.brand)

  if (form.originalPrice) {
    formData.append('originalPrice', String(form.originalPrice))
  }

  formData.append('discountPercentage', String(form.discountPercentage || 0))

  if (form.discountStart) {
    formData.append('discountStart', form.discountStart)
  }
  if (form.discountEnd) {
    formData.append('discountEnd', form.discountEnd)
  }

  Object.entries(form.specs).forEach(([key, value]) => {
    if (value) {
      formData.append(key, value)
    }
  })

  if (imageFile.value) {
    formData.append('image', imageFile.value)
  }

  try {
    const response = await createProduct(formData)
    successMessage.value = `Product "${response.product?.title || form.title}" created successfully!`

    setTimeout(() => {
      resetForm()
    }, 3000)
  } catch (err) {
    console.error('Failed to create product:', err)
  }
}

const resetForm = () => {
  form.title = ''
  form.description = ''
  form.price = null
  form.type = ''
  form.brand = ''
  form.originalPrice = null
  form.discountPercentage = 0
  form.discountStart = ''
  form.discountEnd = ''
  form.specs = {
    screenType: '',
    screenDiagonal: '',
    batteryCapacity: '',
    builtInMemory: '',
    protectionClass: '',
    cpu: '',
  }
  imageFile.value = null
  imagePreview.value = ''
  successMessage.value = ''
  resetState()
}
</script>

<style scoped>
.create-product-page {
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
}

@media (min-width: 640px) {
  .create-product-page {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .create-product-page {
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top: 2.5rem;
    padding-bottom: 2.5rem;
  }
}

.rotate-180 {
  transform: rotate(180deg);
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
  border-color: #9ca3af;
  ring: 2px solid rgba(0, 0, 0, 0.05);
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background-color: #f3f4f6;
  border-radius: 9999px;
}

::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
  border-radius: 9999px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #9ca3af;
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  opacity: 0.5;
}

.shadow-sm {
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}

.transition {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>