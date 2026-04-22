<script lang="ts">
    import type { Account } from "$lib/domain/accoun";
    import randomColor from "$lib/constants/colors";

  let {account, idLabel} : {account : Account, idLabel : number } = $props()
</script>

<article style:--random-color={randomColor()}>

  <section id="containerService">
    <span id="wrapperService">
      
    </span>

  </section>

  <header style:--random-color={randomColor()} >
    <div class="square" style:--color-standard={account.status.toString().toLocaleLowerCase() == "open" ? "#005005" : "#56005"}>
      status: <strong >{account.status.toString().toLowerCase() == "open" ? "aberto" : "fechado"}</strong>
    </div> 
    
    <button style:--random-color={randomColor()}>
      fechar
    </button>

    <button style:--random-color={randomColor()}>
      adicionar
    </button>
  </header> 

</article>


<style>
  article {
    height: 90%;
    min-width: 90%;
    border-radius: .5rem;
    border: 1px solid black;
    background-color: var(--random-color);
    
    padding: .4rem;

    display: grid;
    grid-template-columns: auto;
    grid-template-rows: 1fr auto;
  }

  section#containerService {
    padding: .5rem;
    border: 1px solid black;
    border-radius: .5rem;

    display: flex;
    flex-flow: column;
    overflow: hidden;

    height: 95%;

    background-color: var(--random-color);
    
    
  }

  header {
    display: flex;
    justify-content: space-around;
    width: 95%;
  }

  header div, button {

    border: 1px solid black;
    border-radius: .5rem;
    padding: .4rem;
    background-color: var(--random-color);
    color: var(--color-standard);

  }
</style>