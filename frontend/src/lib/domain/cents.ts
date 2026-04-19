export type Cent = {

  value : number

  toReal : (cents: number) => string
  toCent: (input: string) => number

}

export function centFactory() : Cent{

  let value : number = 0

  function toCent(input: string): number {
    const cleaned = input
		.trim()
		.replace(/\s/g, '')
		.replace('R$', '')
		.replace(/\./g, '') // remove separador milhar
		.replace(',', '.')

    const inputNumber: number = Number(cleaned)

    if (Number.isNaN(value)) {
      throw new Error("Valor inválido")
    }

    value = Math.round(inputNumber * 100)

    return value

  }

  function toReal(cents: number) : string {
    return new Intl.NumberFormat("pt-BR", {
      style : 'currency',
      currency : 'BRL'
    }).format(cents / 100)
  } 


  return {
    value : value,
    toCent,
    toReal
  }
}