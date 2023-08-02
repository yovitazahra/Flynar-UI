import { useState, useEffect, type ReactElement, type SetStateAction } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Head from 'next/head'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import DefaultLayout from '@/layouts/default'
import Header from '@/components/Header'
import HomeTicketPreview from '@/components/HomeTicketPreview'
import Loading from '@/components/Loading'
import type { RootState } from '@/store/index'
import { asyncSetAuthUser } from '@/store/authUser/action'
import { asyncGetTicketWithFavDestination } from '@/store/tickets/action'
import { asyncCreateCheckoutHomePage } from '@/store/checkout/action'
import { setLoadingTrueActionCreator, setLoadingFalseActionCreator } from '@/store/isLoading/action'

const Home = (): ReactElement => {
  const dispatch = useDispatch()
  const router = useRouter()

  // const message: Record<string, any> | null = useSelector((state: RootState) => state.message)
  const authUser: Record<string, any> | null = useSelector((state: RootState) => state.authUser)
  const isLoading: boolean = useSelector((state: RootState) => state.isLoading)
  const tickets: [] = useSelector((state: RootState) => state.tickets)

  const cities = { Jakarta: 'Jakarta', Medan: 'Medan', Makassar: 'Makassar', Surabaya: 'Surabaya', Denpasar: 'Denpasar' }
  const [departureCity, setDepartureCity] = useState(cities.Jakarta)
  const [arrivalCity, setArrivalCity] = useState(cities.Denpasar)
  const [departureDate, setDepartureDate] = useState<SetStateAction<any>>(new Date())
  const [arrivalDate, setArrivalDate] = useState<SetStateAction<any>>(new Date())
  const [adult, setAdult] = useState(1)
  const [child, setChild] = useState(0)
  const [baby, setBaby] = useState(0)
  const [showPassenger, setShowPassenger] = useState(false)
  const [totalPassenger, setTotalPassenger] = useState(1)
  const [classSeat, setClassSeat] = useState('Economy')
  const [isRoundTrip, setIsRoundTrip] = useState(false)
  const [favoriteDestination, setFavoriteDestination] = useState('')

  useEffect(() => {
    void fetchTickets()
    if (authUser === null) {
      dispatch(asyncSetAuthUser({ identifier: '', password: '' }))
    }
  }, [])

  useEffect(() => {
    if (arrivalDate <= departureDate && isRoundTrip) {
      setArrivalDate(departureDate)
    }
  }, [departureDate])

  useEffect(() => {
    if (arrivalDate < departureDate && isRoundTrip) {
      setDepartureDate(arrivalDate)
    }
  }, [arrivalDate])

  useEffect(() => {
    if (!isRoundTrip) {
      setArrivalDate('')
    } else {
      if (arrivalDate === '') {
        setArrivalDate(departureDate)
      }
    }
  }, [isRoundTrip])

  useEffect(() => {
    void fetchTickets()
  }, [favoriteDestination])

  const login = async (): Promise<void> => {
    dispatch(setLoadingTrueActionCreator())
    const response = await dispatch(asyncSetAuthUser({ identifier: '', password: '' }))
    if (response instanceof Error) {
      setTimeout(() => {
        void router.push('/login')
      }, 1000)
    } else {
      void router.push('/')
    }
    dispatch(setLoadingFalseActionCreator())
  }

  const createCheckout = async (ticketId: string): Promise<void> => {
    if (authUser === null) {
      setTimeout(() => {
        void router.push('/login')
      }, 1000)
    } else {
      dispatch(setLoadingTrueActionCreator())
      const response = await dispatch(asyncCreateCheckoutHomePage({ ticketId }))
      dispatch(setLoadingFalseActionCreator())
      setTimeout(() => {
        void router.push(`/checkout/${response.id}`)
      }, 2000)
    }
  }

  const handleIsRoundTripChange = (): void => {
    setIsRoundTrip(!isRoundTrip)
  }

  const fetchTickets = async (): Promise<void> => {
    dispatch(setLoadingTrueActionCreator())
    await dispatch(asyncGetTicketWithFavDestination(favoriteDestination))
    dispatch(setLoadingFalseActionCreator())
  }

  const changeFavoriteDestination = (value: string): void => {
    setFavoriteDestination(value)
  }

  const formatDate = (date: Date | null = null): string => {
    if (date === null) {
      return ''
    } else {
      return `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`
    }
  }

  const searchFlight = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const total = adult + child + baby
    void router.push(`/search?departureCity=${departureCity}&arrivalCity=${arrivalCity}&classSeat=${classSeat}&total=${total}&departureDate=${formatDate(departureDate)}&arrivalDate=${formatDate(arrivalDate)}&isRoundTrip=${isRoundTrip}`)
  }

  const handleSwapCities = (): void => {
    const tempCity = departureCity
    setDepartureCity(arrivalCity)
    setArrivalCity(tempCity)
  }

  const togglePassenger = (): void => {
    setShowPassenger(!showPassenger)
  }

  // const handleClosePassenger = (): void => {
  //   setShowPassenger(false)
  // }

  const handleSave = (): void => {
    const total = adult + child + baby
    setTotalPassenger(total)
    togglePassenger()
  }

  return (
    <>
      <Head>
        <title>Flynar</title>
      </Head>
      <div id='home-page'>
        <Header isLoggedIn={authUser} login={login}/>
        <main className=''>
          <div>
            <div className=''>
              <div className='' style={{ backgroundImage: 'url("/images/bgRumahadat.png")' }}></div>
              <div className=''>
                <p className=''>
                  Welcome to <span className=''>Flynar</span>
                </p>
              </div>
            </div>
            <div className=''>
              <div className=''>
                <form onSubmit={(e) => { searchFlight(e) }} action=''>
                  <div className=''>
                    <p className=''>
                      Pilih Jadwal Penerbangan Spesial di
                      <span className=''> Flynar!</span>
                    </p>
                    <div className=''>
                      <div className=''>
                        <div className=''>
                          {/* <FontAwesomeIcon icon={faPlaneDeparture} className='mr-2 w-[20px]' /> */}
                          <label htmlFor='from' className=''>From</label>
                        </div>
                        <div className=''>
                          <select className='' id='from' value={departureCity} onChange={e => { setDepartureCity(e.target.value) }}>
                            {Object.entries(cities).map((city, index) => (
                              <option className='' key={index} value={city[1]}>{city[0]}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className=''>
                        <div onClick={handleSwapCities} className=''>
                          {/* <FontAwesomeIcon icon={faRetweet} className='text-white p-1 w-6 md:w-7 lg:w-8' /> */}
                        </div>
                      </div>
                      <div className=''>
                        <div className=''>
                          {/* <FontAwesomeIcon icon={faPlaneDeparture} className='mr-2 w-[20px]' /> */}
                          <label htmlFor='to' className=''>To</label>
                        </div>
                        <div className=''>
                          <select className='' id='to' value={arrivalCity} onChange={e => { setArrivalCity(e.target.value) }}>
                            {Object.entries(cities).map((city, index) => (
                              <option className='' key={index} value={city[1]}>{city[0]}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className=''>
                      <div className=''>
                        <div className=''>
                          {/* <FontAwesomeIcon icon={faCalendarDays} className='me-2 text-lg w-[20px]'/> */}
                          <p className=''>Date</p>
                        </div>
                        <div className=''>
                          <div className=''>
                            <div>
                              <label htmlFor='departureDate' className=''>Departure</label>
                            </div>
                            <DatePicker
                              id='departureDate'
                              className=''
                              selected={departureDate}
                              onChange={(date: Date) => { setDepartureDate(date) }}
                            />
                          </div>
                          <div className=''>
                            <div className=''>
                              <label htmlFor='arrivalDate' className=''>Return</label>
                              <input type='checkbox' onChange={handleIsRoundTripChange}></input>
                            </div>
                            <DatePicker
                              id='arrivalDate'
                              className=''
                              selected={arrivalDate}
                              onChange={(date: Date) => { setArrivalDate(date) }}
                              disabled={!isRoundTrip}
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className=''>
                          <div className=''>
                            {/* <FontAwesomeIcon icon={faCouch} className='mr-2 w-[20px]' /> */}
                            <label htmlFor='to' className=''>To</label>
                          </div>
                          <div className=''>
                            <div className=''>
                              <p className=''>Passengers</p>
                              <div className=''>
                                <span onClick={togglePassenger} className=''>{totalPassenger} Penumpang</span>
                                {showPassenger && (
                                  <div className=''>
                                    <div className=''>
                                      <div className=''>
                                        {/* <FontAwesomeIcon icon={faTimes} className='cursor-pointer w-3 text-semibold text-red-600 hover:text-red-800' onClick={handleClosePassenger} /> */}
                                      </div>
                                    </div>
                                    <div className=''>
                                      <label htmlFor='adult'>Adult</label>
                                      <input className='' type='number' id='adult' value={adult} onChange={(e) => { setAdult(parseInt(e.target.value)) }}/>
                                    </div>
                                    <div className=''>
                                      <label htmlFor='child'>Child</label>
                                      <input className='' type='number' id='child' value={child} onChange={(e) => { setChild(parseInt(e.target.value)) }}/>
                                    </div>
                                    <div className=''>
                                      <label htmlFor='baby'>Baby</label>
                                      <input className='' type='number' id='baby' value={baby} onChange={(e) => { setBaby(parseInt(e.target.value)) }}/>
                                    </div>
                                    <div className=''>
                                      <button className='' onClick={handleSave}>
                                          simpan
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className=''>
                              <label htmlFor='classSeat' className=''>Seat Class</label>
                              <div className=''>
                                <select className='' name='classSeat' id='classSeat' value={classSeat} onChange={e => { setClassSeat(e.target.value) }}>
                                  <option value='Economy'>Economy</option>
                                  <option value='Premium Economy'>Premium Economy</option>
                                  <option value='Business'>Business</option>
                                  <option value='First Class'>First Class</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button type='submit' className=''>
                      Cari Penerbangan
                    </button>
                  </div>
                </form>
                <div className=''>
                  <div className=''>
                    <p className=''>Destinasi Favorit</p>
                    <div>
                      <button className='' onClick={() => { changeFavoriteDestination('') }} value={''}>Semua</button>
                      {Object.entries(cities).map((city, index) => (
                        <button className='' onClick={() => { changeFavoriteDestination(city[1]) }} key={index} value={city[1]}>{city[0]}</button>
                      ))}
                    </div>
                    <div className=''>
                      {
                        tickets.map((ticket: any, index) => (
                          <HomeTicketPreview key={index} ticket={ticket} createCheckout={createCheckout} />
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      {
        isLoading && <Loading />
      }
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
