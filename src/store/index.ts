import { configureStore } from '@reduxjs/toolkit'
import authUserReducer from './authUser/reducer'
import messageReducer from './message/reducer'
import isLoadingReducer from './isLoading/reducer'
import checkoutReducer from './checkout/reducer'
import ticketsReducer from './tickets/reducer'

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    message: messageReducer,
    isLoading: isLoadingReducer,
    checkout: checkoutReducer,
    tickets: ticketsReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export default store
