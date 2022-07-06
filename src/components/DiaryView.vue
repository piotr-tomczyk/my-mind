<template>
  <div id="diary">
    <div id="days" v-for="(day, index) of store.days" v-bind:key="index">
      <DayView :day="day" :indexOfDay="index"></DayView>
    </div>
    <button @click="changeShowDayFormTrigger">Add Day</button>
    <DayFormView v-if="showDaysForm" @add-day="addDay"></DayFormView>
  </div>
</template>
<script setup lang="ts">
import DayView from "./DayView.vue";
import DayFormView from "./DayFormView.vue";

import { useDaysStore } from "@/stores/daysStore";
import { onBeforeMount, ref } from "vue";

import type { Ref } from "vue";

const store = useDaysStore();

function addDay() {
  changeShowDayFormTrigger();
}

const showDaysForm: Ref<boolean> = ref(false);

onBeforeMount(() => {
  store.getDaysFromLocalStorage();
});

function changeShowDayFormTrigger() {
  showDaysForm.value = !showDaysForm.value;
}
</script>

<style scoped>
#diary {
  padding: 2em;
  background-color: #42b983;
}
</style>
