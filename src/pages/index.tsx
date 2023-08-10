import { useState, useEffect, type ReactElement, type SetStateAction } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import DatePicker from 'react-datepicker'
import { AiOutlineSwap } from 'react-icons/ai'
import { FaPlaneDeparture, FaPlaneArrival, FaRegCalendarAlt, FaCouch } from 'react-icons/fa'
import { FiSearch } from 'react-icons/fi'
import Switch from '@mui/material/Switch'
import 'react-datepicker/dist/react-datepicker.css'
import DefaultLayout from '@/layouts/default'
import Header from '@/components/Header'
import HomeTicketPreview from '@/components/HomeTicketPreview'
import Loading from '@/components/Loading'
import CitySearchModal from '@/components/CitySearchModal'
import PassengersModal from '@/components/PassengersModal'
import ClassSeatModal from '@/components/ClassSeatModal'
import NotificationMessage from '@/components/NotificationMessage'
import type { RootState } from '@/store/index'
import { asyncSetAuthUser } from '@/store/authUser/action'
import { asyncGetTicketWithFavDestination } from '@/store/tickets/action'
import { asyncCreateCheckoutHomePage } from '@/store/checkout/action'
import { setMessageActionCreator } from '@/store/message/action'
import { setLoadingTrueActionCreator, setLoadingFalseActionCreator } from '@/store/isLoading/action'
import api from '@/utils/api'

const Home = (): ReactElement => {
  const dispatch = useDispatch()
  const router = useRouter()

  const message: Record<string, any> | null = useSelector((state: RootState) => state.message)
  const authUser: Record<string, any> | null = useSelector((state: RootState) => state.authUser)
  const isLoading: boolean = useSelector((state: RootState) => state.isLoading)
  const tickets: [] = useSelector((state: RootState) => state.tickets)

  const [isNotificationMessageShowed, setIsNotificationMessageShowed] = useState(false)
  const [departureCity, setDepartureCity] = useState('')
  const [arrivalCity, setArrivalCity] = useState('')
  const [departureDate, setDepartureDate] = useState<SetStateAction<any>>(new Date())
  const [returnDate, setReturnDate] = useState<SetStateAction<any>>(new Date())
  const [adult, setAdult] = useState(1)
  const [child, setChild] = useState(0)
  const [baby, setBaby] = useState(0)
  const [showPassenger, setShowPassenger] = useState(false)
  const [totalPassenger, setTotalPassenger] = useState(1)
  const [showClassSeat, setShowClassSeat] = useState(false)
  const [classSeat, setClassSeat] = useState('Economy')
  const [isRoundTrip, setIsRoundTrip] = useState(false)
  const [favoriteDestination, setFavoriteDestination] = useState('')
  const [favoriteDestinationOptions, setFavoriteDestinationOptions] = useState([])
  const [isSearchCityModalShowed, setIsSearchCityModalShowed] = useState(false)
  const [cityOptions, setCityOptions] = useState([])
  const [cityInput, setCityInput] = useState('')
  const [isDepartureCity, setIsDepartureCity] = useState(false)

  useEffect(() => {
    void fetchTickets()
    void fetchFavoriteDestionation()
    if (authUser === null) {
      dispatch(asyncSetAuthUser({ identifier: '', password: '' }))
    }
  }, [])

  useEffect(() => {
    if (returnDate <= departureDate && isRoundTrip) {
      setReturnDate(departureDate)
    }
  }, [departureDate])

  useEffect(() => {
    if (departureCity !== '' && departureCity === arrivalCity) {
      setArrivalCity('')
    }
  }, [departureCity])

  useEffect(() => {
    if (arrivalCity !== '' && arrivalCity === departureCity) {
      setDepartureCity('')
    }
  }, [arrivalCity])

  useEffect(() => {
    if (returnDate < departureDate && isRoundTrip) {
      setDepartureDate(returnDate)
    }
  }, [returnDate])

  useEffect(() => {
    if (!isRoundTrip) {
      setReturnDate('')
    } else {
      if (returnDate === '') {
        setReturnDate(departureDate)
      }
    }
  }, [isRoundTrip])

  useEffect(() => {
    void fetchTickets()
  }, [favoriteDestination])

  useEffect(() => {
    if (adult < 1) {
      setAdult(1)
    }
  }, [adult])

  useEffect(() => {
    if (child < 0) {
      setChild(0)
    }
  }, [child])

  useEffect(() => {
    if (baby < 0) {
      setBaby(0)
    }
  }, [baby])

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
    dispatch(setLoadingTrueActionCreator())
    if (authUser === null) {
      setTimeout(() => {
        void router.push('/login')
      }, 1000)
    } else {
      const response = await dispatch(asyncCreateCheckoutHomePage({ ticketId }))
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
    if (date instanceof Date) {
      return `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`
    } else {
      return ''
    }
  }

  const searchFlight = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const total = adult + child + baby
    if (departureCity === '') {
      dispatch(setMessageActionCreator({ error: true, text: 'Silahkan Pilih Kota Asal' }))
      setIsNotificationMessageShowed(true)
    } else if (arrivalCity === '') {
      dispatch(setMessageActionCreator({ error: true, text: 'Silahkan Pilih Kota Tujuan' }))
      setIsNotificationMessageShowed(true)
    } else {
      void router.push(`/search?departureCity=${departureCity}&arrivalCity=${arrivalCity}&classSeat=${classSeat}&total=${total}&departureDate=${formatDate(departureDate)}&returnDate=${formatDate(returnDate)}&isRoundTrip=${isRoundTrip}`)
    }
    setTimeout(() => {
      setIsNotificationMessageShowed(false)
    }, 2500)
  }

  const handleSwapCities = (): void => {
    const tempCity = departureCity
    setDepartureCity(arrivalCity)
    setArrivalCity(tempCity)
  }

  const togglePassenger = (): void => {
    setShowPassenger(!showPassenger)
  }

  const handleClosePassenger = (): void => {
    setShowPassenger(false)
  }

  const handleSave = (): void => {
    const total = adult + child + baby
    setTotalPassenger(total)
    togglePassenger()
  }

  const fetchFavoriteDestionation = async (): Promise<void> => {
    const { data } = await api.fetchCityOptions(false)
    setFavoriteDestinationOptions(data.split(','))
  }

  const fetchCityOptions = async (isDeparture: boolean): Promise<void> => {
    setIsDepartureCity(isDeparture)
    const { data } = await api.fetchCityOptions(isDeparture)
    setCityOptions(data.split(','))
    setIsSearchCityModalShowed(true)
  }

  const selectCity = (value: string, isDeparture: boolean): void => {
    setCityInput('')
    if (isDeparture) {
      setDepartureCity(value)
    } else {
      setArrivalCity(value)
    }
    setIsSearchCityModalShowed(false)
  }

  const onChangeSearchCityModalShowed = (param: boolean): void => {
    setIsSearchCityModalShowed(param)
  }

  const onChangeCityInput = (param: string): void => {
    setCityInput(param)
  }

  const search = (data: string[]): string[] => {
    return data.filter(item => item.toLowerCase().match(cityInput.toLowerCase()) !== null)
  }

  const selectClassSeat = (param: string): void => {
    setClassSeat(param)
    setShowClassSeat(false)
  }

  return (
    <>
      <Head>
        <title>Flynar</title>
      </Head>
      <div id='home-page'>
        <Header isLoggedIn={authUser} login={login}/>
        <main className='pb-8'>
          <div className='banner flex rounded-3xl overflow-hidden my-8 h-32'>
            <div className='welcome w-1/2 items-center flex'>
              <h1 className='w-full font-bold italic text-3xl text-center '>Welcome to <span className='text-blue-900'>Flynar</span></h1>
            </div>
            <Image src='/images/banner.png' width={745} height={232} quality={100} priority={true} alt='Banner' className='w-1/2 h-full object-cover'/>
          </div>
          <div className='container mx-auto'>
            <div className='rounded-2xl border'>
              <form onSubmit={(e) => { searchFlight(e) }} action=''>
                <div className='p-8'>
                  <p className='font-semibold text-xl mb-6'>Pilih Jadwal Penerbangan Spesial di<span className='text-blue-600'> Flynar!</span></p>
                  <div className='flex mb-8'>
                    <div className='flex basis-full'>
                      <div className='flex items-center gap-x-8 w-full'>
                        <label htmlFor='from' className='flex items-center gap-x-3'>
                          <FaPlaneDeparture className='w-6 h-6 text-gray-500' />
                          <span className='text-gray-500 text-sm'>From</span>
                        </label>
                        <div onClick={() => { void fetchCityOptions(true) }} className='cursor-pointer border-b-2 pb-2 font-medium text-lg basis-full'>
                          <p>{departureCity === '' ? 'Pilih Kota' : departureCity}</p>
                        </div>
                      </div>
                    </div>
                    <div className='flex items-center justify-center mx-6'>
                      <AiOutlineSwap onClick={handleSwapCities} className='cursor-pointer w-8 h-8' />
                    </div>
                    <div className='flex basis-full'>
                      <div className='flex items-center gap-x-8 w-full'>
                        <label htmlFor='to' className='grid grid-cols-2 items-center gap-x-3 w-20'>
                          <FaPlaneArrival className='w-6 h-6 text-gray-500' />
                          <span className='text-gray-500 text-sm'>To</span>
                        </label>
                        <div onClick={() => { void fetchCityOptions(false) }} className='cursor-pointer border-b-2 pb-2 font-medium text-lg basis-full'>
                          <p>{arrivalCity === '' ? 'Pilih Kota' : arrivalCity}</p>
                        </div>
                      </div>
                    </div>
                    <CitySearchModal isSearchCityModalShowed={isSearchCityModalShowed} onChangeSearchCityModalShowed={onChangeSearchCityModalShowed} cityInput={cityInput} onChangeCityInput={onChangeCityInput} cities={search(cityOptions)} selectCity={selectCity} isDepartureCity={isDepartureCity}/>
                  </div>
                  <div className='flex'>
                    <div className='flex basis-full'>
                      <div className='flex items-center gap-x-8 w-full'>
                        <label htmlFor='to' className='flex items-center gap-x-3'>
                          <FaRegCalendarAlt className='w-6 h-6 text-gray-500' />
                          <span className='text-gray-500 text-sm'>Date</span>
                        </label>
                        <div className='font-medium text-lg basis-full grid justify-center gap-x-6 grid-cols-2'>
                          <div className='flex flex-col justify-between'>
                            <div className='basis-full flex items-center mb-1'>
                              <label htmlFor='departureDate' className='text-gray-500 text-base'>Departure</label>
                            </div>
                            <DatePicker
                              id='departureDate'
                              className='border-b-2 pb-2 w-full cursor-pointer'
                              selected={departureDate}
                              onChange={(date: Date) => { setDepartureDate(date) }}
                            />
                          </div>
                          <div className='flex flex-col justify-between'>
                            <div className='basis-full flex items-center mb-1'>
                              <label htmlFor='returnDate' className='text-gray-500 text-base'>Return</label>
                              <Switch value={isRoundTrip} onChange={handleIsRoundTripChange} />
                            </div>
                            <DatePicker
                              id='returnDate'
                              className='border-b-2 pb-2 w-full cursor-pointer'
                              selected={returnDate}
                              onChange={(date: Date) => { setReturnDate(date) }}
                              disabled={!isRoundTrip}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='flex items-center justify-center mx-6'>
                      <AiOutlineSwap className='cursor-pointer w-8 h-8 opacity-0' />
                    </div>
                    <div className='flex basis-full'>
                      <div className='flex items-center gap-x-8 w-full'>
                        <label htmlFor='to' className='grid grid-cols-2 items-center gap-x-3 w-20'>
                          <FaCouch className='w-6 h-6 text-gray-500' />
                          <span className='text-gray-500 text-sm'>Seats</span>
                        </label>
                        <div className='font-medium text-lg basis-full grid justify-center gap-x-6 grid-cols-2'>
                          <div className='flex flex-col justify-between relative'>
                            <label htmlFor='to' className='basis-full flex items-center mb-1'>
                              <span className='text-gray-500 text-base'>Passengers</span>
                            </label>
                            <div onClick={() => { togglePassenger() }} className='cursor-pointer border-b-2 pb-2 font-medium text-lg basis-full'>
                              <p>{totalPassenger} Penumpang</p>
                            </div>
                            <PassengersModal togglePassenger={togglePassenger} totalPassenger={totalPassenger} showPassenger={showPassenger} handleClosePassenger={handleClosePassenger} adult={adult} setAdult={setAdult} child={child} setChild={setChild} baby={baby} setBaby={setBaby} handleSave={handleSave} />
                          </div>
                          <div className='flex flex-col justify-between relative'>
                            <label htmlFor='to' className='basis-full flex items-center mb-1'>
                              <span className='text-gray-500 text-base'>Seat Class</span>
                            </label>
                            <div onClick={() => { setShowClassSeat(true) }} className='cursor-pointer border-b-2 pb-2 font-medium text-lg basis-full'>
                              <p>{classSeat}</p>
                            </div>
                            <ClassSeatModal showClassSeat={showClassSeat} setShowClassSeat={setShowClassSeat} classSeat={classSeat} selectClassSeat={selectClassSeat} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <button type='submit' className='w-full py-2 font-semibold tracking-wider text-white bg-blue-500'>Cari Penerbangan</button>
                </div>
              </form>
            </div>
            <div className='mt-8'>
              <h2 className='mb-4 font-bold text-xl'>Destinasi Favorit</h2>
              <div className='flex gap-x-4 mb-6'>
                <button className={`${favoriteDestination === '' ? 'bg-blue-800' : 'bg-blue-600'} flex items-center gap-x-1 hover:bg-blue-700 text-white rounded-xl px-3 py-2 tracking-wider`} onClick={() => { changeFavoriteDestination('') }} value={''}>
                  <FiSearch />
                  <span>Semua</span>
                </button>
                {favoriteDestinationOptions.map((city, index) => (
                  <button className={`${favoriteDestination === city ? 'bg-blue-800' : 'bg-blue-600'} flex items-center gap-x-1 hover:bg-blue-700 text-white rounded-xl px-3 py-2 tracking-wider`} onClick={() => { changeFavoriteDestination(city) }} key={index} value={city}>
                    <FiSearch />
                    <span>{city}</span>
                  </button>
                ))}
              </div>
              <div className='grid lg:grid-cols-5 gap-x-4'>
                {
                  tickets.map((ticket: any, index) => (
                    <HomeTicketPreview key={index} ticket={ticket} createCheckout={createCheckout} />
                  ))
                }
              </div>
            </div>
          </div>
        </main>
      </div>
      {
        isLoading && <Loading />
      }
      {
        <NotificationMessage message={message} isNotificationMessageShowed={isNotificationMessageShowed} />
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
