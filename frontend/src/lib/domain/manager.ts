import type { WorkDay } from "./workDay";
import { v4 as uuid} from "uuid"
import { browser } from "$app/environment";
import { accountFactory, type Account } from "./accoun";
import { centFactory } from "./cents";

export class Manager {

  private wordDay: WorkDay | null = null

  private  static instanciate: Manager | null = null

  private constructor() {
    if (!browser) {
      return
    }

    const dateCurrent: string = new Date().toLocaleDateString('pt-BR')

    let workdaysInLocalStorage:  string | null = localStorage.getItem('workdays')
    
    if (!workdaysInLocalStorage) {
      this.wordDay = {
        id : uuid(),
        data : dateCurrent,
        status : 'undefined',
        startedAt : "",
        finishAt : "",
        pait : false,
        paitAt : "",
        accountsInDay : []
      }
      return
    }
    
    const workdays: Map<string, WorkDay> = new Map(JSON.parse(workdaysInLocalStorage))

    if (workdays.has(dateCurrent)) {

      let workday = workdays.get(dateCurrent)
      console.log("accounts in worlday cosntructor")
      console.log(workday?.accountsInDay)

      workday?.accountsInDay.map((account: Account) => {
        account.total = centFactory(account.total.value.toString())
        return account
      })

      

      if (workday) {
        this.wordDay = workday
      }
    }
    else {
      this.wordDay = {
        id : uuid(),
        data : dateCurrent,
        status : 'undefined',
        startedAt : "",
        finishAt : "",
        pait : false,
        paitAt : "",
        accountsInDay : []
      }
    }
  }


  public static get(): Manager {
    if (this.instanciate != null) {
      return this.instanciate
    }

    this.instanciate = new Manager()

    return this.instanciate
  }


  public getWorkDay(): WorkDay  {

    if (this.wordDay) {
      return this.wordDay
    } 

    throw new Error('Workday dont faund')
    
  }


  public saveWorkdays(newWorkday: WorkDay): void{
    if (!browser) {
      return
    }

    const workDayMap: string | null = localStorage.getItem('workdays')
    const date : string = new Date().toLocaleDateString("pt-BR")

    if (!workDayMap) {
      console.log("work day não existe")
      const workdayTemp: Map<string, WorkDay> = new Map()

      workdayTemp.set(date, newWorkday)

      localStorage.setItem('workdays', JSON.stringify(Array.from(workdayTemp.entries())))

      console.log(localStorage.getItem('workdays'))

      return
    }

    let currentWorkday: Map<string, WorkDay> = new Map(JSON.parse(workDayMap))
    console.log("manager / saveWork: state work in runtime")
    console.log(newWorkday)
    currentWorkday.set(date, newWorkday)

    localStorage.setItem('workdays', JSON.stringify(Array.from(currentWorkday.entries())))
  }
  
}