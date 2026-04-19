import ServiceInflatable from "$lib/components/ServiceInflatable.svelte"
import {  centFactory, type Cent } from "./cents"
import type { ServiceBase, ServiceEnflatable, ServiceFood } from "./services"
import { TypeService } from "./typeServices"

export enum AccountStatus  {
  OPEN,
  CLOSED
}

export type Account = {
  id: string
  status : AccountStatus

  createdAt : Date

  total : Cent

  services: Map< TypeService, ServiceEnflatable | ServiceFood>

  addService : (service : ServiceEnflatable | ServiceFood) => void
  removeService : (id : string) => void

  closedService : ()  => void

}


export function accountFactory() : Account {

  
  function addService(service : ServiceEnflatable | ServiceFood) {
    
    if (service.type) {
      accout.services.set(service.type, service)
      return
    }

    accout.services.set(service.type,service)
    
  }
  
  function removeService() {
  }
  
  function closedService() {
    
  }
  
  const accout: Account = {
    id : "",
    status : AccountStatus.OPEN,
    total : centFactory(),
    createdAt : new Date(),
    services : new Map(),
    addService,
    removeService,
    closedService
    
  }

  return accout

}