<template>
  <div>
    <div><b>Type:</b> {{ meditation.type }}</div>
    <div><b>Duration:</b> {{ meditation.duration }} minutes</div>
    <div v-for="(template, index) of meditation.templates" :key="index">
      <div style="font-weight: bold">{{ template.title }}</div>
      <p>{{ template.content }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Meditation } from "@/types";

const props = defineProps<{
  meditation: Meditation;
}>();
</script>

<style scoped></style>
