<script lang="ts">
  import { onMount } from "svelte"
  import type { WorkDay } from "$lib/domain/workDay"
  import { workDayTodayWritable } from "$lib/stores/workday.svelte"
    import { Manager } from "$lib/domain/manager";

    let currentDate : string | null = $state(null)
    let loading: boolean = $state(false)
    
    onMount(() => {
      const manager: Manager = Manager.get()  
      const possibleWorkday = manager.getWorkDay()

    if (possibleWorkday) {

      $workDayTodayWritable =  possibleWorkday
      loading = true
    } else {
      loading = false
      console.log("não encontrado workday")
    }
  })
  
</script>

{#if loading}

  <section id="workdayConfirm">

    <h1>irá trabalhar hoje?</h1>

    <span>

      <a href="/working">sim</a>
      <a href="/dashboard">não</a>
      
    </span>

  </section>

  {:else}

  <section id="gotoWorkday">

  </section>
  
{/if}


<style>
  section#workdayConfirm {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    height: 100vh;

    & h1 {
      text-align: center;
      font-size: 1.6rem;

    }

    span {
      display: flex;
      flex-flow: column;
      gap: 1rem;
      width: 60%;

      & a {
        padding: .4rem;
        border-radius: .5rem;
        display: flex;
        justify-content: center;
        align-items: center;

        text-decoration: none;
        color: black;
        font-weight: bold;
      }

      :first-child{

        background-color: rgb(245, 109, 109);


      }

      :last-child {
        background-color: rgb(138, 243, 138);
      }
    }
  }
</style>