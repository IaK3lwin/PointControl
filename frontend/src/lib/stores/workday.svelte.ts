import { writable, type Writable } from "svelte/store";
import type { WorkDay } from "$lib/domain/workDay"

export const workDayTodayWritable: Writable<WorkDay> = writable()