import { configureStore } from '@reduxjs/toolkit'
import { counterReducer } from './slices/counterSlices'
import { productsReducer } from './slices/ProductsSlices'
import { themeReducer } from './slices/themeSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    product: productsReducer,
    theme: themeReducer
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatcher = typeof store.dispatch