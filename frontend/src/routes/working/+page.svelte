<script lang="ts">
  import { Manager } from "$lib/domain/manager";
  import { WorkDay } from "$lib/domain/workDay";
  import { AccountStatus, Account } from "$lib/domain/accoun";
  import AccountElement from "$lib/components/AccountElement.svelte";
  import WarnComponent from "$lib/components/WarnComponent.svelte";
  import ButtonOptions from "$lib/components/ButtonOptions.svelte";
  import { type OptionsButton } from "$lib/components/ButtonOptions.svelte";
  import CreateAccountForm from "./components/CreateAccountForm.svelte";
  import { accountsWritable } from "$lib/stores/listAccounts.svelte";
  import randomColor from "$lib/constants/colors";
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import type { ServiceEnflatable, ServiceFood } from "$lib/domain/services";

  const manager: Manager = Manager.get();
  let workday: WorkDay | null = null;

  if (browser) {
    workday = manager.getWorkDay();
    accountsWritable.set(workday.accountsInDay);
  }

  let showCreateAccountPopup: boolean = $state(false);

  function ShowFormCreateAccount(event: Event) {
    event.preventDefault();
    showCreateAccountPopup = true;
  }

  const options: OptionsButton[] = [
    {
      name: "Criar Conta",
      callback: ShowFormCreateAccount,
    },
  ];

  function updateAccountsstate(newAccount: Account) {
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

  function handleUpdateService(accountCurrent: Account): void {

    accountsWritable.update((accounts) => {
      accounts.map((account) => {
        if (account.getId() == accountCurrent.getId()) {
          accountCurrent.service.map((service) => {
            console.log(service.getName());
            if (service.getId() == service.getId()) {
              return accountCurrent;
            }
          });
        }
      });

      return accounts;
    });

    
    if (workday) {
      workday.accountsInDay = $accountsWritable
      console.log(`workday updates with accountInday : `, workday)
      manager.saveWorkdays(workday);
    }
  }
</script>

{#if showCreateAccountPopup}
  <CreateAccountForm
    closed={() => {
      showCreateAccountPopup = false;
    }}
    update={updateAccountsstate}
  />
{/if}

<section id="container">
  <h1 style:--random-color={randomColor("1")}>contas</h1>

  <div id="containerAccount">
    <span id="accountWrapper">
      {#each $accountsWritable as account, index (index)}
        {#if account.status == AccountStatus.OPEN}
          <AccountElement
            {account}
            idLabel={index}
            updateAccountsInWorkday={handleUpdateService}
          />
        {/if}
      {/each}
    </span>
  </div>

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

  h1 {
    text-align: center;
  }

  #containerAccount {
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
</style>
