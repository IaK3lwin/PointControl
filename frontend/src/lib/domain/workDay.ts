import {Account, type AccountData} from "./accoun"
import {v4 as uuid} from "uuid"

export type StatusWorkDay = 'working' | 'planned' | 'finish' | 'undefined'

export type WorkDayData = {
 id: string
  date : string   
   status: StatusWorkDay
   startedAt: string 
   pait: boolean
   paitAt: string 
   accountsInDay: AccountData[]
}

export class WorkDay {
  public id: string = ""
  public date : string = ""
  public status: StatusWorkDay = 'undefined'
  public startedAt: string = ""
  public pait: boolean = false
  public paitAt: string = ""
  public accountsInDay: Account[] = []

  

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
      })
    }
  }

  public static toDomain(data: WorkDayData): WorkDay {
    const accountIndayDomain: Account[] = data.accountsInDay.map((accountData) => {
      return Account.toDomain(accountData)
    })

    console.log("accountInDayDomain in Workday is: ", accountIndayDomain)


    const workday: WorkDay = new WorkDay()
    workday.id = data.id
    workday.date = data.date
    workday.status = data.status
    workday.startedAt = data.startedAt
    workday.pait = data.pait
    workday.paitAt = data.paitAt
    workday.accountsInDay = accountIndayDomain 
    return workday
  }

}


export function workDayFactory(): WorkDay{

  const workday: WorkDay = new WorkDay()
  workday.id = uuid()
  workday.date = new Date().toLocaleDateString('pt-BR')
  workday.status = 'undefined'
  workday.pait = false

  console.log("created a new workday: " + workday.date + " is value is: ", workday)

  return workday

}