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

  const resendOtp = async (email: string): Promise<any> => {
    try {
      const response = await axios.post(`${BASE_URL}resend-otp`, { email })
      return response.data
    } catch (error) {
      return error
    }
  }

  const verifyOtp = async (loggedEmail: string, otp: number): Promise<any> => {
    try {
      const response = await axios.post(`${BASE_URL}verify`, { email: loggedEmail, otp })
      return response.data
    } catch (error) {
      return error
    }
  }

  const forgotPassword = async (email: string): Promise<any> => {
    try {
      const response = await axios.put(`${BASE_URL}forgot-password`, { email })
      return response.data
    } catch (error) {
      return error
    }
  }

  const resetPassword = async (token: string, password: string, confirmation: string): Promise<any> => {
    try {
      const response = await axios.put(`${BASE_URL}reset-password`, { token, password, confirmation })
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
    register,
    resendOtp,
    verifyOtp,
    forgotPassword,
    resetPassword
  }
})()

export default api