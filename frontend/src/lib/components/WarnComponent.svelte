<script lang="ts">

  import {MessageCircleWarning} from "@lucide/svelte"

  const {title, message, imageUrl} : {title : string, message : string, imageUrl ?: string} = $props()

  const imageStandard: string = "https://cdn3d.iconscout.com/3d/premium/thumb/observe-emoji-3d-icon-png-download-9008795.png"

</script>


<section>

  <h1> <MessageCircleWarning/> {title}</h1>
  <img src={imageUrl ? imageUrl : imageStandard} alt={`Warn image ${title}`}>
  <p>{message}</p>

</section>


<style>

  section {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 1rem;

  }

  section h1 {
    font-size: 1.7rem;
  }

  section img {
    width: auto;
    height: auto;
    max-width: clamp(6rem, 7rem, 8rem);

  }

</style>