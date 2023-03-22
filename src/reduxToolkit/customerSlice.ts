import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

const initialState: Customer = {
  name: '',
  street: '',
  streetNumber: '',
  federationUnity: '',
  city: '',
  phone: ''
}

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    addCustomer: (state, { payload }: PayloadAction<Customer>) => {
      return {
        ...state, 
        name: payload.name,
        street: payload.street,
        streetNumber: payload.streetNumber,
        federationUnity: payload.federationUnity,
        city: payload.city,
        phone: payload.phone,
      }
    }
  }
})

export const { addCustomer } = customerSlice.actions

// ? useSelector: busca um estado da store
export const selectCustomer = (state: RootState) => state.customer

export default customerSlice.reducer