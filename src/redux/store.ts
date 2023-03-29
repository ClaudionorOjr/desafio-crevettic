import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'

import customerReducer from './customer/slice'
import saleReducer from './sale/slice'

export const store = configureStore({
  reducer: {
    customerReducer,
    saleReducer,
  },
  middleware: [logger],
})

export type RootState = ReturnType<typeof store.getState>
