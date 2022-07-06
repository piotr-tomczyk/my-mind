<template>
  <form v-on:submit.prevent="submitDay">
    <div>
      <div>Day:</div>
      <input type="text" v-model="date.day" placeholder="Day" />
    </div>
    <div>
      <div>Month:</div>
      <input type="text" v-model="date.month" placeholder="Month" />
    </div>
    <div>
      <div>Year:</div>
      <input type="text" v-model="date.year" placeholder="Year" />
    </div>
    <input type="submit" value="Add" />
  </form>
</template>
<script setup lang="ts">
import { reactive, onBeforeMount } from "vue";
import { useDaysStore } from "@/stores/daysStore";

import type { Date } from "@/types";

const store = useDaysStore();

const date: Date = reactive({ day: "", month: "", year: "" });

const emit = defineEmits<{ (e: "add-day"): void }>();
onBeforeMount(() => {
  const newDate = new Date();
  date.day = newDate.getDate().toString();
  date.month = (newDate.getMonth() + 1).toString();
  date.year = newDate.getFullYear().toString();
});
function submitDay() {
  store.addDay({ date: date, meditations: [] });
  emit("add-day");
}
</script>

<style scoped></style>
