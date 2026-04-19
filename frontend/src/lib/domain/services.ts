import type { Cent } from "./cents"
import type { TypeService } from "./typeServices"

export type ServiceBase = {
  id : string
  name : string
  priceCent: Cent

}


export type ServiceFood = ServiceBase & {
  type : TypeService.FOOD
}

export type ServiceEnflatable = ServiceBase & {
  type : TypeService.INFLATABLE
  timeDuration : number
  isFinish : boolean
}