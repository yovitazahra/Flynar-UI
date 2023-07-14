import { configureStore } from '@reduxjs/toolkit'
import authUserReducer from './authUser/reducer'
import messageReducer from './message/reducer'

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    message: messageReducer
  }
})

export default store
