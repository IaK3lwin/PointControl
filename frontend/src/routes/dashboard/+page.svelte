<script lang="ts">
  import "./styles/main.css";
  import { Cent } from "$lib/domain/cents";
  import { Manager } from "$lib/domain/manager";
  import { PaymentManager } from "$lib/domain/PaymentManager";
  import { WorkDayCollection } from "$lib/domain/WorkDayCollection";
  import { writable, type Writable } from "svelte/store";
  import { LucideMenu } from "@lucide/svelte";
  import { returnWorkdayPaitTrue } from "./scripts/returnWorkdayPaitTrue";
  import FrameContainer from "$lib/components/FrameContainer.svelte";
  import WorkdayPaid from "$lib/components/WorkdayPaid.svelte";

  const manager: Manager = Manager.get();

  const workdaysCollectionReactive: Writable<WorkDayCollection | null> =
    writable(manager.getWorkDayCollection()?.filterNotPaid());

  let modeFilter: string = $state("notPait");

  let workdayCollectionCurrent: WorkDayCollection | null =
    manager.getWorkDayCollection();

  let paymentManager: PaymentManager = new PaymentManager(
    workdayCollectionCurrent ?? new WorkDayCollection(new Map()),
  );

  let amountToPay: string = $state(
    paymentManager.getStatisticsNeedToBePai()[0].toReal(),
  );

  let dailyPayment: string = $state(
    paymentManager.getStatisticsNeedToBePai()[1].toReal(),
  );

  let frameContainerSendPayment: FrameContainer | null = $state(null);

  function updateWorkdayCollection(workdayCollectionUpdate: WorkDayCollection) {
    workdaysCollectionReactive.set(workdayCollectionUpdate);

    workdayCollectionUpdate.forEach((key, workdayCurrentUpdated) => {
      if (!workdayCurrentUpdated) {
        return;
      }
      manager.saveWorkdays(workdayCurrentUpdated);
    });
  }

  function changeFilter(value: "notPait" | "pait" | "all") {
    modeFilter = value;

    const workdayCollection = manager.getWorkDayCollection();
    if (value == "pait") {
      console.log("devia atualizar");
      if (workdayCollection) {
        workdaysCollectionReactive.set(
          returnWorkdayPaitTrue(workdayCollection),
        );
        return;
      }
    }

    if (value == "all") {
      if (workdayCollection) {
        workdaysCollectionReactive.set(workdayCollection);
        return;
      }
    }

    if (workdayCollection) {
      workdaysCollectionReactive.set(workdayCollection.filterNotPaid());
    }
  }

  let valueSetPayment: string | null = $state(null);
  function setPayment() {
    if (!valueSetPayment) return;

    console.log("este é o valor: ", valueSetPayment);
    const newWage: Cent = new Cent(Cent.convertValueToCent(valueSetPayment));
    const workdayCollectionPaymentUpdated = paymentManager.setPayment(newWage);
    updateWorkdayCollection(workdayCollectionPaymentUpdated);
  }
</script>

<FrameContainer bind:this={frameContainerSendPayment}>
  <h2>Valor a ser pago</h2>
  <input
    type="text"
    placeholder="10,00"
    inputmode="numeric"
    bind:value={valueSetPayment}
  />
  <button onclick={setPayment}> Efetuar cadastro </button>
</FrameContainer>

<section class="container">
  <!-- primeira parte de cima-->
  <section>
    <h2>Dashboard</h2>
    <div>
      <hr />
      <h2>filtrar por</h2>
      <section class="containerFilter">
        <button
          class:buttonFilterSelected={modeFilter === "pait"}
          onclick={changeFilter.bind(null, "pait")}
        >
          Pagos
        </button>
        <button
          class:buttonFilterSelected={modeFilter === "notPait"}
          onclick={changeFilter.bind(null, "notPait")}
        >
          Não pagos
        </button>
        <button
          class:buttonFilterSelected={modeFilter == "all"}
          onclick={changeFilter.bind(null, "all")}
        >
          Todos
        </button>
      </section>
      <hr />
    </div>

    <!-- segunga parte que ocupara metade da grid-->
    <section>
      <section class="wrapper">
        {#if $workdaysCollectionReactive}
          {#each $workdaysCollectionReactive as workday}
            <WorkdayPaid {workday} />
          {/each}
        {/if}
      </section>
    </section>
    <!-- Ultima parte que ocupara 1fr da tela -->
    <section>
      <header id="navOptions">
        <nav>
          <button onclick={frameContainerSendPayment.showComponent}>
            <img
              src="/icons/payment-method.png"
              alt="imagem do botão de fazer pagamento"
            />
            <p>Cadastrar pagamento</p>
          </button>
          <p id="nuberStatistics">
            <strong id="amountToPay">
              {amountToPay}
            </strong>
            /
            <strong id="dailyPayment">
              {dailyPayment}
            </strong>
          </p>
          <button>
            <LucideMenu />
          </button>
        </nav>
      </header>
    </section>
  </section>
</section>
