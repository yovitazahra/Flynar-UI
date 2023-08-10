import type { AnyAction, Dispatch } from '@reduxjs/toolkit'
import api from '@/utils/api'

const ActionType = {
  SET_CHECKOUT: 'SET_CHECKOUT',
  UNSET_CHECKOUT: 'UNSET_CHECKOUT'
}

const setCheckoutActionCreator = (checkout: Record<string, any> | null = null): AnyAction => {
  return {
    type: ActionType.SET_CHECKOUT,
    payload: {
      checkout
    }
  }
}

const unsetCheckoutActionCreator = (): AnyAction => {
  return {
    type: ActionType.UNSET_CHECKOUT,
    payload: {
      checkout: null
    }
  }
}

const asyncCreateCheckoutHomePage = ({
  fullName = '',
  familyName = '',
  phoneNumber = '',
  email = '',
  price = 0,
  total = 1,
  isRoundTrip = false,
  ticketId = '',
  departureSeat = '',
  returnSeat = '',
  passengersData = ''
}): any => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await api.createCheckoutFromHomePage(
        fullName,
        familyName,
        phoneNumber,
        email,
        price,
        total,
        isRoundTrip,
        ticketId,
        departureSeat,
        returnSeat,
        passengersData
      )
      return response
    } catch (error: any) {
      console.log(error.message)
    }
  }
}

export {
  ActionType,
  setCheckoutActionCreator,
  unsetCheckoutActionCreator,
  asyncCreateCheckoutHomePage
}
