import {type Account} from "./accoun"
export type StatusWorkDay = 'working' | 'planned' | 'finish' | 'undefined'

export type WorkDay = {
  id : string
  data : string
  status : StatusWorkDay

  startedAt : string
  finishAt  : string

  pait: boolean
  paitAt: string

  accountsInDay : Map<number, Account>


}
