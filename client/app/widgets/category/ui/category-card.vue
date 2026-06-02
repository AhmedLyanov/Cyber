<template>
    <div class="w-40 p-6 text-center  rounded-lg cursor-pointer bg-category-card">
        <div class="grid gap-2  place-items-center">
            <Icon :name="category.icon" size="lg" />
            <Typography variant="h4" >
                {{ category.title }}
            </Typography>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Icon from '~/shared/ui/icon/icon.vue'
import Typography from '~/shared/ui/typography/typography.vue'

defineProps<{
    category: {
        id: number
        title: string
        icon: string
    }
}>()
</script>