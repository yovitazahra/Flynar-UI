import type { AnyAction } from '@reduxjs/toolkit'
import { ActionType } from './action'

const authUserReducer = (authUser: Record<string, any> | null = null, action: AnyAction = { type: '' }): any => {
  switch (action.type) {
  case ActionType.SET_AUTH_USER:
    return action.payload.authUser
  case ActionType.UNSET_AUTH_USER:
    return null
  default:
    return authUser
  }
}

export default authUserReducer
