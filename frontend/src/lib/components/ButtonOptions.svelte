<script lang="ts">
    import type { TypeService } from "$lib/domain/typeServices";
  import { CopyPlus } from "@lucide/svelte"
  import type { SvelteComponent } from "svelte"

  export type OptionsButton = {
    name : string
    path ?: string
    icone ?: string | SvelteComponent
    callback : (event : Event) => void

  } 

  let {options} : {options ?: OptionsButton[], onclick ?: Function}  = $props()

  let optionsVisible: boolean = $state(false)

</script>


<span id="container">
  {#if optionsVisible }
    
    <div id="containerOptions">

      {#each options as  option (option.name) }

        <button onclick={option.callback} aria-label="button" class="option" >
            {option.icone && ''}
            {option.name}
        </button>
      
      {/each}  

    </div>

  {/if}

  <button onclick={() => {optionsVisible = !optionsVisible}} id="buttonMain">
    <CopyPlus />
  </button>

</span>


<style>
  span {
    pointer-events: none;
    position: absolute;
    width: 100%;
    height: 90%;
    
    display: flex;
    flex-flow: raw;
    justify-content: flex-end;
    align-items: flex-end;
    gap: 1rem;
    padding: 1rem;
  }

  span button#buttonMain {
    all: unset;
    min-width: 3rem;
    min-height: 3rem;

    pointer-events: all;

    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(173, 163, 163, 0.226);
    box-shadow: 4px 3px 10px rgba(107, 70, 70, 0.336);
    border-radius: 50%;
  }

  span button:hover {

    cursor: pointer;

  }

  #containerOptions {
    pointer-events: painted;
    width: 100%;
    height: auto;
    padding: .5rem;
    gap: 1rem;
    display: grid;
    grid-template-columns: auto auto;
    justify-content: flex-end;

    & button {

      pointer-events:all;
      all: unset;
      height: auto;
      width: 100%;
      padding: .4rem;

      font-size: .8rem;
      font-weight: bold;
      white-space: nowrap;
      
      background-color: rgba(45, 47, 82, 0.384);
      border-radius: .5rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    & button:hover {
      cursor: pointer;
    }
  }

</style>