import { writable, type Writable } from "svelte/store";
import type { WorkDay } from "$lib/domain/workDay"

export const workDayWritable: Writable<WorkDay> = writable()