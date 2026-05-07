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

  public filterAfterDate(date: Date): WorkDayCollection {
    //TODO: finish to write implementation this method  
    return this.filter((key, value) => {
      return true
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