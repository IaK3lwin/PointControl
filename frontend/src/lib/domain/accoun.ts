import ServiceInflatable from "$lib/components/ServiceEnflatableComponent.svelte"
import { GalleryThumbnailsIcon, Type } from "@lucide/svelte"
import {  Cent, centFactory, type CentData, type CentI } from "./cents"
import { Service, ServiceEnflatable, ServiceFood, type ServiceBase, type ServiceEnflatableData, type ServiceFoodData } from "./services"
import { TypeService } from "./typeServices"
import {v4 as uuid} from "uuid"

export enum AccountStatus  {
  OPEN = "OPEN",
  CLOSED = "CLOSED"
}

export type TypePayment = 'monay' | 'credit' | 'pix' | null

export type AccountData = {
  id: string
  status : AccountStatus
  nameTag : string
  createAt: string
  typePayment: TypePayment
  price: CentData
  service: (ServiceEnflatableData | ServiceFoodData)[]
}

export class Account {
  private id: string = ""
  public status: AccountStatus
  private nameTag: string
  private createAt: string 
  private typePayment: TypePayment
  price: Cent
  service: (ServiceEnflatable | ServiceFood)[]
  
  constructor(name: string) {
    this.id = uuid()
    this.status = AccountStatus.OPEN
    this.nameTag = name
    this.createAt = new Date().toLocaleDateString('pt-BR')
    this.typePayment = null
    this.price = centFactory()
    this.service = []
  }

  public addService(service: ServiceEnflatable | ServiceFood): void {
    this.service.push(service)
  }

  public removeService(): void {
    //TODO: do implementations
  }

  public closedService(): void {
    //TODO: do implementations
  }

  public getName(): string {
    return this.nameTag
  }

  public getId() : string {
    return this.id
  }

  public getTypePayment(): TypePayment {
    return this.typePayment
  }

  public setTypePayment(type: TypePayment): void {
    this.typePayment = type
  }

  public toJson(): AccountData {
    return {
      id : this.id,
      status: this.status,
      nameTag : this.nameTag,
      createAt : this.createAt,
      typePayment : this.typePayment,
      price : this.price.toJson(),
      service : this.service.map((service) => {
        return service.toJson() 
      })
    }
  } 

  public static toDomain(data: AccountData) : Account {
    const account: Account = new Account(data.nameTag)
    const serviceDomain: (ServiceEnflatable | ServiceFood)[] = []
    account.id = data.id
    account.status = data.status
    account.createAt = data.createAt
    account.typePayment = data.typePayment
    account.price = Cent.toDomain(data.price)
    console.log(`data.service: `, data.service)

    data.service.forEach((service) => {
      if (service.type == TypeService.ENFLATABLE) {
        console.log("account log convertion service to domain: ", service)
        serviceDomain.push(ServiceEnflatable.toDomain(service as ServiceEnflatableData))
      } else {
        console.log("account log convertion service to domain: ", service)
        serviceDomain.push(ServiceFood.toDomain(service as ServiceFoodData))
      }
    }) 

    account.service = serviceDomain

    console.log("Account toDomain  Finish, yours services data convert to domain: ", account.service)

    return account
  }

  public updatePrice(): string {
    let total:Cent =  new Cent()
    for (let service of this.service) {
      total.sumValue(service.getPrice().getCent())
    }
    this.price.setValue(total.getCent())

    return  this.price.toReal()
  }


}

export function accountFactory(name : string) : Account {
  return new Account(name)

}