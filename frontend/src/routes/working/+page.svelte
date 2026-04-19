<script lang="ts">
  import { Manager } from "$lib/domain/manager"
  import type { WorkDay } from "$lib/domain/workDay"
  import type {Account} from "$lib/domain/accoun"
  import { CopyPlus } from 'lucide-svelte'
  import AccountElement from "$lib/components/AccountElement.svelte"

  const manager: Manager = Manager.get()
  const workday: WorkDay = manager.getWorkDay()

  let accounts : Map<number, Account> = $state(workday.accountsInDay)

</script>

<section id="container">

  <h1>contas</h1>

  <section id="wrapperAcounts">

    {#each accounts as [id, account]}

      <AccountElement account={account} idLabel={id}/>
      
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
    height: 100%;

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


  }

  span button:hover {

    cursor: pointer;

  }
</style>