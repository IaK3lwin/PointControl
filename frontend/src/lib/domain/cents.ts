import { browser } from "$app/environment"


export interface CentI {

  toReal : (cents: number) => string
  toCent: (input: string) => number

}

export type CentData = {
 value : number
}

export class Cent  implements CentI{
  private value: number

  constructor(value ?: number) {
    if (value) {
      this.value = value
      return
    }
    this.value = 0
  }

  

  public toReal(cents?: number): string {
    
    return new Intl.NumberFormat("pt-BR", {
      style : 'currency',
      currency : 'BRL'
    }).format(cents ?? this.value / 100)

  }

  public toCent(input?: string): number {
    if (!input) {
      return this.value
    }

    const cleaned = input
		.trim()
		.replace(/\s/g, '')
		.replace('R$', '')
		.replace(/\./g, '') // remove separador milhar
		.replace(',', '.')

    const inputNumber: number = Number(cleaned)

    if (Number.isNaN(this.value)) {
      throw new Error("Valor inválido")
    }

    this.value = Math.round(inputNumber * 100)

    return this.value

  }


  public toJson() : CentData {
    return {
      value : this.value
    }
  }

  public static toDomain(data: CentData) : Cent {
    return new Cent(data.value)
  }

}

export function centFactory(valueInReal ?: string) : Cent{
  if (!browser) {
    return new Cent()
  }
    const cleaned = valueInReal ?? ""
		.trim()
		.replace(/\s/g, '')
		.replace('R$', '')
		.replace(/\./g, '') // remove separador milhar
		.replace(',', '.')
    .replace(",", ".")


    const inputNumber: number = Number(cleaned.replace(",", "."))

    console.log("inputNumber: ",inputNumber)

    if (Number.isNaN(inputNumber)) {
      throw new Error("Valor inválido")
    }

  return new Cent(inputNumber)


}