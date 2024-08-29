import { configureStore } from '@reduxjs/toolkit'
import itemSliceReducer from './itemSlice'

export const store = configureStore({
  reducer: { 
    item: itemSliceReducer
  },
})

