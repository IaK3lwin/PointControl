import  { Cent, centFactory, type CentData } from "./cents"
import { v4 as uuid} from "uuid"
import { TypeService } from "./typeServices"
import ServiceInflatable from "$lib/components/ServiceInflatable.svelte"
import type { Type } from "@lucide/svelte"

export type ServiceBase = {
  id : string
  name : string
  priceCent: CentData

}

export type ServiceFoodData =  ServiceBase & {
  type: TypeService
}

export type ServiceEnflatableData = ServiceBase & {
  type: TypeService
  timeDuration: TimesOptions
  isFinish: boolean
}


export class Service {
  protected id: string
  protected name : string
  private priceCent: Cent

  constructor(name: string) {
    this.name = name
    this.id = uuid()
    this.priceCent = centFactory()
  }

  public setPrice(cent: string) {
    this.priceCent.toCent(cent)
  }

  public getPrice() : Cent {
    return this.priceCent
  }

  public getName() : string {
    return this.name
  }

  public getId() {
    return this.id
  }

  public toJson(): any{
  }

  

  public static toDomain(data: ServiceEnflatableData | ServiceFoodData): any {
  }
}

//@ts-ignore
export class ServiceFood extends Service{
  public type: TypeService

  constructor(name: string) {
    super(name)
    this.type = TypeService.FOOD
  }


  public toJson(): ServiceFoodData {
    return {
      id : this.id,
      name : this.name,
      priceCent : this.getPrice().toJson(),
      type : this.type
    }
  }

  public static toDomain(data: ServiceFoodData): ServiceFood {
    const service: ServiceFood = new ServiceFood(data.name)
    service.id = data.id
    service.setPrice(data.priceCent.value.toString())
    service.type = data.type

    return service

  }

}

export type TimesOptions = 5 | 10 | null


export class ServiceEnflatable extends Service{
  public type: TypeService
  public timeDuration: TimesOptions
  public isFinish: boolean

  constructor(name: string) {
    super(name)
    this.type = TypeService.ENFLATABLE
    this.timeDuration = null
    this.isFinish = false
  }

  public setTimeOut(time: TimesOptions) {
    this.timeDuration = time
    if (time == 5) {
      this.setPrice(this.getPrice().toReal())
    } else {
      this.setPrice(this.getPrice().toReal())
    }

  }

  public toJson(): ServiceEnflatableData {
    return {
      id : this.id,
      name : this.name,
      priceCent : this.getPrice().toJson(),
      type : this.type,
      timeDuration : this.timeDuration,
      isFinish : this.isFinish
    }
    
  }

  public static toDomain(data: ServiceEnflatableData) : ServiceEnflatable {
    const service: ServiceEnflatable = new ServiceEnflatable(data.name)
    service.id = data.id
    service.setPrice(data.priceCent.value.toString())
    service.type = data.type
    service.timeDuration = data.timeDuration
    service.isFinish = data.isFinish
    console.log(`Service.toDomain() is finish! service with name ${service.getName()} : `, service)
    return service
  }
}


export function serviceFoodFactory(name: string, price?: Cent): ServiceFood {
  const service = new ServiceFood(name)

  if (price) {
    service.setPrice(price.toReal()) 
  }

  return  service
}


export function serviceEnflatableFactory(name: string, price: Cent) : ServiceEnflatable {

  const service: ServiceEnflatable = new ServiceEnflatable(name)

  if (price.toCent() == 5000) {
    service.setTimeOut(5)
  } else {
    service.setTimeOut(10)
  }
  
  return service
}