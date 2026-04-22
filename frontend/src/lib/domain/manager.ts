import type { WorkDay, StatusWorkDay } from "./workDay";
import type { Account } from "./accoun"
import { v4 as uuid} from "uuid"
import { browser } from "$app/environment";

export class Manager {

  private wordDay: WorkDay | null = null

  private  static instanciate: Manager | null = null

  private constructor() {
    if (!browser) {
      return
    }

    const dateCurrent: string = new Date().toLocaleDateString('pt-BR')

    let workday:  string | null = localStorage.getItem('workdays')
    
    if (!workday) {
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
    
    const workdays: Map<string, WorkDay> = new Map(JSON.parse(workday))

    if (workdays.has(dateCurrent)) {

      let workday = workdays.get(dateCurrent)

      if (workday) {
        this.wordDay = workday
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


  public getWorkDay(): WorkDay | null {

    if (this.wordDay) {

      return this.wordDay

    } 
    
    return null
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
    currentWorkday.set(date, newWorkday)

    localStorage.setItem('workdays', JSON.stringify(Array.from(currentWorkday.entries())))
  }
  
}