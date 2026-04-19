<script lang="ts">
    import { onMount } from "svelte";

  let urlLogo: string | null = $state(null)
  onMount(() => {
    urlLogo = localStorage.getItem("urlLogo")
  })

</script>
<header>
  {#if urlLogo}
    <img src="" alt="logo da marca">
  {/if}

  <h1>PointControl</h1>
  <p>Gerenciador de ponto</p>
</header>

<style>

  header {
    margin: 0;
    padding: 1rem;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;

  }

  img {
    width: auto;
    height: auto;
    max-width: 3rem;
  }

  h1 {
    font-size: 1.5rem;
  }
  
  p {
    font-size: .6rem;
  }
</style>