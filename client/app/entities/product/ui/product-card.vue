<template>
    <div class="w-67 bg-product-color rounded-lg p-5 flex flex-col items-center">
        <div class="w-full flex items-center justify-end">
            <Icon name="favourite" size="lg" class="" />
        </div>
        <div class="w-full h-52 flex items-center justify-center mb-3">
            <NuxtImg src="/images/IPhone.png" alt="Product Image" class="max-w-full max-h-full object-contain" />
        </div>

        <div class="grid gap-6">
            <div class="text-center">
                <Typography variant="p" class="text-center mt-2">
                    Apple iPhone 14 Pro Max 128GB Deep Purple (MQ9T3RX/A)
                </Typography>

                <Typography variant="h3" class="mt-4">
                    $999
                </Typography>

            </div>
            <Button variant="primary" class="w-full">
                Buy Now
            </Button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { Typography, Button, Icon } from '~/shared/ui/'

</script>
