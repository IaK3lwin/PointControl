import { accountFactory, type Account} from "$lib/domain/accoun"
import { centFactory } from "$lib/domain/cents"
import { serviceFoodFactory, type ServiceFood } from "$lib/domain/services"
import { type Cent } from "$lib/domain/cents"
import { TypeService } from "$lib/domain/typeServices"
import { test, expect, describe } from "vitest"
import { serviceList } from "$lib/constants/srevices"

describe('testing account', () => {

  const accountCompare: Account = accountFactory('test')

  test('testing create account', () => {
    expect(accountCompare.getName()).toBe('test')
  })

  test('testing calculating price...', () => {
    const service: ServiceFood = serviceFoodFactory('crepe', centFactory("6,00")) 

    accountCompare.addService(service)
    const total: Cent = accountCompare.price

    expect(600).toBe(total.toCent("6,00"))

  })

  test('testing add service', () => {
    let services = serviceList.get(TypeService.ENFLATABLE)
    if (!services) {
      throw new Error('error') 
    }

    console.log("service: ", services)

    accountCompare.addService(services[0])

    expect(accountCompare.price.toCent() > 0).toBe(accountCompare.price.toCent() > 0)
  })

})