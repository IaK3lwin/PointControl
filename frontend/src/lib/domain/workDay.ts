import {Account, type AccountData} from "./accoun"
import {v4 as uuid} from "uuid"
import { Cent, type CentData } from "./cents"

export type StatusWorkDay = 'working' | 'planned'  | 'pait' |  'undefined'

type DaylyRateValues = {
  50 : number
}

export const daylyRatesValues: DaylyRateValues = {
  50 : Cent.convertValueToCent("50,00")
}

export type WorkDayData = {
 id: string
  date : string   
   status: StatusWorkDay
   startedAt: string 
   pait: boolean
   paitAt: string 
   accountsInDay: AccountData[]
   amountToPaid: CentData
   dailyPayment: CentData
}

export class WorkDay {

  public id: string = ""
  public date : string = ""
  public status: StatusWorkDay = 'undefined'
  public startedAt: string = ""
  public pait: boolean = false
  public paitAt: string = ""
  public accountsInDay: Account[] = []

  public dailyPayment: Cent  = new Cent(daylyRatesValues[50])
  public amountToPaid: Cent = new Cent(daylyRatesValues[50])

  public setAmountToPaid(value: number) {
    this.amountToPaid.setValue(value)
  }

  public toJson() : WorkDayData {
    return {
      id : this.id,
      date : this.date,
      status : this.status,
      startedAt: this.startedAt,
      pait : this.pait,
      paitAt : this.paitAt,
      accountsInDay : this.accountsInDay.map((accout) => {
        return accout.toJson()
      }),
      amountToPaid : this.amountToPaid.toJson(),
      dailyPayment : this.dailyPayment.toJson()

    }
  }

  public static toDomain(data: WorkDayData): WorkDay {

    const accountIndayDomain: Account[] = data.accountsInDay.map((accountData) => {
      //console.log("workday to domain conver account to domain: ", accountData)
      return Account.toDomain(accountData)
    })

    //console.log("accountInDayDomain in Workday is: ", accountIndayDomain)


    const workday: WorkDay = new WorkDay()
    workday.id = data.id
    workday.date = data.date
    workday.status = data.status
    workday.startedAt = data.startedAt
    workday.pait = data.pait
    workday.paitAt = data.paitAt
    workday.accountsInDay = accountIndayDomain 
    workday.dailyPayment = Cent.toDomain(data.dailyPayment)
    workday.amountToPaid = Cent.toDomain(data.amountToPaid)

    return workday
  }

}


export function workDayFactory(): WorkDay{

  const workday: WorkDay = new WorkDay()
  workday.id = uuid()
  workday.date = new Date().toLocaleDateString('pt-BR')
  workday.status = 'undefined'
  workday.pait = false

  //console.log("created a new workday: " + workday.date + " is value is: ", workday)

  return workday

}