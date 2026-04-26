<script lang="ts">
    import type { Cent } from "$lib/domain/cents";
  import type { ServiceFood } from "$lib/domain/services"

  let {
    service
  } : { service : ServiceFood} = $props()

  // quais propriedades do service serão reativos?
  /**
   * quantity -> reacticve
   * price -> reactive
   *  
   */

   let quantity: number = $state(1)
   let priceView: string = $state(service.getPrice().toReal())

</script>

<article>
  <header>
    <h2>{service.getName()}</h2>
  </header>
  <main>
    <h2>Quantidade: {quantity}x</h2>
  </main>
  <footer>
    <button>Remover</button>
    <p>{priceView}</p>
    <button>Adicionar</button>
  </footer>
</article>


<style>

</style>