<script lang="ts">
  import "$lib/global.css"
  import { Manager } from "$lib/domain/manager"
  import { WorkDay } from "$lib/domain/workDay"
  import { AccountStatus, Account, type AccountData } from "$lib/domain/accoun"
  import AccountElement from "$lib/components/account/AccountElement.svelte"
  import { type OptionsButton } from "$lib/components/ButtonOptions.svelte"
  import CreateAccountForm from "./components/CreateAccountForm.svelte"
  import { accountsWritable } from "$lib/stores/listAccounts.svelte"
  import randomColor from "$lib/constants/colors"
  import { browser } from "$app/environment"
  import { CopyPlus } from "@lucide/svelte"

  const manager: Manager = Manager.get();
  let workday: WorkDay | null = null;

  if (browser) {
    workday = manager.getWorkDay();
    accountsWritable.set(workday.accountsInDay);
  }

  let showCreateAccountPopup: boolean = $state(false);

  function showFormCreateAccount(event: Event) {
    event.preventDefault();
    //console.log("apertado")
    showCreateAccountPopup = true;
  }

  
  function handleSaveAccountInWorkday(newAccount: Account) {
    if (workday == null) {
      return;
    }

    accountsWritable.update((accounts) => {
      accounts.push(newAccount);
      return accounts;
    });
    workday.accountsInDay = $accountsWritable;

    manager.saveWorkdays(workday);
  }

  function handleUpdateAccount(accountUpdated: Account): void {

    //console.log("account that is updates: ", accountUpdated)

    accountsWritable.update((accountsInWritable) => {
      accountsInWritable.map((accountInMap) => {
        //console.log("Account current map : ", accountInMap)
        //console.log("accountUpdated id: ")
        if (accountInMap.getId() == accountUpdated.getId()) {
          return accountUpdated
        }
        return accountInMap
      });

      return accountsInWritable;
    });


    if (workday) {
      workday.accountsInDay = $accountsWritable
      //console.log(`workday updates with accountInday : `, workday)
      manager.saveWorkdays(workday);
    }
  }
</script>

{#if showCreateAccountPopup}
  <CreateAccountForm
    closed={() => {
      //console.log("aaa")
      showCreateAccountPopup = false;
    }}
    update={handleSaveAccountInWorkday}
  />
{/if}

<section id="container">
  <h1 style:--random-color={randomColor("1")}>contas</h1>

  <div id="containerAccount">
    <span id="accountWrapper">
      {#each $accountsWritable as account, index (index)}
        {#if account.status == AccountStatus.OPEN}
          <AccountElement
            accountProps={account}
            idLabel={index}
            updateAccount={handleUpdateAccount}
          />
        {/if}
      {/each}
    </span>
  </div>

</section>

<section class="containerButton">
  <button class="circleButton" onclick={showFormCreateAccount}>
    <CopyPlus />
  </button>
  
</section>

<style>
  #container {
    width: 100%;
    height: 100%;

    display: flex;
    flex-flow: column;
    justify-items: center;
  }

  h1 {
    text-align: center;
  }

  #containerAccount {
    z-index: 0;
    width: 100%;
    height: 90%;

    padding: 0 0.5rem 0 0.5rem;

    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;

    overflow: hidden;
  }

  #accountWrapper {
    min-width: 100%;
    height: 100%;
    overflow: scroll;

    display: flex;
    gap: 1rem;
    justify-content: flex-start;
    align-items: center;
  }

  .containerButton {
    z-index: 1;

    position: absolute;
    height: 100vh;
    width: 100vw;

    padding: .5rem;

    display: flex;
    flex-flow: column;
    justify-content: flex-end;
    align-items: flex-end;

    pointer-events: none;

  } 

</style>
