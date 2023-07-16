import axios from 'axios'

const api = (() => {
  const BASE_URL = process.env.ENVIRONMENT === 'production' ? 'https://flynar-rest-api-production.up.railway.app/api/v1/' : 'http://localhost:8000/api/v1/'

  const putAccessToken = (token: string): void => {
    sessionStorage.setItem('accessToken', token)
  }

  const getAccessToken = (): string | null => {
    return sessionStorage.getItem('accessToken')
  }

  const login = async ({ identifier = '', password = '' }): Promise<any> => {
    try {
      const response = await axios.post(`${BASE_URL}login`, { identifier, password })
      return response.data
    } catch (error) {
      console.error(error)
      return error
    }
  }

  const getProfile = async (): Promise<any> => {
    try {
      const response = await axios.get(`${BASE_URL}profile`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`
        }
      })
      return response.data
    } catch (error) {
      return error
    }
  }

  const register = async (name: string, email: string, password: string, phoneNumber: string): Promise<any> => {
    try {
      const response = await axios.post(`${BASE_URL}register`, {
        name,
        email,
        password,
        phoneNumber
      })
      return response.data
    } catch (error) {
      return error
    }
  }

  return {
    putAccessToken,
    getAccessToken,
    login,
    getProfile,
    register
  }
})()

export default api
