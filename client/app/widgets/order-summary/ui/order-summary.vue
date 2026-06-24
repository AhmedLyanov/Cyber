<template>
  <div class="w-full rounded-[10px] border border-cart-order-border px-16 py-14">
    <Typography class="mb-10 font-bold" variant="h3">
      Order Summary
    </Typography>

    <div class="grid gap-6">
      <div v-if="errorMessage" class="rounded-lg bg-red-50 p-3 text-sm text-red-600">
        {{ errorMessage }}
        <button @click="clearMessages" class="ml-2 text-red-400 hover:text-red-600">✕</button>
      </div>
      
      <div v-if="successMessage" class="rounded-lg bg-green-50 p-3 text-sm text-green-600">
        {{ successMessage }}
        <button @click="clearMessages" class="ml-2 text-green-400 hover:text-green-600">✕</button>
      </div>

      <div>
        <Input 
          v-model="promoCode" 
          variant="cart" 
          placeholder="Code" 
          label="Discount code / Promo code"
          :disabled="!!appliedPromo || isApplyingPromo"
        />
        
        <div v-if="appliedPromo" class="mt-2 flex items-center justify-between text-green-600">
          <span class="text-sm">✅ Promo code "{{ appliedPromo }}" applied</span>
          <button @click="removePromoCode" class="text-red-500 hover:text-red-700">
            ✕
          </button>
        </div>
      </div>

      <div class="relative">
        <Input 
          v-model="bonusCardNumber" 
          variant="cart" 
          placeholder="Enter Card Number" 
          label="Your bonus card number"
          :disabled="bonusDiscount > 0 || isApplyingBonus"
        />

        <Button 
          class="rounded-[6px] absolute right-4 bottom-4 min-w-[76px] h-8" 
          variant="outline"
          @click="applyBonusCard"
          :disabled="!bonusCardNumber || bonusDiscount > 0 || isApplyingBonus"
        >
          {{ isApplyingBonus ? '...' : 'Apply' }}
        </Button>
      </div>

      <div v-if="bonusDiscount > 0" class="text-sm text-green-600">
        ✅ Bonus discount: {{ formatPrice(bonusDiscount) }}
      </div>

      <div class="mt-2 grid gap-4">
        <div class="flex items-center justify-between">
          <span class="font-medium text-base leading-6 tracking-[0.03em]">
            Subtotal ({{ totalItems }} items)
          </span>

          <span class="font-medium text-base leading-8 tracking-[0.03em]">
            {{ formatPrice(subtotal) }}
          </span>
        </div>

        <div v-if="discountAmount > 0" class="flex items-center justify-between text-green-600">
          <span class="text-[16px] leading-8 tracking-[0.03em]">
            Discount ({{ Math.round(promoDiscount * 100) }}%)
          </span>

          <span class="font-medium text-base leading-8 tracking-[0.03em]">
            -{{ formatPrice(discountAmount) }}
          </span>
        </div>

        <div v-if="bonusDiscount > 0" class="flex items-center justify-between text-green-600">
          <span class="text-[16px] leading-8 tracking-[0.03em]">
            Bonus discount
          </span>

          <span class="font-medium text-base leading-8 tracking-[0.03em]">
            -{{ formatPrice(bonusDiscount) }}
          </span>
        </div>

        <div class="flex items-center justify-between">
          <span class="text-[16px] leading-8 tracking-[0.03em] text-gray">
            Estimated Tax ({{ Math.round(TAX_RATE * 100) }}%)
          </span>

          <span class="font-medium text-base leading-8 tracking-[0.03em]">
            {{ formatPrice(estimatedTax) }}
          </span>
        </div>

        <div class="flex items-center justify-between">
          <span class="text-[16px] leading-8 tracking-[0.03em] text-gray">
            Estimated shipping & Handling
          </span>

          <span class="font-medium text-base leading-8 tracking-[0.03em]">
            {{ shippingCost === 0 ? 'Free' : formatPrice(shippingCost) }}
          </span>
        </div>

        <div class="mt-2 flex items-center justify-between border-t border-gray-200 pt-4">
          <span class="font-bold text-base leading-6 tracking-[0.03em]">
            Total
          </span>

          <span class="font-medium text-[16px] ">
            {{ formatPrice(total) }}
          </span>
        </div>
      </div>
    </div>

    <Button 
      class="mt-12 py-4 w-full" 
      variant="primary"
      @click="handleCheckout"
      :disabled="!hasItems || cartStore.isLoading"
    >
      {{ cartStore.isLoading ? 'Loading...' : 'Checkout' }}
    </Button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { Typography, Input, Button } from "~/shared/ui";
import { useCartStore } from "~/entities/cart/model/use-cart";

const cartStore = useCartStore();
const promoCode = ref('');
const bonusCardNumber = ref('');
const isApplyingPromo = ref(false);
const isApplyingBonus = ref(false);
const appliedPromo = ref<string | null>(null);
const bonusDiscount = ref(0);
const errorMessage = ref<string | null>(null);
const successMessage = ref<string | null>(null);

const subtotal = computed(() => cartStore.totalPrice);
const totalItems = computed(() => cartStore.totalItems);
const hasItems = computed(() => cartStore.hasItems);

const TAX_RATE = 0.08;
const SHIPPING_COST = 29;

const estimatedTax = computed(() => {
  return subtotal.value * TAX_RATE;
});

const shippingCost = computed(() => {
  return subtotal.value > 100 ? 0 : SHIPPING_COST;
});

const promoDiscount = computed(() => {
  if (!appliedPromo.value) return 0;
  if (appliedPromo.value === 'SAVE10') return 0.10;
  if (appliedPromo.value === 'SAVE20') return 0.20;
  return 0;
});

const discountAmount = computed(() => {
  return subtotal.value * promoDiscount.value;
});

const total = computed(() => {
  return subtotal.value - discountAmount.value - bonusDiscount.value + estimatedTax.value + shippingCost.value;
});

const formatPrice = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
};

const clearMessages = () => {
  errorMessage.value = null;
  successMessage.value = null;
};

const applyPromoCode = async () => {
  if (!promoCode.value.trim()) {
    errorMessage.value = 'Please enter a promo code';
    return;
  }

  if (appliedPromo.value) {
    errorMessage.value = 'Promo code already applied';
    return;
  }

  try {
    isApplyingPromo.value = true;
    clearMessages();
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (promoCode.value === 'SAVE10' || promoCode.value === 'SAVE20') {
      appliedPromo.value = promoCode.value;
      successMessage.value = `Promo code "${promoCode.value}" applied!`;
      promoCode.value = '';
    } else {
      errorMessage.value = 'Invalid promo code';
    }
  } catch (error: any) {
    errorMessage.value = error.message || 'Failed to apply promo code';
  } finally {
    isApplyingPromo.value = false;
  }
};

const applyBonusCard = async () => {
  if (!bonusCardNumber.value.trim()) {
    errorMessage.value = 'Please enter your bonus card number';
    return;
  }

  try {
    isApplyingBonus.value = true;
    clearMessages();
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (bonusCardNumber.value.includes('123')) {
      bonusDiscount.value = subtotal.value * 0.05;
      successMessage.value = `Bonus card applied! ${formatPrice(bonusDiscount.value)} discount`;
    } else {
      errorMessage.value = 'Invalid bonus card number';
    }
  } catch (error: any) {
    errorMessage.value = error.message || 'Failed to apply bonus card';
  } finally {
    isApplyingBonus.value = false;
  }
};

const removePromoCode = () => {
  appliedPromo.value = null;
  successMessage.value = 'Promo code removed';
  setTimeout(() => {
    successMessage.value = null;
  }, 3000);
};

const handleCheckout = () => {
  if (!hasItems.value) {
    errorMessage.value = 'Your cart is empty';
    return;
  }
  
  navigateTo('/checkout');
};

watch(() => cartStore.cart, () => {
  if (bonusDiscount.value > 0) {
    bonusDiscount.value = 0;
  }
}, { deep: true });
</script>

<style scoped>
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>