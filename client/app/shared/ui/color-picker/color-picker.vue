<template>
    <div class="flex items-center gap-6">
        <Typography v-if="label" variant="textBase">
            {{ label }}
        </Typography>

        <div class="flex gap-2">
            <button v-for="color in colors" :key="color.value" @click="selectColor(color)"
                class="rounded-full border-2 transition-all hover:scale-110 active:scale-95" :class="[
                    sizeClasses,
                    isSelected(color) ? 'border-black' : 'border-transparent',
                    color.class || 'border-gray-300'
                ]" :style="{ backgroundColor: color.value }" :title="color.label || color.name || color.value"
                :disabled="disabled" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import Typography from '../typography/typography.vue';

export interface ColorOption {
    value: string;
    label?: string;
    name?: string;
    class?: string;
}

const props = withDefaults(defineProps<{
    colors: ColorOption[];
    modelValue?: string;
    label?: string;
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
}>(), {
    modelValue: '',
    label: '',
    size: 'md',
    disabled: false,
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
    (e: 'change', color: ColorOption): void;
}>();

const selectedColor = ref(props.modelValue);

const sizeClasses = computed(() => {
    switch (props.size) {
        case 'sm':
            return 'w-6 h-6';
        case 'lg':
            return 'w-10 h-10';
        default:
            return 'w-8 h-8';
    }
});

const isSelected = (color: ColorOption) => {
    return selectedColor.value === color.value || selectedColor.value === color.name;
};

const selectColor = (color: ColorOption) => {
    if (props.disabled) return;

    const value = color.value || color.name || '';
    selectedColor.value = value;
    emit('update:modelValue', value);
    emit('change', color);
};

watch(() => props.modelValue, (newVal) => {
    selectedColor.value = newVal;
});
</script>