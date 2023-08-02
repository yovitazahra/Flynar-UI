import type { AnyAction, Dispatch } from '@reduxjs/toolkit'
import api from '@/utils/api'

const ActionType = {
  SET_TICKETS: 'SET_TICKETS',
  UNSET_TICKETS: 'UNSET_TICKETS'
}

const setTicketsActionCreator = (tickets: [] = []): AnyAction => {
  return {
    type: ActionType.SET_TICKETS,
    payload: {
      tickets
    }
  }
}

const asyncGetTicketWithFavDestination = (favoriteDestination: string): any => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await api.fetchTicketsByFavDestination(favoriteDestination)
      if (response instanceof Error) {
        return response
      } else {
        dispatch(setTicketsActionCreator(response.data))
      }
    } catch (error: any) {
      console.log(error.message)
    }
  }
}

export {
  ActionType,
  setTicketsActionCreator,
  asyncGetTicketWithFavDestination
}
