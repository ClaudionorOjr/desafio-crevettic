import { createSlice } from '@reduxjs/toolkit'

export interface Customer {
  id: string
  name: string
  street: string
  streetNumber: number
  federationUnity: string
  city: string
  phone: string
}

interface CustomerState {
  customers: Customer[]
}

const initialState: CustomerState = {
  customers: [
    {
      id: '2c14fb29-c790-4df3-8f46-58c0c5924d39',
      name: 'Danilo Lameira da Costa',
      street: 'Rua Francisco Mota',
      streetNumber: 572,
      federationUnity: 'RN',
      city: 'Mossoró',
      phone: '999999999',
    },
    {
      id: 'ce897ece-c39e-4b15-9893-0b49c2bce084',
      name: 'Samir Afonso Tabanez',
      street: 'Rua Francisco Mota',
      streetNumber: 572,
      federationUnity: 'RN',
      city: 'Mossoró',
      phone: '999999999',
    },
    {
      id: 'cfeece47-2c4c-4aac-86be-1a7e9ed0668b',
      name: 'Cândido Figueiredo Semedo',
      street: 'Rua Francisco Mota',
      streetNumber: 572,
      federationUnity: 'RN',
      city: 'Mossoró',
      phone: '999999999',
    },
    {
      id: '52a04259-2f3d-474b-b240-3b788c2e81e7',
      name: 'Saúl Santos Sandinha',
      street: 'Rua Francisco Mota',
      streetNumber: 572,
      federationUnity: 'RN',
      city: 'Mossoró',
      phone: '999999999',
    },
  ],
}

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  //* Adicionar as actions
  reducers: {
    addNewCustomerAction(state, action) {
      return { ...state, customers: [...state.customers, action.payload] }
    },
  },
})

export const { addNewCustomerAction } = customerSlice.actions
export default customerSlice.reducer
