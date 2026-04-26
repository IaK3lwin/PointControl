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
    if (value !== undefined) {
      this.value = value
      return
    }
    this.value = 0
  }

  public getCent(): number {
    return this.value
  }

  public setValue(value: string | number): void {
    if (typeof value == 'string') {
      this.value = Cent.convertValueToCent(value)
    } else {
      this.value = value
    }


  }

  public static convertValueToCent(value: string) : number{
    if (typeof value == 'number') {
        return Math.round(value * 100)
    }

    const cleaned = value
		.trim()
		.replace(/\s/g, '')
		.replace('R$', '')
    .replace(' R$ ', '')
		.replace(/\./g, '') // remove separador milhar
		.replace(',', '.')

    const inputNumber: number = Number(cleaned)

    if (Number.isNaN(inputNumber)) {
      throw new Error("Valor inválido")
    }

    return Math.round(inputNumber * 100)
  } 

  public toReal(cents?: number): string {
	return new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL"
	}).format((cents ?? this.value) / 100)
}

  public toCent(input?: string): number {
    if (!input) {
      return this.value
    }

    const cleaned = input
		.trim()
		.replace(/\s/g, '')
		.replace('R$', '')
    .replace(' R$ ', '')
		.replace(/\./g, '') // remove separador milhar
		.replace(',', '.')

    const inputNumber: number = Number(cleaned)

    if (Number.isNaN(inputNumber)) {
      throw new Error("Valor inválido")
    }

    this.value = Math.round(inputNumber * 100)

    return this.value

  }

  public sumValue(value: number): void {
    this.value += value
  }

  public subtractValue(value: number): void {
    let result = this.value - value
    console.log("valor de entrada: ", value, " valor atual em centavos : ", this.value)
    this.value = result
  } 

  public subtractReal(value: string): void {
	  this.value -= Cent.convertValueToCent(value)
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
  if (valueInReal) {
    const newCent = new Cent(Cent.convertValueToCent(valueInReal))
    return newCent
  }

  console.log("valor da moeda n inserido")
  return new Cent()

}