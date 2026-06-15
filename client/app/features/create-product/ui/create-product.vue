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
        <Button variant="outline" @click="saveDraft">
          <Icon name="save" size="sm" class="mr-1" />
          Save draft
        </Button>
        <Button variant="primary" @click="submitForm">
          <Icon name="plus" size="sm" class="mr-1" />
          Publish product
        </Button>
      </div>
    </div>

    <!-- Форма -->
    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Левая колонка -->
      <div class="flex-1 space-y-6">
        <!-- Загрузка изображения -->
        <div class="bg-white rounded-lg border border-gray-100 p-6 shadow-sm">
          <div class="flex items-center justify-between mb-4">
            <Typography variant="h3" class="text-lg font-semibold">
              Product image
            </Typography>
            <span class="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full">Required</span>
          </div>
          <div class="flex flex-col sm:flex-row gap-6 items-start">
            <div class="w-40 h-40 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden">
              <img 
                :src="imagePreview || '/images/placeholder.png'" 
                alt="Preview" 
                class="max-w-full max-h-full object-contain"
              />
            </div>
            <div class="flex-1 space-y-3">
              <label class="block">
                <span class="text-sm font-medium text-gray-700">Upload image</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  @change="handleImageUpload" 
                  class="hidden" 
                  ref="fileInput"
                >
                <Button 
                  variant="outline" 
                  @click="$refs.fileInput.click()" 
                  class="mt-2 w-full sm:w-auto"
                >
                  <Icon name="upload" size="sm" class="mr-1" />
                  Choose file
                </Button>
              </label>
              <Typography variant="caption" class="text-gray-400">
                Recommended: PNG, JPG up to 5MB
              </Typography>
            </div>
          </div>
        </div>

        <!-- Основная информация -->
        <div class="bg-white rounded-lg border border-gray-100 p-6 shadow-sm space-y-5">
          <Typography variant="h3" class="text-lg font-semibold border-b border-gray-100 pb-2">
            General information
          </Typography>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Product title *</label>
            <input 
              v-model="form.title" 
              type="text" 
              class="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:border-gray-400 focus:ring-1 focus:ring-black/5 outline-none transition"
              placeholder="Apple iPhone 14 Pro Max 128GB Deep Purple"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea 
              v-model="form.description" 
              rows="4" 
              class="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:border-gray-400 focus:ring-1 focus:ring-black/5 outline-none resize-none"
              placeholder="Detailed product description..."
            ></textarea>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Type *</label>
              <select v-model="form.type" class="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white">
                <option value="">Select type</option>
                <option value="smartphone">Smartphone</option>
                <option value="tablet">Tablet</option>
                <option value="laptop">Laptop</option>
                <option value="accessory">Accessory</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Brand *</label>
              <select v-model="form.brand" class="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white">
                <option value="">Select brand</option>
                <option value="Apple">Apple</option>
                <option value="Samsung">Samsung</option>
                <option value="Xiaomi">Xiaomi</option>
                <option value="Google">Google</option>
                <option value="OnePlus">OnePlus</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Price (USD) *</label>
              <input v-model.number="form.price" type="number" step="0.01" class="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Original price</label>
              <input v-model.number="form.originalPrice" type="number" step="0.01" class="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm">
              <Typography variant="caption" class="text-gray-400">If discount applied</Typography>
            </div>
          </div>
        </div>

        <!-- Дисконт аккордеон -->
        <div class="bg-white rounded-lg border border-gray-100 p-6 shadow-sm">
          <div class="flex items-center justify-between cursor-pointer" @click="toggleDiscount">
            <Typography variant="h3" class="text-lg font-semibold">
              Discount settings
            </Typography>
            <Icon 
              name="chevron-down" 
              size="sm" 
              class="text-gray-400 transition-transform duration-200"
              :class="{ 'rotate-180': discountOpen }"
            />
          </div>
          <div v-show="discountOpen" class="mt-4 space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Discount %</label>
                <input v-model.number="form.discountPercentage" type="number" step="1" min="0" max="99" class="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Start date</label>
                <input v-model="form.discountStart" type="datetime-local" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">End date</label>
                <input v-model="form.discountEnd" type="datetime-local" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
              </div>
            </div>
            <div class="bg-gray-50 p-2 rounded-md">
              <Typography variant="caption" class="text-gray-400">
                If discount > 0, the final price will be automatically calculated
              </Typography>
            </div>
          </div>
        </div>

        <!-- Спецификации -->
        <div class="bg-white rounded-lg border border-gray-100 p-6 shadow-sm space-y-5">
          <Typography variant="h3" class="text-lg font-semibold border-b border-gray-100 pb-2">
            Technical specifications
          </Typography>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Screen type</label>
              <select v-model="form.specs.screenType" class="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white">
                <option value="">Not specified</option>
                <option value="AMOLED">AMOLED</option>
                <option value="OLED">OLED</option>
                <option value="IPS">IPS</option>
                <option value="Retina">Retina</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Screen diagonal</label>
              <select v-model="form.specs.screenDiagonal" class="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white">
                <option value="">Not specified</option>
                <option value="6.1\">6.1"</option>
                <option value="6.5\">6.5"</option>
                <option value="6.7\">6.7"</option>
                <option value="6.9\">6.9"</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Battery capacity</label>
              <select v-model="form.specs.batteryCapacity" class="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white">
                <option value="">Not specified</option>
                <option value="3000mAh">3000mAh</option>
                <option value="4000mAh">4000mAh</option>
                <option value="5000mAh">5000mAh</option>
                <option value="6000mAh">6000mAh</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Built-in memory</label>
              <select v-model="form.specs.builtInMemory" class="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white">
                <option value="">Not specified</option>
                <option value="64GB">64GB</option>
                <option value="128GB">128GB</option>
                <option value="256GB">256GB</option>
                <option value="512GB">512GB</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Protection class</label>
              <select v-model="form.specs.protectionClass" class="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white">
                <option value="">Not specified</option>
                <option value="IP67">IP67</option>
                <option value="IP68">IP68</option>
                <option value="IP69">IP69</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">CPU / Processor</label>
              <select v-model="form.specs.cpu" class="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white">
                <option value="">Not specified</option>
                <option value="A16 Bionic">A16 Bionic</option>
                <option value="Snapdragon 8 Gen 2">Snapdragon 8 Gen 2</option>
                <option value="Dimensity 9200">Dimensity 9200</option>
                <option value="Apple M2">Apple M2</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Правая колонка - Preview -->
      <div class="lg:w-96 space-y-6">
        <div class="bg-white rounded-lg border border-gray-100 p-5 shadow-sm sticky top-6">
          <Typography variant="h3" class="text-md font-semibold mb-3 flex items-center gap-2">
            <Icon name="eye" size="sm" />
            Live preview
          </Typography>
          
          <div class="border-t border-gray-100 pt-4">
            <!-- Карточка товара -->
            <div class="w-full bg-white rounded-lg border border-gray-100 p-5 flex flex-col items-center">
              <div class="w-full flex items-center justify-end">
                <Icon name="favourite" size="lg" class="text-gray-400 hover:text-red-500 cursor-pointer" />
              </div>
              <div class="w-full h-52 flex items-center justify-center mb-3">
                <img 
                  :src="imagePreview || '/images/IPhone.png'" 
                  alt="Product Image" 
                  class="max-w-full max-h-full object-contain"
                />
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
                    <Typography 
                      v-if="hasValidDiscount" 
                      variant="p" 
                      class="text-sm text-gray-400 line-through"
                    >
                      ${{ originalDisplayPrice }}
                    </Typography>
                  </div>
                  <span 
                    v-if="hasValidDiscount" 
                    class="inline-block text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full mt-1"
                  >
                    -{{ form.discountPercentage }}%
                  </span>
                </div>
                <Button variant="primary" class="w-full">
                  Buy Now
                </Button>
              </div>
            </div>
          </div>

          <div class="mt-5 p-3 bg-gray-50 rounded-lg">
            <div class="flex justify-between mb-1 text-xs">
              <span class="text-gray-500">Type:</span>
              <span class="text-gray-700">{{ form.type || '—' }}</span>
            </div>
            <div class="flex justify-between mb-1 text-xs">
              <span class="text-gray-500">Brand:</span>
              <span class="text-gray-700">{{ form.brand || '—' }}</span>
            </div>
            <div class="flex justify-between text-xs">
              <span class="text-gray-500">Specs:</span>
              <span class="text-gray-700 truncate">{{ specsSummary || 'Not added' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { Typography, Button, Icon, Breadcrumbs } from '~/shared/ui'

interface ProductForm {
  title: string
  description: string
  price: number | null
  type: string
  brand: string
  originalPrice: number | null
  discountPercentage: number
  discountStart: string
  discountEnd: string
  specs: {
    screenType: string
    screenDiagonal: string
    batteryCapacity: string
    builtInMemory: string
    protectionClass: string
    cpu: string
  }
}

const form = reactive<ProductForm>({
  title: '',
  description: '',
  price: null,
  type: '',
  brand: '',
  originalPrice: null,
  discountPercentage: 0,
  discountStart: '',
  discountEnd: '',
  specs: {
    screenType: '',
    screenDiagonal: '',
    batteryCapacity: '',
    builtInMemory: '',
    protectionClass: '',
    cpu: ''
  }
})

const imagePreview = ref<string>('')
const fileInput = ref<HTMLInputElement>()
const discountOpen = ref(false)

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
  const productData = {
    title: form.title,
    description: form.description,
    price: form.price,
    type: form.type,
    brand: form.brand,
    originalPrice: form.originalPrice || form.price,
    discountPercentage: form.discountPercentage,
    discountStart: form.discountStart || null,
    discountEnd: form.discountEnd || null,
    specs: Object.fromEntries(
      Object.entries(form.specs).filter(([_, value]) => value)
    )
  }
  
  console.log('Submitting product:', productData)
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

/* Анимация для аккордеона */
.rotate-180 {
  transform: rotate(180deg);
}

/* Стили для инпутов при фокусе */
input:focus, 
textarea:focus, 
select:focus {
  outline: none;
  border-color: #9ca3af;
  ring: 2px solid rgba(0, 0, 0, 0.05);
}

/* Кастомные стили для скролла */
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

/* Убираем стрелки у number input */
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button {
  opacity: 0.5;
}

/* Стили для карточки товара */
.bg-product-color {
  background-color: #ffffff;
}

/* Тени и переходы */
.shadow-sm {
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}

.transition {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>