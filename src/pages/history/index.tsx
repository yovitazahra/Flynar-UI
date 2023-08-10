import { useEffect, useState, type ReactElement } from 'react'
import DefaultLayout from '@/layouts/default'
import MenuHeader from '@/components/MenuHeader'
import { FiEdit3, FiSettings, FiLogOut } from 'react-icons/fi'
import Head from 'next/head'
import axios from 'axios'
import Header from '@/components/Header'
import { useRouter } from 'next/router'
import Link from 'next/link'

const History = (): ReactElement => {
  useEffect(() => {
    void fetchCheckouts()
    const status = false
    setIsLoggedIn(status)
  }, [])

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()
  const [checkouts, setCheckouts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const fetchCheckouts = async (): Promise<void> => {
    const accessToken = sessionStorage.getItem('accessToken')
    try {
      setIsLoading(true)
      setErrorMessage('')
      const response = await axios.get(`${process.env.REST_API_ENDPOINT}checkouts`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      console.log(response)
      setCheckouts(response.data.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.message !== undefined && error.response?.data?.message !== null) {
          if (error.response.data.message === 'Silahkan Login') {
            setErrorMessage(error.response.data.message)
            setTimeout(() => {
              void router.push('/login')
            }, 2000)
          } else {
            setErrorMessage(error.response.data.message)
          }
        } else {
          console.error(error)
        }
      } else {
        console.error(error)
      }
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <>
      <Head>
        <title>History</title>
      </Head>
      <div id='history-page'>
        <Header isLoggedIn={isLoggedIn} login={async () => {}}/>
        <main className='mx-auto'>
          <MenuHeader pageTitle={'Riwayat'} />
          <div className='container mx-auto '>
            <div className='flex flex-col gap-y-8'>
              {
                checkouts.map((checkout: any, index) =>
                  <div key={index}>
                    <h2 className='font-bold text-xl mb-2'>{checkout.year}</h2>
                    <div>
                      <div>
                        <h3 className='font-semibold text-lg'>{checkout.data.month}</h3>
                        <div>
                          {
                            checkout.data.checkouts.map((detail: any, detailIndex: number) =>
                              <div key={detailIndex}>
                                <h4>{detail.status}</h4>
                                {
                                  detail.isRoundTrip === true
                                    ? <div>
                                      <p>From {detail.flights[0].departureAirport}, {detail.flights[0].departureCity} to {detail.flights[0].arrivalAirport}, {detail.flights[0].arrivalCity}</p>
                                      <p>From {detail.flights[1].departureAirport}, {detail.flights[1].departureCity} to {detail.flights[1].arrivalAirport}, {detail.flights[1].arrivalCity}</p>
                                    </div>
                                    : <div>
                                      <p>From {detail.flights[0].departureAirport}, {detail.flights[0].departureCity} to {detail.flights[0].arrivalAirport}, {detail.flights[1].arrivalCity}</p>
                                    </div>
                                }
                                {
                                  detail.status === 'Unpaid'
                                    ? <Link href={`/payment/${detail.id}`}>Pay</Link>
                                    : <span>{detail.status}</span>
                                }
                              </div>
                            )
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }
              {
                checkouts.length === 0 && <h2 className='text-center'>Belum Ada Aktivitas</h2>
              }
              <div className='flex mt-6 mb-2'>
                <span className={`${errorMessage === '' && successMessage === '' ? 'h-0 w-0 opacity-0' : 'h-fit w-fit opacity-100 px-6 py-2'} duration-300 text-sm mx-auto text-white rounded-2xl text-center ${errorMessage !== '' && 'bg-red-600'} ${successMessage !== '' && 'bg-green-400'}`}>
                  {
                    errorMessage === '' && successMessage === ''
                      ? ''
                      : errorMessage !== ''
                        ? errorMessage
                        : successMessage
                  }
                </span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

History.getLayout = function getLayout (page: ReactElement) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  )
}

export default History
