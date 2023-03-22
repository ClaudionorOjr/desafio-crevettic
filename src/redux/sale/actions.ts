import { Sale } from "./reducer";

export enum SaleActionTypes {
  ADD_NEW_SALE = 'ADD_NEW_SALE'
}

export function addNewSaleAction(sale: Sale){
  return {
    type: SaleActionTypes.ADD_NEW_SALE,
    payload: {
      sale
    }
  }
}