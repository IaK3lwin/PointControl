<script lang="ts">
    import { Cent } from "$lib/domain/cents";
  import { Manager } from "$lib/domain/manager"
    import { PaymentManager } from "$lib/domain/PaymentManager";
  import { WorkDay } from "$lib/domain/workDay"
  import type { WorkDayCollection } from "$lib/domain/WorkDayCollection"

  const manager: Manager = Manager.get()
  try {
    const collection = manager.getWorkDayCollection()
    console.log(collection.size())
    const payment = new PaymentManager(collection) 
    payment.setPayment(new Cent())

  } catch(e) {

  }
    
</script>

<h1>Dashboard</h1>