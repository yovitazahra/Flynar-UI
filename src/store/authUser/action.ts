import type { AnyAction, Dispatch } from '@reduxjs/toolkit'
import api from '@/utils/api'

const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UPDATE_AUTH_USER: 'UPDATE_AUTH_USER',
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
        dispatch(setAuthUserActionCreator(data))
      }
    } catch (error: any) {
      console.log(error.message)
    }
  }
}

const asyncUpdateAuthUser = (name = '', phoneNumber = ''): any => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await api.updateProfile(name, phoneNumber)
      if (response instanceof Error) {
        return response
      } else {
        const { data } = await api.getProfile()
        dispatch(setAuthUserActionCreator(data))
      }
    } catch (error: any) {
      console.log(error.message)
    }
  }
}

const asyncUnsetAuthUser = (): any => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await api.logout()
      if (response instanceof Error) {
        return response
      } else {
        dispatch(unsetAuthUserActionCreator())
        api.putAccessToken('')
      }
    } catch (error: any) {
      console.log(error.message)
    }
  }
}

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUpdateAuthUser,
  asyncUnsetAuthUser
}
