import { WorkDay, workDayFactory, type WorkDayData } from "./workDay";
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
      this.wordDay = workDayFactory()
      return
    }
    
    const workdays: Map<string, WorkDayData> = new Map(JSON.parse(workdaysInLocalStorage))

    if (workdays.has(dateCurrent)) {

      let workday = workdays.get(dateCurrent)

      if (!workday ) {
        return
      }

      const workdayIntance: WorkDay = WorkDay.toDomain(workday)
      console.log("accounts in worlday cosntructor")
      console.log(workday?.accountsInDay)
      this.wordDay = workdayIntance
      return  

      if (workday) {
        //@ts-ignore
        this.wordDay = WorkDay.toDomain(workday)
      }
    }
    else {
      this.wordDay = workDayFactory()
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

    const workDayInLocalStorage: string | null = localStorage.getItem('workdays')
    const date : string = new Date().toLocaleDateString("pt-BR")

    if (!workDayInLocalStorage) {
      console.log("work day não existe")
      const workdayTemp: Map<string, WorkDayData> = new Map()

      workdayTemp.set(date, newWorkday.toJson())

      localStorage.setItem('workdays', JSON.stringify(Array.from(workdayTemp.entries())))

      console.log(localStorage.getItem('workdays'))

      return
    }

    let currentWorkday: Map<string, WorkDayData> = new Map(JSON.parse(workDayInLocalStorage))
    console.log("manager / saveWork: state work in runtime")
    console.log(newWorkday)
    currentWorkday.set(date, newWorkday.toJson())

    localStorage.setItem('workdays', JSON.stringify(Array.from(currentWorkday.entries())))
  }
  
}