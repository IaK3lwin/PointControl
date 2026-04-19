<script lang="ts">
    import type { Account } from "$lib/domain/accoun";

  let {account, idLabel} : {account : Account, idLabel : number } = $props()
</script>

<article>

 <header>
  n°: {idLabel}
  Valor total: {account.total}
 </header> 

</article>