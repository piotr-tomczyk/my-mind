<template>
  <div id="diary">
    <div id="days" v-for="(day, index) of days" v-bind:key="index">
      <DayView
        :day="day"
        :indexOfDay="index"
        @add-meditation="addMeditation"
      ></DayView>
    </div>
    <button @click="changeShowDayFormTrigger">Add Day</button>
    <DayFormView v-if="showDaysForm" @add-day="addDay"></DayFormView>
  </div>
</template>
<script setup lang="ts">
import DayView from "./DayView.vue";
import DayFormView from "./DayFormView.vue";

import { useMeditationStore } from "@/stores/meditationStore";
import { onMounted, reactive, ref } from "vue";

import type { Ref } from "vue";
import type { Day, Date, LocalStorageDays } from "@/types";

const store = useMeditationStore();

const days: Day[] = reactive([]);

function saveDaysToLocalStorage() {
  const localDaysObject: LocalStorageDays = { days: days };
  localStorage.setItem("days", JSON.stringify(localDaysObject));
}
function getDaysFromLocalStorage() {
  const localDays = localStorage.getItem("days");
  if (localDays) {
    const localDaysObject: Day[] = JSON.parse(localDays).days;
    localDaysObject.forEach((day: Day) => days.push(day));
  }
}
function addDay(dayToAdd: Date) {
  const foundDays = days.filter((day) => {
    if (
      day.date.day === dayToAdd.day &&
      day.date.month === dayToAdd.month &&
      day.date.year === dayToAdd.year
    ) {
      return true;
    }
    return false;
  });
  if (foundDays.length === 0) {
    days.push(JSON.parse(JSON.stringify(dayToAdd)));
    saveDaysToLocalStorage();
    changeShowDayFormTrigger();
  }
}

const showDaysForm: Ref<boolean> = ref(false);

onMounted(() => {
  getDaysFromLocalStorage();
});

function changeShowDayFormTrigger() {
  showDaysForm.value = !showDaysForm.value;
}

function addMeditation(index: number) {
  days[index].meditations.push(JSON.parse(JSON.stringify(store.meditation)));
  store.resetMeditation();
  console.log(store.meditation);
  saveDaysToLocalStorage();
}
</script>

<style scoped>
#diary {
  padding: 2em;
  background-color: #42b983;
}
</style>
