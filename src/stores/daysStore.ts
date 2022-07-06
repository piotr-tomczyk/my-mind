import { defineStore } from "pinia";
import type { Day, LocalStorageDays, Meditation } from "@/types";

export const useDaysStore = defineStore("days", {
  state: () => ({
    days: [] as Day[],
  }),
  actions: {
    addDay(day: Day) {
      this.days.push(JSON.parse(JSON.stringify(day)));
      this.saveDaysToLocalStorage();
    },
    addMeditation(meditation: Meditation, index: number) {
      this.days[index].meditations.push(JSON.parse(JSON.stringify(meditation)));
      this.saveDaysToLocalStorage();
    },
    saveDaysToLocalStorage() {
      const localDaysObject: LocalStorageDays = { days: this.days };
      localStorage.setItem("days", JSON.stringify(localDaysObject));
    },
    getDaysFromLocalStorage() {
      const localDays = localStorage.getItem("days");
      if (localDays) {
        this.days = JSON.parse(localDays).days;
      }
    },
  },
});
