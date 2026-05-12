<script lang="ts">
  import "./styles/main.css"
  import { Cent } from "$lib/domain/cents"
  import { Manager } from "$lib/domain/manager"
  import { PaymentManager } from "$lib/domain/PaymentManager"
  import { WorkDay } from "$lib/domain/workDay"
  import  { WorkDayCollection } from "$lib/domain/WorkDayCollection"
  import { workDayFactory } from "$lib/domain/workDay"
    import { writable, type Writable } from "svelte/store";
    import { workDayTodayWritable } from "$lib/stores/workday.svelte";

  const manager: Manager = Manager.get()

  const workdaysCollectionReactive: Writable<WorkDayCollection | null> = writable(manager.getWorkDayCollection())

  
</script>

<h1>Dashboard</h1>

<section class="container">
  <section class="wrapper">
  </section>

  <header >
    <nav>

    </nav>
  </header>
</section>
