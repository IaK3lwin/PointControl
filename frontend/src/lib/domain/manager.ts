import type { WorkDay, StatusWorkDay } from "./workDay";
import type { Account } from "./accoun"

export class Manager {

  private wordDay: WorkDay | null = null

  private  static instanciate: Manager | null = null

  private constructor() {
    const dateCurrent: Date = new Date()

    if (!this.wordDay) {
      this.wordDay = {
        id : crypto.randomUUID().toString(),
        data : dateCurrent.toLocaleDateString("pt-BR"),
        status : 'undefined',
        startedAt : "",
        finishAt : "",
        pait : false,
        paitAt : "",
        accountsInDay : new Map<number, Account>()
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


  
}