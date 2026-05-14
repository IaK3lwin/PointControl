<script lang="ts">

  import type { StatusWorkDay, WorkDay } from "$lib/domain/workDay";
  import "$lib/global.css";

  let { workday }: { workday: WorkDay } = $props();

  const PATH_ICONS = "/icons/";

  const icons: Record<StatusWorkDay, string> = {
    pait: PATH_ICONS + "receipt.png",
    working: PATH_ICONS+"work.png",
    planned: PATH_ICONS+"task.png",
    undefined : PATH_ICONS+"undefined.png"
  };

  let statusIcon: string = $derived.by(() => {
    let icon = workday.status
    return icons[icon]
  })

</script>


<section>
  <div class="title">
    <h2>Status</h2>
    <h2>data</h2>
    <h2>a pagar</h2>
  </div>

  <div>
    <span id="icon" class="pad">
      <img src={statusIcon} alt="imagem" />
      <p>{workday.status}</p>
    </span>
    <h2 class="pad">{workday.date}</h2>
    <p id="amountToPay" class="pad">{workday.amountToPaid.toReal()}</p>
  </div>

</section>

<style>

  section {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    overflow: hidden;

    border: 1px solid;
    border-radius: 1rem 0rem;
    background-color: #5B7E3C;
    color: white;

  }

  .title {
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    justify-content: space-evenly;
    background-color: #A2CB8B;
  }

  .title h2 {
    font-size: 1.7rem;
    font-weight: bold;
    color: #C44545;
  }

  div{
    text-align: center;

    display: flex;
    flex-flow: row nowrap;
    padding: .5rem;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  div * {
    font-size: 1.1rem;
    font-weight: bold;
    background-color: #A2CB8B;
    border-radius: .5rem;
  }

  #icon {
    min-width: 6rem;
  }

  #amountToPay {
    padding: .5rem;
    border-radius: .5rem;
    font-weight: bolder;
  }

  .pad {
    padding: 1rem .3rem;
  }
</style>
