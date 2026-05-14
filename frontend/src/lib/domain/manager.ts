import { WorkDay, workDayFactory, type WorkDayData } from "./workDay";
import { browser } from "$app/environment";
import { WorkDayCollection } from "./WorkDayCollection";
import type { Cent } from "./cents";

export class Manager {

  private workdayCurrent: WorkDay | null = null

  private static instanciate: Manager | null = null

  private workdayCollection: WorkDayCollection | null = null

  private constructor() {
    if (!browser) {
      return
    }


    const dateCurrent: string = new Date().toLocaleDateString('pt-BR')

    const workdaysMapData: Map<string, WorkDayData> = this.getWorkdayInLocalStorage()

    

    if (workdaysMapData.size == 0) {
      this.workdayCurrent = workDayFactory()
    }


    if (workdaysMapData.has(dateCurrent)) {
      let workdayCurrentData = workdaysMapData.get(dateCurrent)

      if (workdayCurrentData) {
        this.transformWorkdayDataInDomain(workdayCurrentData)
      }
    }
    else {
      this.workdayCurrent = workDayFactory()
    }

    this.workdayCollection = new WorkDayCollection(workdaysMapData) 
    
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
    this.workdayCurrent = workdayIntance
  }


  public static get(): Manager {
    if (this.instanciate != null) {
      return this.instanciate
    }

    this.instanciate = new Manager()

    return this.instanciate
  }


  public getWorkDay(): WorkDay | null{

    if (this.workdayCurrent) {
      return this.workdayCurrent
    }

    return null

  }

  public getWorkDayCollection(): WorkDayCollection | null {
    if (!browser) {
      return null
    }
    if (this.workdayCollection) {
      return this.workdayCollection
    }

    return null

  }


  public saveWorkdays(newWorkday: WorkDay): void {
    if (!browser) {
      return
    }

    const workDayInLocalStorage: Map<string, WorkDayData> = this.getWorkdayInLocalStorage()
    const date: string = new Date().toLocaleDateString("pt-BR")

    

    if (workDayInLocalStorage.size == 0) {
      const workdayTemp: Map<string, WorkDayData> = new Map()

      workdayTemp.set(date, newWorkday.toJson())
      this.saveWorkdayInLocalStorage(workdayTemp)
      return
    }

    workDayInLocalStorage.set(date, newWorkday.toJson())

    this.saveWorkdayInLocalStorage(workDayInLocalStorage)
  }

  private saveWorkdayInLocalStorage(workday: Map<string, WorkDayData>): void {
    localStorage.setItem('workdays', JSON.stringify(Array.from(workday.entries())))
 
  }

}