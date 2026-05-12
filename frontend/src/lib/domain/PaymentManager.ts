import { browser } from "$app/environment";
import { Cent } from "./cents";
import type { WorkDay, WorkDayData } from "./workDay";
import { WorkDayCollection } from "./WorkDayCollection";

type PaymentManagerData = {
  amountToPay: number
  amountReceived: number
}

const VALUE_KEY_STORAGE_PAYMENT: string = 'paymentManagerData'

export class PaymentManager {

  private workdayCollection: WorkDayCollection | null = null;
  private workdayNotPait: WorkDayCollection

  private amountToPay: Cent = new Cent()
  private amountReceived: Cent = new Cent()



  public constructor(workdayCollection: WorkDayCollection) {
    this.workdayCollection = workdayCollection;
    this.workdayNotPait = this.workdayCollection.filterNotPaid()
    this.load()

  }

  /**
   * @description this method load data in store 
   * @returns void
   */
  public load(): void {
    if (!browser) {
      return
    }

    const paymentManagerDataString: string | null = localStorage.getItem(VALUE_KEY_STORAGE_PAYMENT)


    if (!paymentManagerDataString) {
      this.save()
    }

    //@ts-ignore
    const paymentManagerData: PaymentManagerData = JSON.parse(paymentManagerDataString)

    this.amountReceived = new Cent(paymentManagerData.amountReceived)
    this.amountToPay = new Cent(paymentManagerData.amountToPay)

  }

  public save(): void {
    if (!browser) {
      return
    }
    const paymentManagerData = this.toJson(this.amountToPay.getCent(), this.amountReceived.getCent())

    localStorage.setItem(VALUE_KEY_STORAGE_PAYMENT, JSON.stringify(paymentManagerData))
  }


  private toJson(amountToPay: number, amountReceived: number): PaymentManagerData | null {
    if (!browser) {
      return null
    }

    return {
      amountToPay: amountToPay,
      amountReceived: amountReceived
    }

  }

  /**
   * 
   * @param moneyReceived 
   * @returns workdayCollection updated values
   */
  public setPayment(moneyToDiscountTheAmount: Cent): WorkDayCollection {

    const mapPaymentVerify: Map<string, WorkDay> = new Map()

    let moneyRemainingCent = moneyToDiscountTheAmount.getCent()

    this.workdayNotPait.forEach((key, workdayNotPaidCurrent) => {

      if (!workdayNotPaidCurrent || !key) {
        return
      }

      if (moneyToDiscountTheAmount.getCent() == 0) {
        return
      }

      const datePaid: string = new Date().toLocaleDateString('pt-BR')

      let amountToPaymentCent: number = workdayNotPaidCurrent.amountToPaid.getCent()

      const moneyToDiscountIsGreaterOrEqualThatAmountToPay = moneyRemainingCent >= amountToPaymentCent

      if (moneyToDiscountIsGreaterOrEqualThatAmountToPay) {
        amountToPaymentCent -= moneyRemainingCent
        moneyRemainingCent = Math.abs(amountToPaymentCent)
        amountToPaymentCent = 0
      } else {
        amountToPaymentCent -= moneyRemainingCent
        moneyRemainingCent = 0
      }

      moneyToDiscountTheAmount.setValue(moneyRemainingCent) 
      workdayNotPaidCurrent.amountToPaid.setValue(amountToPaymentCent)

      workdayNotPaidCurrent = this.updateWorkday(workdayNotPaidCurrent, datePaid)

      mapPaymentVerify.set(key, workdayNotPaidCurrent)

    })
    
    return new WorkDayCollection(mapPaymentVerify)
  }

  private updateWorkday(workdayInCollection: WorkDay, datePait: string): WorkDay {

    if (workdayInCollection.amountToPaid.getCent() <= 0) {
      console.log("Entrou no update: ", workdayInCollection.date)
      console.log("e seu valor a ser pago é: ", workdayInCollection.amountToPaid.getCent())

      workdayInCollection.amountToPaid.setValue(0)
      workdayInCollection.pait = true
      workdayInCollection.paitAt = datePait
      workdayInCollection.status = 'pait'
    }

    return workdayInCollection
  }

  public getWorkdayCollectionUpdated(): WorkDayCollection | null {

    if (this.workdayCollection) {
      return this.workdayCollection
    }

    return null
  }

}