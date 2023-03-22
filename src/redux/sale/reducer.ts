import { SaleActionTypes } from "./actions"

export interface Sale {
  id: string,
  description: string,
  status: string,
  customer: string,
  saleDate: Date,
  amount: number,
  price: number
}

export interface SaleState {
  sales: Sale[]
}

interface SaleAction {
  type: string,
  payload: {
    sale: Sale
  }
}

const initialState: SaleState = {
  sales: []
}

export function saleReducer(state = initialState, action: SaleAction) {
  switch(action.type) {
    case SaleActionTypes.ADD_NEW_SALE:
      return {
        ...state,
        sales: [...state.sales, action.payload.sale]
      }
    default:
      return state
  }
}