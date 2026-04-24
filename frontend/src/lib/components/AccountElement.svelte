<script lang="ts">
  import { AccountStatus, type Account, type TypePayment } from "$lib/domain/accoun"
  import randomColor from "$lib/constants/colors"
  import { TypeService } from "$lib/domain/typeServices"
  import WarnComponent from "./WarnComponent.svelte"
  import ServiceInflatable from "./ServiceEnflatable.svelte"
  import ServiceFoodComponent from "./ServiceFoodComponent.svelte"
  import "$lib/select.css"
  import FrameContainer from "./FrameContainer.svelte"
  import { PickaxeIcon } from "@lucide/svelte"
  import type { ServiceEnflatable, ServiceFood } from "$lib/domain/services"
  import { serviceList } from "$lib/constants/srevices"
  import { onMount } from "svelte";
    import { accountsWritable } from "$lib/stores/listAccounts.svelte";

  let { account, idLabel, updateAccount}: { account: Account; idLabel: number, updateAccount: (account: Account) => void } = $props();
  let serviceUpdatedState: (ServiceEnflatable | ServiceFood)[] = $state(account.service)
  let frameClosed: FrameContainer | null = $state(null);
  let frameAddService: FrameContainer | null = $state(null);

  let typeValueOnChange: TypeService | null = $state(null)
  function handleOnchangeTypeService(event: Event)  {
        let select : HTMLSelectElement = event.currentTarget as HTMLSelectElement

        typeValueOnChange = select.value as TypeService

  }

  let serviceSelected: ServiceEnflatable | ServiceFood | null = $state(null)
  let priceTotal: string = $state("")
  

  

  function handleShowClosedFrame() {
    if (!frameClosed) {
      return;
    }
    frameClosed.showComponent();
  }

  function handleShowAddServiceFrame() {
    if (!frameAddService) {
      return;
    }

    frameAddService.showComponent();
  }

  function handleSubmitClosedAccount(event: SubmitEvent) {
    event.preventDefault()
    const data = new FormData(event.currentTarget as HTMLFormElement)
    const response = data.get('typePayment')?.toString() ?? null
    if (response) {
      account.setTypePayment(response as TypePayment) 
    }
    else {
      account.setTypePayment(null) 
    }

    account.status = AccountStatus.CLOSED
    
    updateAccount(account)
  }

  function handleCreateService(event: MouseEvent) {
    if (serviceSelected) {
      account.addService(serviceSelected)
      console.log(`accout ${account.getName()} have a new service added: ${serviceSelected} log: HandleCreateService`, account)
      serviceUpdatedState = account.service
      account.price.sumValue(serviceSelected.getPrice().getCent())
      updateAccount(account)
    }

    else {
      console.log("handleCreateService: serviceSelect undefined -> ",serviceSelected)
    }
  }

  function handleChangeService(serviceCurrent: ServiceEnflatable | ServiceFood) {
    serviceUpdatedState.map((services) => {
      if (services.getId() == serviceCurrent.getId()) {
        return serviceCurrent
      }
    })
    
    account.service = serviceUpdatedState
    priceTotal = account.updatePrice()
   
  }
  
</script>

  <FrameContainer bind:this={frameClosed}>
    <form id="formClosed" onsubmit={handleSubmitClosedAccount}>
      <label for="typeAccount">forma de pagamento</label>
      <select name="typePayment" id="formPayment" class="select-choices">
        <option value="money">Dinheiro</option>
        <option value="credit">Crédito</option>
        <option value="pix"> <PickaxeIcon /> Pix</option>
      </select>

      <input type="submit" value="Fechar">
    </form>
  </FrameContainer>

  <FrameContainer bind:this={frameAddService}>

    <h1>adicionar</h1>
    <span>

      <label for="typeService">Tipo do serviço</label>
      <select name="typeService" id="typeService" onchange={handleOnchangeTypeService}>
        {#each Object.values(TypeService) as value, index (index)}
          <option value={value}>{value == 'food' ? 'lanche' : 'brinquedo'}</option>
        {/each}
      </select>

    </span> 

    {#if typeValueOnChange == TypeService.FOOD}
      <h2>Qual lanche?</h2>
      <select name="serviceCurrent" id="serviceCurrent" bind:value={serviceSelected}>
        {#each serviceList.get(TypeService.FOOD) as service}
          <option value={service}>{service.getName()}</option>
        {/each}
      </select>
    {:else}
      <h2>Qual brinquedo:</h2>
      <select name="serviceCurrent" id="serviceCurrent" bind:value={serviceSelected}>
        {#each serviceList.get(TypeService.ENFLATABLE) as service}
          <option value={service}>{service.getName()}</option>
        {/each}
      </select>
    {/if}
   
    <button onclick={handleCreateService}>Criar</button>
  </FrameContainer>

<article style:--random-color={randomColor("2")}>
  <!-- aside | contem informações adicionais -->
  <aside>
    <div style:--random-color={randomColor("1")}>
      <strong>número:</strong>
      {idLabel}
    </div>

    <div style:--random-color={randomColor("1")}>
      <strong>cliente:</strong>
      {account.getName()}
    </div>

    <div style:--random-color={randomColor("1")}>
      <strong>total</strong>: {priceTotal}
    </div>
  </aside>

  <!-- Container dos serciços-->
  <section id="containerService" style:--random-color={randomColor("1")}>
    <span id="wrapperService">
      {#each serviceUpdatedState as service}
        {#if service.type == TypeService.FOOD}
          <ServiceFoodComponent {service}  />
        {:else}
          <ServiceInflatable service={service as ServiceEnflatable} change={handleChangeService} />
        {/if}
      {:else}
        <WarnComponent
          title="Sem serviços cadastrados"
          message="Cadastre serviços"
        />
      {/each}
    </span>
  </section>

  <!--  Informações de status e operações possíveis em uma conta -->
  <header style:--random-color={randomColor("2")}>
    <div
      class="square"
      style:--color-standard={account.status.toString().toLocaleLowerCase() ==
      "open"
        ? "#005005"
        : "#56005"}
    >
      status: <strong
        >{account.status.toString().toLowerCase() == "open"
          ? "aberto"
          : "fechado"}</strong
      >
    </div>

    <button
      style:--random-color={randomColor("1")}
      onclick={handleShowClosedFrame}
    >
      fechar
    </button>

    <button
      style:--random-color={randomColor("1")}
      onclick={handleShowAddServiceFrame}
    >
      adicionar
    </button>
  </header>
</article>

<style>
  article {
    height: 90%;
    min-width: 90%;
    border-radius: 0.5rem;
    border: 1px solid black;
    background-color: var(--random-color);

    padding: 0.4rem;

    display: grid;
    grid-template-columns: auto;
    grid-template-rows: 0.1fr 1fr auto;
    gap: 0.4rem;
  }

  aside {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    gap: 0.4rem;
    margin: 0 0.5rem;

    & > * {
      border: 1px solid;
      border-radius: 0.5rem;
      height: auto;

      display: flex;
      flex-flow: row wrap;
      align-items: center;
      justify-content: center;
      padding: 0.4rem;

      background-color: var(--random-color);
      backdrop-filter: brightness(20%) saturate(80%) opacity(50%);
    }
  }

  section#containerService {
    padding: 0.5rem;
    border: 1px solid black;
    border-radius: 0.5rem;

    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    height: 95%;

    backdrop-filter: blur(5px);
    background-color: var(--random-color);
  }

  #wrapperService {
    width: 100%;
    overflow-y: scroll;
    display: flex;
    flex-flow: column nowrap;
  }

  header {
    display: flex;
    justify-content: space-around;
    width: 95%;
  }

  header div,
  button {
    border: 1px solid black;
    border-radius: 0.5rem;
    padding: 0.4rem;
    color: var(--color-standard);
    background-color: var(--random-color);
  }

  #formClosed label{
    font-size: 1.3rem;
    
  }

  #formClosed {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    gap: .5rem;
    
  }

  #formClosed input[type="submit"] {
    padding: .5rem;
  }


</style>
