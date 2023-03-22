import { SaleActionTypes } from "./actions"

export interface Sale {
  id: number,
  description: string,
  status: string,
  customer: string,
  saleDate: Date,
  amount: number,
  price: number
}

type SaleState = {
  sales: Sale[]
}

const initialState: SaleState = {
  sales: []
}

function saleReducer(state = initialState, action: any) {
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

export default saleReducer