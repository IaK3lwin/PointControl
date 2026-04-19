import { cent, type Cent } from "./cents"
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

  addService : (price : string, name : string, id : string) => void
  removeService : (id : string) => void

  closedService : ()  => void

}


export function accountFactory() : Account {

  
  function addService(price: string, name : string, id : string) {
    
  }
  
  function removeService() {
    
  }
  
  function closedService() {
    
  }
  
  const accout: Account = {
    id : "",
    status : AccountStatus.OPEN,
    total : cent(),
    createdAt : new Date(),
    addService,
    removeService,
    closedService
    
  }

  return accout

}