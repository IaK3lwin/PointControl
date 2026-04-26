import { Cent, centFactory } from "$lib/domain/cents";
import { PrinterCheck } from "@lucide/svelte";
import { describe, expect, test } from "vitest";

describe('testing Cent class', () => {

  const cent = new Cent()
  test('convert to Cent', () => {
    const valueConvert = cent.toCent("5,00")
    console.log("valor em centavos convertidos", valueConvert)
    expect(valueConvert).toBe(Cent.convertValueToCent("5,00"))
  })

  test('testing plus operation', () => {
    cent.sumValue(Cent.convertValueToCent("5,00"))
    console.log("valor após a soma", cent.getCent())
    expect(cent.getCent() == Cent.convertValueToCent("100,00"))
  })

  test('testing converToCent method', () => {
    const cent = new Cent()
    cent.setValue(500)
    console.log("valor em centavos: ", cent.getCent())
    let  valueInCent = Cent.convertValueToCent("R$ 4,50")
    console.log("resultado da conversão de R$ 4,50 : ", valueInCent)
    expect(valueInCent == 450)
    valueInCent = Cent.convertValueToCent("R$ 0,50")
    console.log("valor de 0,05 em centavos ficou: ", valueInCent)
    expect(valueInCent == 50)
    
  })

  test('testing subtract operation', () => {
    cent.toCent("5,00")
    console.log("valor atual em centavos: " , cent.getCent())
   
    const valueSubtract = Cent.convertValueToCent("R$ 0,50")
    console.log("valo covnertido que sera usado na subtração: ", valueSubtract)
    cent.subtractValue(valueSubtract)
    console.log("valor em centavos apos subtração: ",cent.getCent())
    expect(cent.getCent()).toBe(450)
  })

  test('testion funcinn centFacotory...', () => {
    const centWithFactory: Cent = centFactory("6,00")
    console.log(centWithFactory)

    expect(centWithFactory.getCent() == Cent.convertValueToCent("6,00"))
  })
})