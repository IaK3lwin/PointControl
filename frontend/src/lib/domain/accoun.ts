import ServiceInflatable from "$lib/components/ServiceInflatable.svelte"
import {  centFactory, type Cent } from "./cents"
import type { ServiceBase, ServiceEnflatable, ServiceFood } from "./services"
import { TypeService } from "./typeServices"
import {v4 as uuid} from "uuid"

export enum AccountStatus  {
  OPEN = "OPEN",
  CLOSED = "CLOSED"
}

export type TypePayment = 'monay' | 'credit' | 'pix' | null

export type Account = {

  id: string
  status : AccountStatus
  nameTag: string
  createdAt : string
  typePayment: TypePayment
  total : Cent
  services: (ServiceEnflatable | ServiceFood)[] 

  addService : (service : ServiceEnflatable | ServiceFood) => void
  removeService : (id : string) => void
  closedService : ()  => void

}


export function accountFactory(name : string) : Account {

  
  function addService(service : ServiceEnflatable | ServiceFood) {
    
    account.services.push(service)    
  }
  
  function removeService() {
    //TODO: do implementation
  }
  
  function closedService() {
    //TODO: do a implementation
  }
  
  const account: Account = {
    id : uuid(),
    nameTag : name,
    status : AccountStatus.OPEN,
    total : centFactory(),
    typePayment : null,
    createdAt : new Date().toLocaleDateString('pt-BR'),
    services : [],
    addService,
    removeService,
    closedService
    
  }

  return account

}