import ServiceInflatable from "$lib/components/ServiceInflatable.svelte"
import {  centFactory, type Cent } from "./cents"
import type { ServiceBase, ServiceEnflatable, ServiceFood } from "./services"
import { TypeService } from "./typeServices"
import {v4 as uuid} from "uuid"

export enum AccountStatus  {
  OPEN,
  CLOSED
}

export type Account = {
  id: string
  status : AccountStatus
  nameTag: string

  createdAt : Date

  total : Cent

  services: Map< TypeService, ServiceEnflatable | ServiceFood>

  addService : (service : ServiceEnflatable | ServiceFood) => void
  removeService : (id : string) => void

  closedService : ()  => void

}


export function accountFactory(name : string) : Account {

  
  function addService(service : ServiceEnflatable | ServiceFood) {
    
    if (service.type) {
      account.services.set(service.type, service)
      return
    }

    account.services.set(service.type,service)
    
  }
  
  function removeService() {
  }
  
  function closedService() {
    
  }
  
  const account: Account = {
    id : uuid(),
    nameTag : name,
    status : AccountStatus.OPEN,
    total : centFactory(),
    createdAt : new Date(),
    services : new Map(),
    addService,
    removeService,
    closedService
    
  }

  return account

}