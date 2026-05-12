import { browser } from "$app/environment";
import { WorkDay, type WorkDayData } from "./workDay";



export class WorkDayCollection implements Iterable<WorkDay>{

  private listWorkdays: Map<string, WorkDay> = new Map()

  constructor(listWorkday: Map<string, WorkDayData | WorkDay>) {

    if (!browser && process.env.ENVIRONMENT_TEST != 'true') {
      return
    }
    listWorkday.forEach((workdayCurrent, keyCUrrent) => {

      if (workdayCurrent instanceof WorkDay) {
        this.listWorkdays.set(keyCUrrent, workdayCurrent)
      } else {
        this.listWorkdays.set(keyCUrrent, WorkDay.toDomain(workdayCurrent))
      }

    })

  }

  *[Symbol.iterator]() : IterableIterator<WorkDay> {
    yield* this.listWorkdays.values()
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

  public forEach(callback: (key ?: string, workday ?: WorkDay) => void): void {
    this.listWorkdays.forEach((workdayCurrent, key) => {
      callback(key, workdayCurrent)
    })
  }

  public pullFirst(): WorkDay | null{
    //console.log("listWorkday in class: ", this.listWorkdays) 
    let workday  = this.listWorkdays.entries().next().value
    if (!workday) {
      return null
    }

    this.listWorkdays.delete(workday[0])

    return workday[1]
  }

  public getFirst(): WorkDay | undefined {
    return this.listWorkdays.entries().next().value?.[1]
  }

  public updateValuesWorkdayCollection(currentWorkdayCollection: WorkDayCollection): void {
    this.listWorkdays.forEach((workday, key) => {
      const workdayCurrent = currentWorkdayCollection.get(key)
      if (!workdayCurrent) {
        return
      }

      if (workday.id == workdayCurrent.id) {
        this.listWorkdays.set(key, workdayCurrent)
      }

    })
  }

  public size(): number {
    return this.listWorkdays.size
  }


  public toData(): Map<string, WorkDayData> {
    const listworkdayData: Map<string, WorkDayData> = new Map()
    this.listWorkdays.forEach((workDay, key) => {
      listworkdayData.set(key, workDay.toJson())
    })

    return listworkdayData
  }


}