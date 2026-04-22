<script lang="ts">
  import { X } from "@lucide/svelte";

  let { children } = $props();

  let show: boolean = $state(false);

  export function showComponent() {
    show = !show;
  }
</script>

{#if show}
  <section id="containerFrame">
    <div id="frame">
      <header>
        <button onclick={() => {show = !show}}>
          <X />
        </button>
      </header>
      {@render children?.()}
    </div>
  </section>
{/if}

<style>
  #containerFrame {
    z-index: 10000;
    pointer-events: none;
    position: fixed;
    width: 100vw;
    height: 100vh;

    display: grid;
    justify-items: center;
    align-items: center;
  }

  #frame header {
    pointer-events: painted;
    display: flex;
    width: 100%;
    justify-content: flex-end;
  }

  #frame header button {
    pointer-events: all;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }

  #frame {
    pointer-events: painted;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;

    gap: 1rem;
    width: 80%;
    padding: 1rem;
    background-color: rgba(196, 196, 196, 0.541);
    backdrop-filter: blur(3px);
    border: 1px solid white;
    border-radius: 0.5rem;
  }
</style>
