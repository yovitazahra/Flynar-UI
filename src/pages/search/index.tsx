import type { ReactElement } from 'react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faDollarSign, faArrowLeft, faArrowUp, faArrowDown, faCube, faCubes, faChevronRight, faChevronDown, faGlobe, faClock } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import Header from '../../components/Header'
import axios from 'axios'
import { useRouter } from 'next/router'
import dynamic from "next/dynamic";
import DefaultLayout from '@/layouts/default'
import router from 'router'

const SearchFlight = (): ReactElement => {
  const router = useRouter()
  const { departureCity, arrivalCity, selectedClass, passengerSum, classSeat } = router.query

  const [filterParameter, setFilterParameter] = useState('Harga - Termurah')
  const [filteredData, setFilteredData] = useState([]);
  const [searchFlightTickets, setSearchFlightTickets] = useState([])

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type

  const getSearchFlightTickets = async (): Promise<void> => {
    try {
      const response = await axios.get(`${process.env.REST_API_ENDPOINT}search?departureCity=${departureCity}&arrivalCity=${arrivalCity}&classSeat=${classSeat}`, {
        withCredentials: false
      })
      console.log(response.data.data)
      setSearchFlightTickets(response.data.data.slice(0, 4))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error)
      } else {
        console.error(error)
      }
    }
  }

  const handleFilter = async (filterKey: any): Promise<void> => {
    try {
      const response = await axios.get(`${process.env.REST_API_ENDPOINT}filter?sortBy=${filterKey}`, {
        withCredentials: false
      })
      console.log(response.data.data)
      setFilteredData(response.data.data.slice(0, 4))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getSearchFlightTickets()
  }, [])

  const [showFlightDetails, setShowFlightDetails] = useState(false)
  const toggleFlightDetails = () => {

    const router = useRouter()
    const { departureCity, arrivalCity, selectedClass, passengerSum } = router.query

    setShowFlightDetails(!showFlightDetails);
  }
  return (
    <div>
      <Header />
      <div className='w-full px-[1%] sm:px-[5%] md:px-[10%] lg:px-[15%] mt-4'>
        <div>
        <div className='flex gap-3 pb-[20px]'>
            <span className='flex bg-blue-700 text-white text-base font-medium border rounded-md items-center w-[700px] h-[50px]'>
              <Link href={'/'}><button className='px-[15px]' ><FontAwesomeIcon icon={faArrowLeft} className='' /></button></Link>
            Fasilitas {departureCity} {'>'} {arrivalCity}</span>
            <div className='search-green-button'>
              <Link href={'/'}> <button className='w-[220px] h-[50px] bg-hijau shadow-3xl border rounded-md '><span className='font-bold text-base text-white'>Ubah Pencarian</span></button></Link> 
            </div>
          </div>
          {/* <div className='flight-option flex p-[15px] border-b-2 border-gray-300 gap-[5px]'>
                        <button type='button' className='px-5 py-2.5 text-sm font-medium text-center text-black rounded-lg focus:ring-4 focus:outline-none border-2 border-grey'>
                            <b>Senin</b><br />02/05/2023
                        </button>
                        <button type='button' className='px-5 py-2.5 text-sm font-medium text-center text-black rounded-lg focus:ring-4 focus:outline-none border-2 border-grey'>
                            <b>Senin</b><br />02/05/2023
                        </button>
                        <button type='button' className='px-5 py-2.5 text-sm font-medium text-center text-black rounded-lg focus:ring-4 focus:outline-none border-2 border-grey'>
                            <b>Senin</b><br />02/05/2023
                        </button>
                        <button type='button' className='px-5 py-2.5 text-sm font-medium text-center text-black rounded-lg focus:ring-4 focus:outline-none border-2 border-grey'>
                            <b>Senin</b><br />02/05/2023
                        </button>
                        <button type='button' className='px-5 py-2.5 text-sm font-medium text-center text-black rounded-lg focus:ring-4 focus:outline-none border-2 border-grey'>
                            <b>Senin</b><br />02/05/2023
                        </button>
                        <button type='button' className='px-5 py-2.5 text-sm font-medium text-center text-black rounded-lg focus:ring-4 focus:outline-none border-2 border-grey'>
                            <b>Senin</b><br />02/05/2023
                        </button>
                        <button type='button' className='px-5 py-2.5 text-sm font-medium text-center text-black rounded-lg focus:ring-4 focus:outline-none border-2 border-grey'>
                            <b>Senin</b><br />02/05/2023
                        </button>
                        <button type='button' className='px-5 py-2.5 text-sm font-medium text-center text-black rounded-lg focus:ring-4 focus:outline-none border-2 border-grey'>
                            <b>Senin</b><br />02/05/2023
                        </button>
                    </div> */}
          <div className='w-full filter-section'>
            <div className='w-full flex'>
              <div className='w-1/4 filter-box hidden md:flex'>
                <div className='h-fit w-full shadow-lg p-5 rounded-lg' id='accordionPanelsStayOpenExample'>
                  <p className='font-bold mb-4'>Filter</p>
                  <div className='my-3 mx-4'>
                    <button onClick={() => handleFilter('price')} className='px-5 py-1 text-sm text-white bg-blue-500'>
                      <span className='font-medium text-base text-white'>Harga Termurah</span>
                    </button>
                    <button onClick={() => handleFilter('duration')} className='px-5 py-1 text-sm text-white bg-green-500'>
                      <span className='font-medium text-base text-white'>Durasi Tercepat</span>
                    </button>
                    <button onClick={() => handleFilter('departureDateStart')} className='px-5 py-1 text-sm text-white bg-yellow-400'>
                      <span className='font-medium text-base text-white'>Keberangkatan Paling Awal</span>
                    </button>
                    <button onClick={() => handleFilter('departureDateEnd')} className='px-5 py-1 text-sm text-white bg-yellow-400'>
                      <span className='font-medium text-base text-white'>Keberangkatan Paling Akhir</span>
                    </button>
                    <button onClick={() => handleFilter('arrivalDateStart')} className='px-5 py-1 text-sm text-white bg-green-700'>
                      <span className='font-medium text-base text-white'>Kedatangan Paling Awal</span>
                    </button>
                    <button onClick={() => handleFilter('arrivalDateEnd')} className='px-5 py-1 text-sm text-white bg-blue-700'>
                      <span className='font-medium text-base text-white'>Kedatangan Paling Akhir</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className='ml-4 w-full md:w-3/4'>
                <div className='w-fit px-2 py-1 mb-2 cursor-pointer flex items-center border-2 border-slate-500 rounded-full' onClick={toggleFlightDetails}>
                  <p>see all details ticket</p>
                  <FontAwesomeIcon icon={faChevronDown} className='w-3 h-3 ml-2 text-gray-500' />
                </div>

                {/* BUTTON FILTER */}
                {/* <div className='my-3 mx-4'>
                  <button onClick={() => handleFilter('price')} className='px-5 py-1 text-sm text-white bg-blue-500 rounded-lg'>
                    <span className='font-medium text-base text-white'>Harga Termurah</span>
                  </button>
                  <button onClick={() => handleFilter('duration')} className='px-5 py-1 text-sm text-white bg-green-500 rounded-lg'>
                    <span className='font-medium text-base text-white'>Durasi Tercepat</span>
                  </button>
                  <button onClick={() => handleFilter('departureDateStart')} className='px-5 py-1 text-sm text-white bg-yellow-400 rounded-lg'>
                    <span className='font-medium text-base text-white'>Keberangkatan Paling Awal</span>
                  </button>
                  <button onClick={() => handleFilter('departureDateEnd')} className='px-5 py-1 text-sm text-white bg-yellow-400 rounded-lg'>
                    <span className='font-medium text-base text-white'>Keberangkatan Paling Akhir</span>
                  </button>
                  <button onClick={() => handleFilter('arrivalDateStart')} className='px-5 py-1 text-sm text-white bg-green-700 rounded-lg'>
                    <span className='font-medium text-base text-white'>Kedatangan Paling Awal</span>
                  </button>
                  <button onClick={() => handleFilter('arrivalDateEnd')} className='px-5 py-1 text-sm text-white bg-blue-700 rounded-lg'>
                    <span className='font-medium text-base text-white'>Kedatangan Paling Akhir</span>
                  </button>
                </div> */}

                {/* NAMPILIN DATA */}
                {filteredData.length > 0 ? (
                // jika ada data yg di filter
                  filteredData.map((ticket: any, index) => (
                    <div key={ticket.id} className='p-4 mb-3 border-2 border-slate-300 rounded-lg'>
                      <div>
                        <div className='flex justify-between items-center'>
                          <div className='flex items-center'>
                            <FontAwesomeIcon icon={faGlobe} className='text-yellow-400 mr-2' />
                            <p className='font-semibold text-sm'>
                              <span>{ticket?.flight?.airline} - {ticket.classSeat}</span>
                            </p>
                          </div>
                        </div>
                        <div className='flex justify-between items-center'>
                          <div className='flex justify-between items-center w-3/5'>
                            <div>
                              <p className='font-semibold text-sm'>{ticket?.flight?.departureTime.slice(0, 5)}</p>
                              <p className='font-semibold text-sm'>{ticket?.flight?.departureCity}</p>
                            </div>
                            <div className='flex items-center'>
                              <FontAwesomeIcon icon={faClock} className='w-3 text-gray-400 mr-1' />
                              <p className='text-xs text-gray-400'>{ticket?.flight?.duration.slice(0, 5)} h</p>
                            </div>
                            <div>
                              <p className='font-semibold text-sm'>{ticket?.flight?.arrivalTime.slice(0, 5)}</p>
                              <p className='font-semibold text-sm'>{ticket?.flight?.arrivalCity}</p>
                            </div>
                          </div>
                          <div className='flex flex-col items-end'>
                            <p className='font-extrabold text-base text-blue-600'>IDR {ticket.price}</p>
                            <Link href={`/checkout/${ticket.id}`}>
                              <button className='px-5 py-1 text-sm text-white bg-blue-700 rounded-lg'>
                                <span className='font-medium text-base text-white'>Pilih</span>
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                      {showFlightDetails && (
                        <div>
                          <p className='font-bold text-sm'>Detail Penerbangan</p>
                          <div className='p-2'>
                            <div className='flex justify-between'>
                              <p className='font-semibold text-sm'>{ticket?.flight?.departureTime.slice(0, 5)}</p>
                              <p className='font-extrabold text-xs text-blue-500'>keberangkatan</p>
                            </div>
                            <p className='font-medium text-sm'>{ticket?.flight?.departureDate}</p>
                            <p className='font-medium text-sm'>{ticket?.flight?.departureAirport}</p>
                          </div>
                          <div className='py-2 mx-5 border-y-2 border-slate-400 '>
                            <div>
                              <p className='font-bold text-sm'>{ticket?.flight?.airline} - {ticket.classSeat}</p>
                              <p className='font-bold text-sm'>{ticket?.flight?.flightCode}</p>
                            </div>
                            <div>
                              <p className='font-semibold text-sm'>informasi :</p>
                              <p className='font-medium text-sm'>{ticket.additionalInformation.split(',').join(', ')}</p>
                            </div>
                          </div>
                          <div className='p-2'>
                            <div className='flex justify-between'>
                              <p className='font-semibold text-sm'>{ticket?.flight?.arrivalTime.slice(0, 5)}</p>
                              <p className='font-extrabold text-xs text-blue-500'>keberangkatan</p>
                            </div>
                            <p className='font-medium text-sm'>{ticket?.flight?.arrivalDate}</p>
                            <p className='font-medium text-sm'>{ticket?.flight?.arrivalAirport}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )
                  : (
                // jika tidak ada filteran
                    searchFlightTickets.map((ticket: any, index) => (
                      <div key={ticket.id} className='p-4 mb-3 border-2 border-slate-300 rounded-lg'>
                        <div>
                          <div className='flex justify-between items-center'>
                            <div className='flex items-center'>
                              <FontAwesomeIcon icon={faGlobe} className='text-yellow-400 mr-2' />
                              <p className='font-semibold text-sm'><span>{ticket.flight.airline} - {ticket.classSeat}</span></p>
                            </div>
                          </div>
                          <div className='flex justify-between items-center'>
                            <div className='flex justify-between items-center w-3/5'>
                              <div>
                                <p className='font-semibold text-sm'>{ticket.flight.departureTime.slice(0, 5)}</p>
                                <p className='font-semibold text-sm'>{ticket.flight.departureCity}</p>
                              </div>
                              <div className='flex items-center'>
                                <FontAwesomeIcon icon={faClock} className='w-3 text-gray-400 mr-1' />
                                <p className='text-xs text-gray-400'>{ticket.flight.duration.slice(0, 5)} h</p>
                              </div>
                              <div>
                                <p className='font-semibold text-sm'>{ticket.flight.arrivalTime.slice(0, 5)}</p>
                                <p className='font-semibold text-sm'>{ticket.flight.arrivalCity}</p>
                              </div>
                            </div>
                            <div className='flex flex-col items-end'>
                              <p className='font-extrabold text-base text-blue-600'>IDR {ticket.price}</p>
                              <Link href={`/checkout/${ticket.id}`}>
                                <button className='px-5 py-1 text-sm text-white bg-blue-700 rounded-lg'>
                                  <span className='font-medium text-base text-white'>Pilih</span>
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                        {showFlightDetails && (
                          <div>
                            <p className='font-bold text-sm'>Detail Penerbangan</p>
                            <div className='p-2'>
                              <div className='flex justify-between'>
                                <p className='font-semibold text-sm'>{ticket.flight.departureTime.slice(0, 5)}</p>
                                <p className='font-extrabold text-xs text-blue-500'>keberangkatan</p>
                              </div>
                              <p className='font-medium text-sm'>{ticket.flight.departureDate}</p>
                              <p className='font-medium text-sm'>{ticket.flight.departureAirport}</p>
                            </div>
                            <div className='py-2 mx-5 border-y-2 border-slate-400 '>
                              <div>
                                <p className='font-bold text-sm'>{ticket.flight.airline} - {ticket.classSeat}</p>
                                <p className='font-bold text-sm'>{ticket.flight.flightCode}</p>
                              </div>
                              <div>
                                <p className='font-semibold text-sm'>informasi :</p>
                                <p className='font-medium text-sm'>{ticket.additionalInformation.split(',').join(', ')}</p>
                              </div>
                            </div>
                            <div className='p-2'>
                              <div className='flex justify-between'>
                                <p className='font-semibold text-sm'>{ticket.flight.arrivalTime.slice(0, 5)}</p>
                                <p className='font-extrabold text-xs text-blue-500'>keberangkatan</p>
                              </div>
                              <p className='font-medium text-sm'>{ticket.flight.arrivalDate}</p>
                              <p className='font-medium text-sm'>{ticket.flight.arrivalAirport}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default dynamic(() => Promise.resolve(SearchFlight), { ssr: false })