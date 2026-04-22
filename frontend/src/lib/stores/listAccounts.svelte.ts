import { type Writable, writable } from "svelte/store"
import type { Account } from "$lib/domain/accoun"


export const accountsWritable: Writable<Account[]> = writable()