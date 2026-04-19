<script lang="ts">
  import type { WorkDay } from "$lib/domain/workDay";
    import { onMount } from "svelte";

    let raw : string | null 
    let currentDate: string | null  = $state(null)
    let workDays: Map<String, WorkDay> = $state(new Map()) 

  onMount(() => {
    raw = localStorage.getItem('workdays');
    currentDate = new Date().toLocaleDateString('pt-BR')

    workDays = raw
	    ? new Map<string, WorkDay>(JSON.parse(raw))
	    : new Map()

    console.log(workDays, currentDate)
  })
  
</script>

{#if workDays.size <= 0 && !workDays.has(currentDate ?? '')}

  <section id="workdayConfirm">

    <h1>irá trabalhar hoje?</h1>

    <span>

      <a href="/working">sim</a>
      <a href="/await">não</a>
      
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
    h1 {
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