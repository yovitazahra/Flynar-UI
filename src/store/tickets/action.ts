import type { AnyAction, Dispatch } from '@reduxjs/toolkit'
import api from '@/utils/api'

const ActionType = {
  SET_TICKETS: 'SET_TICKETS',
  UNSET_TICKETS: 'UNSET_TICKETS'
}

const setTicketsActionCreator = (tickets: any[] = []): AnyAction => {
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
        const selectedTickets: any[] = []
        for (let i = 0; i < 5; i++) {
          const index = Math.floor(Math.random() * response.data.length)
          const item = response.data[index]
          response.data.splice(index, 1)
          selectedTickets.push(item)
        }
        dispatch(setTicketsActionCreator(selectedTickets))
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
