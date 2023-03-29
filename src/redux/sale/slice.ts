import { createSlice } from '@reduxjs/toolkit'

export interface Sale {
  id: string
  description: string
  status: string
  customer: string
  saleDate: Date
  amount: number
  price: number
}

interface SaleState {
  sales: Sale[]
}

const initialState: SaleState = {
  sales: [],
}

const saleSlice = createSlice({
  name: 'sale',
  initialState,
  reducers: {
    addNewSaleAction(state, action) {
      return { ...state, sales: [...state.sales, action.payload] }
    },
  },
})

export const { addNewSaleAction } = saleSlice.actions
export default saleSlice.reducer
