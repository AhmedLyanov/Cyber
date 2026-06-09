<template>
  <section class="bg-product-details-bg px-40 py-20">
    <div class="bg-product-details-window-bg py-12 px-10 rounded-xl">
      <Typography variant="h3">Details</Typography>
      <Typography class="mt-8" variant="description">
        Just as a book is judged by its cover, the first thing you notice when you pick up a modern smartphone
        is the display. Nothing surprising, because advanced technologies allow you to practically level the
        display frames and cutouts for the front camera and speaker, leaving no room for bold design solutions.
        And how good that in such realities Apple everything is fine with displays.
      </Typography>

      <div v-for="section in visibleSections" :key="section.title" class="mt-8">
        <Typography class="pb-4" variant="h3">{{ section.title }}</Typography>
        <div class="grid gap-6">
          <div
            v-for="item in section.items"
            :key="item.label"
            class="w-full flex pb-2 justify-between border-b border-product-details-border"
          >
            <Typography class="text-[16px] leading-6" variant="body">{{ item.label }}</Typography>
            <Typography variant="body">{{ item.value }}</Typography>
          </div>
        </div>
      </div>

      <div class="flex justify-center mt-8">
        <Button variant="outline" class="min-w-[180px]" @click="showAllDetails = !showAllDetails">
          {{ showAllDetails ? "Show Less" : "View More" }}
          <Icon name="expand-arrow-down" size="md" class="transition-transform duration-300 ml-2" :class="{ 'rotate-180': showAllDetails }" />
        </Button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Typography, Button, Icon } from "~/shared/ui";

const showAllDetails = ref(false);

const allDetailSections = [
  {
    title: "Screen",
    items: [
      { label: "Screen diagonal", value: '6.7"' },
      { label: "The screen resolution", value: "2796x1290" },
      { label: "The screen refresh rate", value: "120 Hz" },
      { label: "The pixel density", value: "460 ppi" },
      { label: "Screen type", value: "OLED" },
      { label: "Additionally", value: "Dynamic Island, Always-On display, HDR display, True Tone, Wide color (P3)" }
    ]
  },
  {
    title: "CPU",
    items: [
      { label: "CPU", value: "A16 Bionic" },
      { label: "Number of cores", value: "6" }
    ]
  },
  {
    title: "Camera",
    items: [
      { label: "Main camera", value: "48-12-12 MP" },
      { label: "Front-camera", value: "12 MP" }
    ]
  },
  {
    title: "Battery",
    items: [
      { label: "Battery capacity", value: "4323 mAh" },
      { label: "Charging", value: "Fast charging, MagSafe wireless charging" },
      { label: "Battery type", value: "Li-Ion" }
    ]
  },
  {
    title: "Memory",
    items: [
      { label: "Built-in memory", value: "1TB" },
      { label: "RAM", value: "6GB" },
      { label: "Memory card support", value: "No" }
    ]
  },
  {
    title: "Protection",
    items: [
      { label: "Protection class", value: "IP68" },
      { label: "Glass protection", value: "Ceramic Shield" },
      { label: "Water resistance", value: "Up to 6 meters for 30 minutes" }
    ]
  },
  {
    title: "Additional Information",
    items: [
      { label: "Operating system", value: "iOS 16" },
      { label: "Sensors", value: "Face ID, accelerometer, gyro, proximity, compass, barometer" },
      { label: "Connectivity", value: "5G, Wi-Fi 6E, Bluetooth 5.3, NFC" }
    ]
  }
];

const visibleSections = computed(() => {
  return showAllDetails.value ? allDetailSections : allDetailSections.slice(0, 2);
});
</script>