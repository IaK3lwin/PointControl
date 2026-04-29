<script lang="ts">
  import "./style/account.css";
  import { PickaxeIcon, Plus, Sandwich, Type, X } from "@lucide/svelte";
  import FrameContainer from "../FrameContainer.svelte";
  import randomColor from "$lib/constants/colors";
  import WarnComponent from "../WarnComponent.svelte";
  import { AccountStatus, type Account, type AccountData, type TypePayment } from "$lib/domain/accoun";
  import { TypeService } from "$lib/domain/typeServices";
  import { serviceList } from "$lib/constants/srevices";
  import type { ServiceEnflatable, ServiceFood } from "$lib/domain/services";
  import ServiceFoodComponent from "../ServiceFoodComponent.svelte";
  import ServiceEnflatableComponent from "../ServiceEnflatableComponent.svelte";

  let {
    accountProps,
    updateAccount,
    idLabel,
  }: {
    accountProps: Account;
    idLabel: number;
    updateAccount: (accountCurrent: Account) => void;
  } = $props();

  const icons: Map<string, Map<string, string>> = new Map([
    ["closedMenu", new Map([
      ["pix", "https://i.postimg.cc/FzLkVXPn/pix36px.png"],
      ["monay", "https://i.postimg.cc/BQNK3382/monay36px.png"],
      ["credit", "https://i.postimg.cc/5yKbPstr/image-removebg-preview.png"]
    ])]
  ])
  
  let priceTotal: string = $derived(accountProps.price.toReal());

  let statusAccount: string = $derived(accountProps.status);

  let serviceState: (ServiceEnflatable | ServiceFood)[] = $derived(
    accountProps.service,
  );

  let screenAddServiceShow: FrameContainer | null = $state(null);
  
  
  function handleShowScreenAddService() {
    if (screenAddServiceShow) screenAddServiceShow.showComponent();
  }

  let screenClosedAccountShow: FrameContainer | null = $state(null)
  function handleShowScreenClosedAccount() {
    if (screenClosedAccountShow) {screenClosedAccountShow.showComponent()}
  }
  
  let typeServiceCurrent: TypeService | null = $state(null);

  let typePaymentCurrent: TypePayment = $state(null)

  function AddSerivceInAccount(newService: ServiceEnflatable | ServiceFood) {
    console.log("service old : ", accountProps.service);
    accountProps.addService(newService);
    console.log("service new", accountProps.service);
    updateAccount(accountProps);
  }

  function handleUpdateServices(
    serviceUpdated: ServiceEnflatable | ServiceFood,
  ) {
    serviceState = serviceState.map((serviceCurrent) => {
      if (serviceCurrent.getId() == serviceUpdated.getId()) {
        return serviceUpdated;
      }
      return serviceCurrent;
    });

    accountProps.service = serviceState;
    updateAccount;
  }

  function handleClosedAccount() {
    if (!typePaymentCurrent) {
      return
    }
    accountProps.setTypePayment(typePaymentCurrent)
    accountProps.status = AccountStatus.CLOSED
    updateAccount(accountProps)
  }
</script>

<FrameContainer bind:this={screenClosedAccountShow}>
  <div class="containerClosedAccount">
    {#each ['monay' , 'credit', 'pix' ] as type}

      <button onclick={() => {typePaymentCurrent = type as TypePayment}}>
        <img src={icons.get('closedMenu')?.get(type)} alt="">
        <p>{type == 'monay' ? 'Dinheiro' : type == 'credit' ? 'Credito' : 'Pix'}</p>
      </button>
      
    {/each}

    {#if typePaymentCurrent}
      {#if typePaymentCurrent == 'monay'}
        <h2>Troco?</h2> 
        <input type="text" placeholder="Valor entregue">
        <p>Troco a entregar: <strong>[valor ficará aqui]</strong></p>
      {/if} 

      <button onclick={handleClosedAccount}>Fechar conta</button>
    {/if}
  </div>
</FrameContainer>

<FrameContainer bind:this={screenAddServiceShow}>
  <span class="containerPop">
    <h1>adicionar</h1>
    <label for="typeService">Tipo do serviço</label>
    <span>
      {#each Object.values(TypeService) as type}
        <button
          onclick={() => {
            typeServiceCurrent = type;
          }}
        >
          {#if type == TypeService.FOOD}
            <Sandwich />
          {:else}
            <img src="https://i.postimg.cc/tgccZ7RF/play.png" alt="" />
          {/if}
          {type == "food" ? "lanche" : "brinquedo"}
        </button>
      {/each}
    </span>
  </span>

  {#if typeServiceCurrent == TypeService.FOOD}
    <h2>Qual lanche?</h2>
    {#each serviceList.get(TypeService.FOOD) as service}
      <button
        onclick={() => {
          AddSerivceInAccount(service);
        }}> <img src={service.getName() == 'crepe' ? 'https://i.postimg.cc/9MLms8kf/crepis24px.png' : service.getName() == 'pipoca' ? 'https://i.postimg.cc/yxnLm9ks/pipoca24px.png' : 'https://i.postimg.cc/FsVYxpr0/algodaodoce24px.png'} alt=""> {service.getName()}</button
      >
    {/each}
  {:else if typeServiceCurrent == TypeService.ENFLATABLE}
    <h2>Qual brinquedo:</h2>
  {/if}
</FrameContainer>

<article style:--random-color={randomColor("2")}>
  <!-- aside | contem informações adicionais -->
  <aside>
    <div style:--random-color={randomColor("1")}>
      <strong>número</strong>
      <p>{idLabel}</p>
    </div>

    <div style:--random-color={randomColor("1")}>
      <strong>cliente</strong>
      <p>{accountProps.getName()}</p>
    </div>

    <div style:--random-color={randomColor("1")}>
      <strong>Valor total</strong>
      <p>{priceTotal}</p>
    </div>
  </aside>

  <!-- Container dos serciços-->
  <section id="containerService" style:--random-color={randomColor("1")}>
    <span id="wrapperService">
      {#each serviceState as service}
        {#if service.type == TypeService.FOOD}
          <ServiceFoodComponent service={service as ServiceFood} />
        {:else}
          <ServiceEnflatableComponent
            service={service as ServiceEnflatable}
            change={handleUpdateServices}
          />
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
    <div class="square">
      status: {statusAccount == "OPEN" ? "aberto" : "fechado"}
    </div>

    <button style:--random-color={randomColor("1")} onclick={handleShowScreenClosedAccount}>
      <X />
      <p>fechar</p>
    </button>

    <button
      style:--random-color={randomColor("1")}
      onclick={handleShowScreenAddService}
    >
      <Plus />
      <p>adicionar</p>
    </button>
  </header>
</article>
