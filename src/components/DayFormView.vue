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
import type { Date } from "@/types";

const date: Date = reactive({ day: "", month: "", year: "" });
onBeforeMount(() => {
  const newDate = new Date();
  date.day = newDate.getDate().toString();
  date.month = (newDate.getMonth() + 1).toString();
  date.year = newDate.getFullYear().toString();
});
const emit = defineEmits<{ (e: "add-day", date: Date): void }>();
function submitDay() {
  emit("add-day", date);
}
</script>

<style scoped></style>
