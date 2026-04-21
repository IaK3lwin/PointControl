<script lang="ts">
  import { Manager } from "$lib/domain/manager"
  import type { WorkDay } from "$lib/domain/workDay"
  import type {Account} from "$lib/domain/accoun"
  import AccountElement from "$lib/components/AccountElement.svelte"
  import {CopyPlus} from "@lucide/svelte"
  import WarnComponent from "$lib/components/WarnComponent.svelte"

  const manager: Manager = Manager.get()
  const workday: WorkDay = manager.getWorkDay()



  let accounts : Map<number, Account> = $state(workday.accountsInDay)

</script>

<section id="container">

  <h1>contas</h1>

  <section id="wrapperAcounts">

    {#each accounts as [id, account]}

      <AccountElement account={account} idLabel={id}/>

      {:else}
        <section id="warnContainer">
          <WarnComponent title="Opss.." message="Não há contas registrada no momento"/>

        </section>
      
    {/each}

  </section>

  <span>
    <button>
      <CopyPlus size={30}/>
    </button>
  </span>

</section>


<style>
  #container {

    width: 100%;
    height: 100%;

    display: flex;
    flex-flow: column;
    justify-items: center;

  }

  #container h1 {
    text-align: center;
  }

  span {
    pointer-events: none;
    position: absolute;
    width: 100%;
    height: 90%;
    
    display: flex;
    flex-flow: column;
    justify-content: flex-end;
    align-items: flex-end;
    gap: 1rem;
    padding: 1rem;
  }

  span button {
    all: unset;
    width: 3rem;
    height: 3rem;

    pointer-events: all;

    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(173, 163, 163, 0.226);
    box-shadow: 4px 3px 10px rgba(107, 70, 70, 0.336);
    border-radius: 50%;
  }

  span button:hover {

    cursor: pointer;

  }

  section#warnContainer {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  #wrapperAcounts {
    width: 100%;
    height: 90%;
    background-color: red;
  }
</style>