export interface Date {
  day: string;
  month: string;
  year: string;
}
export interface Day {
  date: Date;
  meditations: Meditation[];
}
export interface Meditation {
  type: string;
  duration: number;
  templates: Template[];
}
export interface Template {
  title: string;
  content: string;
}
export interface LocalStorageDays {
  days: Day[];
}
