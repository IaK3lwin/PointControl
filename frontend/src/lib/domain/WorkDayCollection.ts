import { WorkDay, type WorkDayData } from "./workDay";


export class WorkDayCollection {
  private listWorkdays: Map<string, WorkDay> = new Map()

  constructor(listWorkday: Map<string, WorkDayData | WorkDay>) {
    listWorkday.forEach((workdayCurrent, keyCUrrent) => {

      if (workdayCurrent instanceof WorkDay) {
        this.listWorkdays.set(keyCUrrent, workdayCurrent)
      } else {
        this.listWorkdays.set(keyCUrrent, WorkDay.toDomain(workdayCurrent))
      }

    })
  }

  public get(key: string): WorkDay | null {
    const workday: WorkDay | undefined = this.listWorkdays.get(key)
    if (workday) {
      return workday
    }
    
    return null

  }

  
  public filterNotPaid() : WorkDayCollection {

    const listWorkDayFilter: Map<string, WorkDay> = new Map()
    
    return this.filter((key, value) => {
      if (value?.pait == true) {
        return false
      }
      return true
    }) 

  }

  /**
   * 
   * @param dateParam 
   * @returns WorkdayCollection 
   * @description this method cant logic error
   */
  public filterAfterDate(dateParam: Date): WorkDayCollection {
    //TODO: finish to write implementation this method  
    
    return this.filter((key) => {
      if (key) {
        const workdayDate: Date = new Date(key)
        if (workdayDate.getDate() > dateParam.getDate()) {
          return true
        }
      } 
      return false
    })
  }

  /**
   * 
   * @param dateParam 
   * @returns WorkdayCollection 
   * @description this method cant logic error
   */
  public filterBeforeDate(dateParam: Date): WorkDayCollection {
    return this.filter((key) => {
      if (key) {
        const dateWorkday: Date = new Date(key)
        if (dateWorkday.getDate() < dateParam.getDate()) {
          return true
        }
      }
      return false
    })
  }
   
  
  public filter(callback: (key?: string, value?: WorkDay) => boolean): WorkDayCollection {

    const newWorkdayCollection: Map<string, WorkDay> = new Map()
    
    this.listWorkdays.forEach((workday, key) => {
      if (callback(key, workday)) {
        newWorkdayCollection.set(key, workday)
      }
    })
    
    return new WorkDayCollection(newWorkdayCollection)
  }
}