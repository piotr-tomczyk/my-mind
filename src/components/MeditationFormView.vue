<template>
  <form v-on:submit.prevent="addMeditation">
    <div>
      <div>Type of Meditation:</div>
      <input
        type="text"
        v-model="meditation.type"
        placeholder="Type of Meditation"
      />
    </div>
    <div>
      <div>Duration:</div>
      <input
        type="number"
        v-model="meditation.duration"
        placeholder="Duration"
      />
    </div>
    <div v-for="(textArea, index) of meditation.textAreas" v-bind:key="index">
      <div>
        <div>{{ textArea.title }}</div>
        <textarea
          v-model="textArea.content"
          :placeholder="textArea.title"
        ></textarea>
      </div>
    </div>
    <input type="submit" value="Add" />
  </form>
</template>
<script setup lang="ts">
import { useMeditationStore } from "@/stores/meditationStore";

import { onBeforeMount, reactive } from "vue";

import type { Meditation } from "@/types";

const emit = defineEmits(["submit-meditation"]);

const store = useMeditationStore();

const meditation: Meditation = reactive({
  type: "",
  duration: 0,
  template: [],
});

onBeforeMount(() => {
  meditation.type = store.meditation.type;
  meditation.duration = store.meditation.duration;
  meditation.template = store.meditation.template;
});

function addMeditation() {
  emit("submit-meditation");
}
</script>

<style scoped></style>
