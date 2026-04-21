<script lang="ts">
    import { accountFactory, type Account } from "$lib/domain/accoun";
    import { Manager } from "$lib/domain/manager";
    import { X } from "@lucide/svelte"

  let {closed, update} : {closed ?: () => void, update : (account: Account) => void} = $props()

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault()

    console.log("funciona")

    const form: HTMLFormElement = event.currentTarget as HTMLFormElement

    const data: FormData = new FormData(form) 

    if (data.get('name')) {

      if (data.get('name') == null) {
        window.alert("erro")
        return
      }

      const acccount: Account = accountFactory(data.get('name')?.toString() ?? "")

      console.log("teste")
      console.table(acccount)

      update(acccount)

    }

  }


</script>

<section>

  
  <div>

    <span id="containerClosed"><button id="closed" onclick={closed}><X /></button></span>

    <h2>Criar conta</h2>
    <form onsubmit={handleSubmit}>
      <span>
          <label for="name">nome</label>
          <input type="text" name="name">
        </span>
        <span>
          <input type="submit" value="Criar">
      </span>
    </form>
    
  </div>

</section>


<style>
  section {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex ;
    flex-flow: column;
    gap: .5rem;
    align-items: center;
    justify-content: center;
  }


  #containerClosed {
    pointer-events: all;
    display: flex;
    width: 100%;
    justify-content: flex-end;
  }

  button#closed {
  border: none;  
  background-color: transparent;

  }

  section div {
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
    border-radius: .5rem;
  }


  span {
    background-color: transparent;
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
  }
  
  input {
    all: unset;
    display: flex;
    border: 2px solid white;
    width: 60%;
    border-radius: .5rem;
    padding: 0px .5rem;
    background-color: rgba(69, 77, 104, 0.144);
    pointer-events: painted;
  }
</style>