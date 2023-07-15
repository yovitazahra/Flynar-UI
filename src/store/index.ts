import { configureStore } from '@reduxjs/toolkit'
import authUserReducer from './authUser/reducer'
import messageReducer from './message/reducer'
import isLoadingReducer from './isLoading/reducer'

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    message: messageReducer,
    isLoading: isLoadingReducer
  }
})

export default store
