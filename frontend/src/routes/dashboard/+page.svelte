<script lang="ts">
    import { Cent } from "$lib/domain/cents";
  import { Manager } from "$lib/domain/manager"
    import { PaymentManager } from "$lib/domain/PaymentManager"
  import { WorkDay } from "$lib/domain/workDay"
  import  { WorkDayCollection } from "$lib/domain/WorkDayCollection"
  import { workDayFactory } from "$lib/domain/workDay"

  const manager: Manager = Manager.get()

  try {
    const collection = manager.getWorkDayCollection()
    console.log(collection.size())
    const payment = new PaymentManager(collection.filterNotPaid()) 
    payment.setPayment(new Cent(Cent.convertValueToCent("50,00")))

    const data: string = new Date().toLocaleDateString('pt-BR')
    const workdaysMap: Map<string, WorkDay> = new Map()

    for (let i of  [1,2,3]) {
      let newDate: string[] = data.split('')
      newDate[1] = String(parseInt(newDate[1]) + i)
      const newWorkday = workDayFactory()
      newWorkday.date = newDate.toString()
      newWorkday.date = newWorkday.date.slice().replaceAll(',', "").slice(1)
      workdaysMap.set(newWorkday.date, newWorkday)
    }

    const workdayCollections: WorkDayCollection = new WorkDayCollection(workdaysMap)

    workdayCollections.forEach((key, workday) => {
      if (!workday) {
        return
      }
      console.log("antes do pagamento: ")
      console.log(workday)
    })

    const paymentManager: PaymentManager = new PaymentManager(workdayCollections)
    const wage: Cent = new Cent(Cent.convertValueToCent("10,00"))
    paymentManager.setPayment(wage)
    console.log("payment Before -> ", paymentManager)
  } catch(e) {

  }
    
</script>

<h1>Dashboard</h1>