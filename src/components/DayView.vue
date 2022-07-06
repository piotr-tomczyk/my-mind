<template>
  <div style="margin-top: 1em">
    <div>
      <b>Date:</b> {{ day.date.day }}.{{ day.date.month }}.{{ day.date.year }}
    </div>
    <div>
      <div v-for="(meditation, index) of day.meditations" :key="index">
        <MeditationView
          :meditation="meditation"
          style="margin-bottom: 1em; margin-top: 1em"
        ></MeditationView>
      </div>
    </div>
    <button @click="changeShowMeditationFormTrigger">AddMeditation</button>
    <MeditationFormView
      v-if="showMeditationForm"
      @submit-meditation="submitMeditation"
    ></MeditationFormView>
  </div>
</template>
<script setup lang="ts">
import MeditationFormView from "./MeditationFormView.vue";
import MeditationView from "./MeditationView.vue";
import { ref } from "vue";
import type { Ref } from "vue";
import type { Day } from "@/types";

const props = defineProps<{
  day: Day;
  indexOfDay: number;
}>();

const emit = defineEmits<{
  (e: "add-meditation", indexOfDay: number): void;
}>();

const showMeditationForm: Ref<boolean> = ref(false);

function changeShowMeditationFormTrigger() {
  showMeditationForm.value = !showMeditationForm.value;
}
function submitMeditation() {
  emit("add-meditation", props.indexOfDay);
  showMeditationForm.value = false;
}
</script>

<style scoped></style>
