import { Customer } from "./reducer";

export enum CustomerActionTypes {
  ADD_NEW_CUSTOMER = 'ADD_NEW_CUSTOMER'
}

export function addNewCustomerAction(customer: Customer) {
  return {
    type: CustomerActionTypes.ADD_NEW_CUSTOMER,
    payload: {
      customer
    } 
  }
}