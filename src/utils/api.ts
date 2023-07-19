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
      const response = await axios.post(`${BASE_URL}login`, { identifier, password }, {
        withCredentials: true
      })
      return response.data
    } catch (error) {
      console.error(error)
      return error
    }
  }

  const logout = async (): Promise<any> => {
    try {
      const response = await axios.delete(`${BASE_URL}logout`, {
        withCredentials: true
      })
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
        },
        withCredentials: true
      })
      return response.data
    } catch (error) {
      return error
    }
  }

  const updateProfile = async (name: string, phoneNumber: string): Promise<any> => {
    try {
      const response = await axios.put(`${BASE_URL}profile/update`, { name, phoneNumber }, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`
        },
        withCredentials: true
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
      }, {
        withCredentials: true
      })
      return response.data
    } catch (error) {
      return error
    }
  }

  const resendOtp = async (email: string): Promise<any> => {
    try {
      const response = await axios.post(`${BASE_URL}resend-otp`, { email }, {
        withCredentials: true
      })
      return response.data
    } catch (error) {
      return error
    }
  }

  const verifyOtp = async (loggedEmail: string, otp: number): Promise<any> => {
    try {
      const response = await axios.post(`${BASE_URL}verify`, { email: loggedEmail, otp }, {
        withCredentials: true
      })
      return response.data
    } catch (error) {
      return error
    }
  }

  const forgotPassword = async (email: string): Promise<any> => {
    try {
      const response = await axios.put(`${BASE_URL}forgot-password`, { email }, {
        withCredentials: true
      })
      return response.data
    } catch (error) {
      return error
    }
  }

  const resetPassword = async (token: string, password: string, confirmation: string): Promise<any> => {
    try {
      const response = await axios.put(`${BASE_URL}reset-password`, { token, password, confirmation }, {
        withCredentials: true
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
    logout,
    getProfile,
    updateProfile,
    register,
    resendOtp,
    verifyOtp,
    forgotPassword,
    resetPassword
  }
})()

export default api
