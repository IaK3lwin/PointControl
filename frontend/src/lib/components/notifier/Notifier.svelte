<script lang="ts">
  import type { SvelteComponent } from "svelte"
  import "./styles/main.css"
  import { BadgeCheck, CircleAlert, Component, X } from "@lucide/svelte"
  import type { TypeMessages } from "$lib/types/messagesType"

  let title: string = $state('')
  let message: string = $state('')
  let typeMessage: TypeMessages | null = $state(null)

  const icons = {
    error: X,
    sucess: BadgeCheck,
    warning: CircleAlert
  }
  
</script>

<section class="containerNotifier">
  <article>
    <h1>{title}</h1>
    <p>{message}</p>
  </article> 
</section>
