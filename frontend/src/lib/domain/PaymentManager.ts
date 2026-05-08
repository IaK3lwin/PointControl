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

    return  {
      amountToPay : amountToPay,
      amountReceived : amountReceived
    }

  }

  public setPayment(value: Cent): void {
    //TODO: finish implementation to payment
    if (!this.workdayCollection) {
      return
    }

    const workdaysPaymentDone: Map<string, WorkDay> = new Map()

    this.workdayCollection.forEach((key, workdayInCollection) => {
            
    }) 

  }

  public getWorkdayUpdated(): WorkDayCollection | null{

    if (this.workdayCollection) {
      return this.workdayCollection
    }

    return null
  }
  

}