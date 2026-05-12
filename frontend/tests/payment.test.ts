import { WorkDay, workDayFactory } from "$lib/domain/workDay"
import { WorkDayCollection } from "$lib/domain/WorkDayCollection"
import {test, describe, expect} from "vitest"
import { config } from "dotenv"
import { Cent } from "$lib/domain/cents"
import { PaymentManager } from "$lib/domain/PaymentManager"

config()


describe('Testing payment class...', () => {
  process.env.ENVIRONMENT_TEST = 'true'
  console.log("creating workdays collections ...")

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

  console.log("environment is test? : ", process.env.ENVIRONMENT_TEST)

  const workdayCollections: WorkDayCollection = new WorkDayCollection(workdaysMap)

  console.log("workdayCollection in start")
  workdayCollections.forEach((key, workday) => {
    console.table(workday)
  })

  test("testion setPayment", () => {
    const paymentManager = new PaymentManager(workdayCollections)

    const wage = new Cent(Cent.convertValueToCent("40,00"))
    const workdayCollectionUpdatedPayment = paymentManager.setPayment(wage)
    workdayCollections.updateValuesWorkdayCollection(workdayCollectionUpdatedPayment)

    console.log("========| workdayCollection finish payment ======|")
    workdayCollections.forEach((key, workday) => {
      console.table(workday)
    })

  })
  
})