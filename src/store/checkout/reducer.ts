import type { AnyAction } from '@reduxjs/toolkit'
import { ActionType } from './action'

const checkoutReducer = (checkout: Record<string, any> | null = null, action: AnyAction = { type: '' }): any => {
  switch (action.type) {
  case ActionType.SET_CHECKOUT:
    return action.payload.checkout
  case ActionType.UNSET_CHECKOUT:
    return null
  default:
    return checkout
  }
}

export default checkoutReducer
