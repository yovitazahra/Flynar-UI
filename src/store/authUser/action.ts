import type { AnyAction, Dispatch } from '@reduxjs/toolkit'
import api from '@/utils/api'

const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER'
}

const setAuthUserActionCreator = (authUser: Record<string, any> | null = null): AnyAction => {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser
    }
  }
}

const unsetAuthUserActionCreator = (): AnyAction => {
  return {
    type: ActionType.UNSET_AUTH_USER,
    payload: {
      authUser: null
    }
  }
}

const asyncSetAuthUser = ({ identifier = '', password = '' }): any => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await api.login({ identifier, password })
      if (response instanceof Error) {
        return response
      } else {
        api.putAccessToken(response.accessToken)
        const { data } = await api.getProfile()
        console.log(data)
        dispatch(setAuthUserActionCreator(data))
      }
    } catch (error: any) {
      alert(error.message)
    }
  }
}

const asyncUnsetAuthUser = () => {
  return (dispatch: Dispatch) => {
    dispatch(unsetAuthUserActionCreator())
    api.putAccessToken('')
  }
}

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser
}
