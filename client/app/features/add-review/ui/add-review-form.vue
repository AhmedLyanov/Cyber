<!-- client/app/features/add-review/ui/add-review-form.vue -->
<template>
  <div class="bg-white rounded-lg p-6 border">
    <Typography variant="h3" class="mb-4">
      {{ isEditing ? "Edit Your Review" : "Write a Review" }}
    </Typography>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <Typography variant="description" class="mb-2">Rating</Typography>
        <div class="flex gap-2">
          <button
            v-for="star in 5"
            :key="star"
            type="button"
            @click="form.rating = star"
            @mouseenter="hoverRating = star"
            @mouseleave="hoverRating = 0"
            class="transition-transform hover:scale-110"
          >
            <Icon
              :name="star <= (hoverRating || form.rating) ? 'star' : 'star-half'"
              size="lg"
              :class="
                star <= (hoverRating || form.rating)
                  ? 'text-yellow-400'
                  : 'text-gray-300'
              "
            />
          </button>
        </div>
      </div>

      <div>
        <Typography variant="description" class="mb-2">
          Your Review
        </Typography>
        <textarea
          v-model="form.comment"
          rows="4"
          :placeholder="isEditing ? 'Update your review...' : 'Share your thoughts about this product...'"
          class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          :class="errors.comment ? 'border-red-500' : 'border-gray-300'"
        />
        <div class="flex justify-between mt-1">
          <Typography
            v-if="errors.comment"
            variant="description"
            class="text-red-500"
          >
            {{ errors.comment }}
          </Typography>
          <Typography
            variant="description"
            class="text-gray-400 ml-auto"
          >
            {{ form.comment.length }}/1000
          </Typography>
        </div>
      </div>

      <div class="flex gap-3">
        <Button type="submit" :disabled="isSubmitting || !isValid">
          {{ isEditing ? "Update Review" : "Submit Review" }}
        </Button>
        <Button
          v-if="isEditing"
          type="button"
          variant="outline"
          @click="$emit('cancel')"
        >
          Cancel
        </Button>
      </div>
    </form>

    <div
      v-if="errorMessage"
      class="mt-4 p-3 bg-red-50 text-red-700 rounded"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { Typography, Icon, Button } from "~/shared/ui";

const props = defineProps<{
  isEditing?: boolean;
  initialRating?: number;
  initialComment?: string;
}>();

const emit = defineEmits<{
  submitted: [rating: number, comment: string];
  cancel: [];
}>();

const isSubmitting = ref(false);
const errorMessage = ref("");
const hoverRating = ref(0);

const form = reactive({
  rating: props.initialRating || 0,
  comment: props.initialComment || "",
});

const errors = reactive({
  comment: "",
});

const isValid = computed(() => {
  return (
    form.rating > 0 &&
    form.comment.trim().length >= 10 &&
    form.comment.trim().length <= 1000
  );
});

const validate = () => {
  let valid = true;

  if (form.comment.trim().length < 10) {
    errors.comment = "Review must be at least 10 characters";
    valid = false;
  } else if (form.comment.trim().length > 1000) {
    errors.comment = "Review cannot exceed 1000 characters";
    valid = false;
  } else {
    errors.comment = "";
  }

  if (form.rating === 0) {
    errorMessage.value = "Please select a rating";
    valid = false;
  }

  return valid;
};

const handleSubmit = async () => {
  if (!validate()) return;

  isSubmitting.value = true;
  errorMessage.value = "";

  emit("submitted", form.rating, form.comment.trim());
  isSubmitting.value = false;
};

onMounted(() => {
  if (props.initialRating) form.rating = props.initialRating;
  if (props.initialComment) form.comment = props.initialComment;
});
</script>