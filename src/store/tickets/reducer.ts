import type { AnyAction } from '@reduxjs/toolkit'
import { ActionType } from './action'

const ticketsReducer = (tickets: [] = [], action: AnyAction = { type: '' }): any => {
  switch (action.type) {
  case ActionType.SET_TICKETS:
    return action.payload.tickets
  case ActionType.UNSET_TICKETS:
    return []
  default:
    return tickets
  }
}

export default ticketsReducer
