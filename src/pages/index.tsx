import { useState, useEffect, type ReactElement } from 'react'
import DefaultLayout from '@/layouts/default'
import Head from 'next/head'
import Header from '@/components/Header'
import axios from 'axios'
import { useRouter } from 'next/router'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const Home = (): ReactElement => {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [departureCity, setDepartureCity] = useState('')
  const [returnCity, setReturnCity] = useState('')
  const [departureDate, setDepartureDate] = useState(new Date())
  const [returnDate, setReturnDate] = useState(new Date())
  const [passengers, setPassengers] = useState(1)
  const [classSeat, setClassSeat] = useState('Economy')
  const [isRoundTrip, setIsRoundTrip] = useState(false)

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

  const handleIsRoundTripChange = (): void => {
    setIsRoundTrip(!isRoundTrip)
  }

  return (
    <>
      <Head>
        <title>Flynar</title>
      </Head>
      <div id='home-page'>
        <Header isLoggedIn={isLoggedIn} login={login}/>
        <main className='mx-auto'>
          <div>Banner</div>
          <div>
            <h2>Pilih Jadwal Penerbangan di Flynar</h2>
            <form>
              <div>
                <div>
                  <label htmlFor='from'>From</label>
                  <select name='from' id='from'>
                    <option value='Jakarta'>Jakarta</option>
                    <option value='Medan'>Medan</option>
                    <option value='Surabaya'>Surabaya</option>
                    <option value='Denpasar'>Denpasar</option>
                    <option value='Makassar'>Makassar</option>
                  </select>
                </div>
                <div>
                  <button>Tukar Tempat</button>
                </div>
                <div>
                  <label htmlFor='to'>To</label>
                  <select name='to' id='to'>
                    <option value='Jakarta'>Jakarta</option>
                    <option value='Medan'>Medan</option>
                    <option value='Surabaya'>Surabaya</option>
                    <option value='Denpasar'>Denpasar</option>
                    <option value='Makassar'>Makassar</option>
                  </select>
                </div>
              </div>
              <div>
                <div>
                  <div>
                    <label htmlFor='date'>Date</label>
                  </div>
                  <div>
                    <label htmlFor='departureDate'>Departure</label>
                    <DatePicker
                      id='departureDate'
                      selected={departureDate}
                      onChange={(date: Date) => { setDepartureDate(date) }}
                    />
                  </div>
                  <div>
                    <label htmlFor='returnDate'>Return</label>
                    <DatePicker
                      id='returnDate'
                      selected={returnDate}
                      onChange={(date: Date) => { setReturnDate(date) }}
                      disabled={!isRoundTrip}
                    />
                  </div>
                </div>
                <div>
                  <input type='checkbox' onChange={handleIsRoundTripChange}></input>
                </div>
                <div>
                  <div>
                    
                  </div>
                  <div>
                    <label htmlFor='classSeat'>Seat Class</label>
                    <select name='classSeat' id='classSeat'>
                      <option value='Economy'>Economy</option>
                      <option value='Premium Economy'>Premium Economy</option>
                      <option value='Business'>Business</option>
                      <option value='First Class'>First Class</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </main>
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

Home.getLayout = function getLayout (page: ReactElement) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  )
}

export default Home
