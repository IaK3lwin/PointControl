<script lang="ts">
  import { Manager } from "$lib/domain/manager"
  import type { WorkDay } from "$lib/domain/workDay"
  import type {Account} from "$lib/domain/accoun"
  import AccountElement from "$lib/components/AccountElement.svelte"
  import WarnComponent from "$lib/components/WarnComponent.svelte"
  import ButtonOptions from "$lib/components/ButtonOptions.svelte"
  import {type OptionsButton} from "$lib/components/ButtonOptions.svelte"
  import CreateAccountForm from "./components/CreateAccountForm.svelte"
  import { accountsWritable } from "$lib/stores/listAccounts.svelte"
  import {get as getWritable} from "svelte/store"

  const manager: Manager = Manager.get()
  const workday: WorkDay = manager.getWorkDay()
  accountsWritable.set(workday.accountsInDay)

  let showCreateAccountPopup: boolean = $state(false)

  function ShowFormCreateAccount(event: Event) {
    event.preventDefault()
    showCreateAccountPopup = true
  }

  const options: OptionsButton[] = [
    {
      name : "Criar Conta",
      callback : ShowFormCreateAccount,
      
    }]

  function updateAccountsstate(newAccount: Account) {
   
    $accountsWritable = $accountsWritable.set($accountsWritable.size + 1,newAccount)
    
  }

</script>


{#if showCreateAccountPopup}
  <CreateAccountForm closed={() => {showCreateAccountPopup = false}} update={updateAccountsstate}/>
{/if}

<section id="container">


  <h1>contas</h1>

  <section id="wrapperAcounts">

    {#each $accountsWritable as [id, account]}
      <AccountElement account={account} idLabel={id}/>

      {:else}
        <section id="warnContainer">
          <WarnComponent title="Opss.." message="Não há contas registrada no momento"/>

        </section>
      
    {/each}

  </section>

  <ButtonOptions {options} />

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
  }
</style>