import { accountFactory, type Account} from "$lib/domain/accoun"
import { centFactory } from "$lib/domain/cents"
import { serviceFoodFactory, type ServiceFood } from "$lib/domain/services"
import { type Cent } from "$lib/domain/cents"
import type { TypeService } from "$lib/domain/typeServices"
import { test, expect, describe } from "vitest"

describe('testing account', () => {

  const accountCompare: Account = accountFactory('test')

  test('testing create account', () => {
    expect(accountCompare).toMatchObject(
      {
        id : expect.any(String),
        nameTag : "test",
        createdAt: new Date().toLocaleDateString('pt-BR')
      }
    )
  })

  test('testing calculating price...', () => {
    const service: ServiceFood = serviceFoodFactory('crepe', centFactory("6,00")) 

    accountCompare.addService(service)
    const total: Cent = accountCompare.total

    expect(600).toBe(total.toCent("6,00"))

  })

})