import { useState, useEffect, type ReactElement } from 'react'
import DefaultLayout from '@/layouts/default'
import Head from 'next/head'
import Header from '@/components/Header'
import axios from 'axios'
import { useRouter } from 'next/router'

const Home = (): ReactElement => {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    void checkLoggedIn()
  }, [])

  const checkLoggedIn = async (): Promise<void> => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/token', {
        withCredentials: true
      })
      sessionStorage.setItem('accessToken', response.data.accessToken)
      setIsLoggedIn(true)
    } catch (error) {
      console.error(error)
    }
  }

  const login = async (): Promise<void> => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/login', { identifier: '', password: '' }, {
        withCredentials: true
      })
      sessionStorage.setItem('accessToken', response.data.accessToken)
      setIsLoggedIn(true)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.message !== undefined && error.response?.data?.message !== null) {
          if (error.response.data.message === 'Sesi Login Expired, Silahkan Login Ulang') {
            void router.push('/login')
          }
        }
      } else {
        console.error(error)
      }
    }
  }

  return (
    <>
      <Head>
        <title>Flynar</title>
      </Head>
      <div id='home-page'>
        <Header isLoggedIn={isLoggedIn} login={login}/>
        <main className='mx-auto'></main>
      </div>
    </>
  )
}

Home.getLayout = function getLayout (page: ReactElement) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  )
}

export default Home
