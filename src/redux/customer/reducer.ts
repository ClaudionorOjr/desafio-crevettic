import { CustomerActionTypes } from "./actions"

export interface Customer {
  id: number
  name: string,
  street: string,
  streetNumber: number,
  federationUnity: string,
  city: string,
  phone: string
}

export interface CustomerState {
  customers: Customer[]
}

interface CustomerAction {
  type: string,
  payload: {
    customer: Customer
  }
}

const initialState: CustomerState = {
  customers: [
    {
      id: 1,
      name: 'Danilo Lameira da Costa',
      street: 'Rua Francisco Mota',
      streetNumber: 572,
      federationUnity: 'RN',
      city: 'Mossoró',
      phone: '999999999'
    },
    {
      id: 2,
      name: 'Samir Afonso Tabanez',
      street: 'Rua Francisco Mota',
      streetNumber: 572,
      federationUnity: 'RN',
      city: 'Mossoró',
      phone: '999999999'
    },
    {
      id: 3,
      name: 'Cândido Figueiredo Semedo',
      street: 'Rua Francisco Mota',
      streetNumber: 572,
      federationUnity: 'RN',
      city: 'Mossoró',
      phone: '999999999'
    },
    {
      id: 4,
      name: 'Saúl Santos Sandinha',
      street: 'Rua Francisco Mota',
      streetNumber: 572,
      federationUnity: 'RN',
      city: 'Mossoró',
      phone: '999999999'
    },
  ]
}

export function customerReducer(state = initialState, action: CustomerAction) {
  switch (action.type) {
    case CustomerActionTypes.ADD_NEW_CUSTOMER: 
      return {
        ...state,
        customers: [...state.customers, action.payload.customer]
      }
    default:
      return state
  }
}