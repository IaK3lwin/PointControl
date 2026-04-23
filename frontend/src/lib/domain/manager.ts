import { WorkDay, workDayFactory, type WorkDayData } from "./workDay";
import { browser } from "$app/environment";

export class Manager {

  private workdayCurrent: WorkDay | null = null

  private static instanciate: Manager | null = null

  private constructor() {
    if (!browser) {
      return
    }

    const dateCurrent: string = new Date().toLocaleDateString('pt-BR')

    const workdaysMapData: Map<string, WorkDayData> = this.getWorkdayInLocalStorage()

    if (workdaysMapData.size == 0) {
      console.log("workdays is null")
      this.workdayCurrent = workDayFactory()
    }

    console.log("workdayInLocalStorage exist")
    console.log("workdays load in localstorage  to data: ", workdaysMapData)

    if (workdaysMapData.has(dateCurrent)) {
      console.log("workday find with key: ", dateCurrent)
      let workdayCurrentData = workdaysMapData.get(dateCurrent)

      if (workdayCurrentData) {
        console.log(workdayCurrentData, "transforming in intance class WorkDay")
        this.transformWorkdayDataInDomain(workdayCurrentData)
      }
    }
    else {
      this.workdayCurrent = workDayFactory()
    }
  }

  private getWorkdayInLocalStorage(): Map<string, WorkDayData> {
    if (!browser) {
      return new Map()
    }

    const workdayInLocalStorage: string | null = localStorage.getItem('workdays')
    if (!workdayInLocalStorage) {
      return new Map()
    }

    return  new Map(JSON.parse(workdayInLocalStorage)) 

  }

  private transformWorkdayDataInDomain(workdayCurrentData: WorkDayData): void {

    const workdayIntance: WorkDay = WorkDay.toDomain(workdayCurrentData)
    console.log("accounts in worlday cosntructor")
    console.log(workdayCurrentData?.accountsInDay)
    this.workdayCurrent = workdayIntance

  }


  public static get(): Manager {
    if (this.instanciate != null) {
      return this.instanciate
    }

    this.instanciate = new Manager()

    return this.instanciate
  }


  public getWorkDay(): WorkDay {

    if (this.workdayCurrent) {
      return this.workdayCurrent
    }

    throw new Error('Workday dont faund')

  }


  public saveWorkdays(newWorkday: WorkDay): void {
    if (!browser) {
      return
    }

    const workDayInLocalStorage: Map<string, WorkDayData> = this.getWorkdayInLocalStorage()
    const date: string = new Date().toLocaleDateString("pt-BR")

    

    if (workDayInLocalStorage.size == 0) {
      console.log("work day não existe")
      const workdayTemp: Map<string, WorkDayData> = new Map()

      workdayTemp.set(date, newWorkday.toJson())
      this.saveWorkdayInLocalStorage(workdayTemp)
      console.log(localStorage.getItem('workdays'))
      return
    }

    console.log("manager / saveWorkDATA: state work in runtime")
    console.log(newWorkday.toJson())
    workDayInLocalStorage.set(date, newWorkday.toJson())

    this.saveWorkdayInLocalStorage(workDayInLocalStorage)
  }

  private saveWorkdayInLocalStorage(workday: Map<string, WorkDayData>): void {
    localStorage.setItem('workdays', JSON.stringify(Array.from(workday.entries())))
 
  }

}