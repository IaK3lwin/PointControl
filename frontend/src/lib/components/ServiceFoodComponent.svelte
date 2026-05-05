<script lang="ts">
    import type { Cent } from "$lib/domain/cents";
  import type { ServiceEnflatable, ServiceFood } from "$lib/domain/services"

  let {
    service,
    updateService
  } : { service : ServiceFood, updateService: (serviceUpdated: ServiceFood | ServiceEnflatable) => void} = $props()

  // quais propriedades do service serão reativos?
  /**
   * quantity -> reacticve
   * price -> reactive
   *  
   */

   //console.log("service food: ", service)

   let quantity: number = $derived(service.getQuantity())
   let priceView: string = $derived(service.getTotalValue())


   //handles
   function handleAddQuantity() {
    //console.log(service.getPrice())
    service.add()
    updateService(service)
    quantity = service.getQuantity()
    priceView = service.getTotalValue()
    //console.log(service.getPrice())
   }

   function handleRemoveQuantity() {
    //console.log(service.getPrice())
    service.remove()
    updateService(service)
    quantity = service.getQuantity()
    priceView = service.getTotalValue()
    //console.log(service.getPrice())
   }

</script>

<article>
  <header>
    <h2>{service.getName()}</h2>
  </header>
  <main>
    <h2>Quantidade: {quantity}x</h2>
  </main>
  <footer>
    <button onclick={handleRemoveQuantity} style="color: red;">-</button>
    <p>{priceView}</p>
    <button onclick={handleAddQuantity} style="color: green;">+</button>
  </footer>
</article>


<style>
  article {
    display: flex;
    flex-flow: column;
    gap: .5rem;
    background-color: #10111da8;
    border-radius: .5rem;
    padding: .5rem;
    margin: .5rem 0;
  }

  header {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;

  }

  main {
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }

  footer {
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;

    & button {
      all: unset;
      border: 1px solid white;
      border-radius: 50%;
      padding: .5rem;
      width: 1rem;
      height: 1rem;

      background-color: rgba(255, 255, 255, 0.26);

      display: flex;
      justify-content: center;
      align-items: center;

      font-size: 1.4rem;
      font-weight: bolder;

    }

    & p {
      color: rgb(98, 216, 98);
      font-weight: bolder;
    }
  }
</style>