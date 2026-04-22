import type { Cent } from "./cents"
import { v4 as uuid} from "uuid"
import { TypeService } from "./typeServices"

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


export function serviceFoodFactory(name: string, price: Cent): ServiceFood {
  return {
    type: TypeService.FOOD,
    id : uuid(),
    name : name,
    priceCent : price,
  }
}

export function serviceInflatableFactory(name: string, price: Cent, timeDuration: number) : ServiceEnflatable {
  return {
    id : uuid(),
    name : name,
    priceCent : price,
    timeDuration : timeDuration,
    isFinish : false,
    type : TypeService.INFLATABLE
  }
}