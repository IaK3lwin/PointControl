<script lang="ts">
  import { Manager } from "$lib/domain/manager"
    import { WorkDay } from "$lib/domain/workDay";
    import type { WorkDayCollection } from "$lib/domain/WorkDayCollection";

  const manager: Manager = Manager.get()

  try {
    const collectio: WorkDayCollection = manager.getWorkDayCollection()
    console.log("coleção antes de ser filtrada: ", collectio)
    const data: string = new Date().toLocaleDateString('pt-BR')

    let newCollection = collectio.filter((key) => {
      if (key == data) {
        return true
      }

      return false
    })

    console.log("nova coleção a poartir de umfiltro: ", newCollection)
  } catch(e) {
    console.log("Erro: ", e)
  }
  
</script>

<h1>Dashboard</h1>