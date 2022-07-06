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
    <div v-for="(template, index) of meditation.templates" v-bind:key="index">
      <div>
        <div>{{ template.title }}</div>
        <textarea
          v-model="template.content"
          :placeholder="template.title"
        ></textarea>
      </div>
    </div>
    <input type="submit" value="Add" />
  </form>
</template>

<script setup lang="ts">
import { useDaysStore } from "@/stores/daysStore";

import { onBeforeMount, reactive } from "vue";

import type { Meditation } from "@/types";
import { BASIC_MEDITATION_TEMPLATE } from "@/utils";

const props = defineProps<{
  indexOfDay: number;
}>();

const emit = defineEmits(["submit-meditation"]);

const store = useDaysStore();

const meditation: Meditation = reactive({
  type: "",
  duration: 0,
  templates: [],
});

onBeforeMount(() => {
  restartMeditation();
});

function restartMeditation() {
  meditation.type = "";
  meditation.duration = 0;
  meditation.templates = JSON.parse(JSON.stringify(BASIC_MEDITATION_TEMPLATE));
}
function addMeditation() {
  emit("submit-meditation");
  store.addMeditation(meditation, props.indexOfDay);
}
</script>

<style scoped></style>
