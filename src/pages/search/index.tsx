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

const SearchFlight = (): ReactElement => {
    const router = useRouter()
    const { departureCity, arrivalCity, selectedClass, passengerSum, classSeat } = router.query

    const [filterParameter, setFilterParameter] = useState('Harga - Termurah')
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

    useEffect(() => {
        getSearchFlightTickets()
    }, [])

    const [showFlightDetails, setShowFlightDetails] = useState(false)
    const toggleFlightDetails = () => {
        setShowFlightDetails(!showFlightDetails);
    }
    return (
        <div>
            <Header/>
            <div className='w-full px-[1%] sm:px-[5%] md:px-[10%] lg:px-[15%] mt-4'>
                <div>
                    <div className='flex justify-between gap-3 pb-[20px]'>
                        <span className='flex bg-purple-700 p-4 text-white text-base font-medium border rounded-md items-center w-4/5'>Destinasi {departureCity} {'>'} {arrivalCity}</span>
                        <div className='search-green-button p-4 bg-green-600 rounded-md border'>
                            <Link href={'/'}><span className='font-bold text-base text-white'>Ubah Pencarian</span></Link>
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
                        <div className='flex items-center justify-end pt-[20px] pb-[20px]'>
                            <div data-modal-target='defaultModal' data-modal-toggle='defaultModal' className='h-fit w-fit p-2 border-2 border-purple-700 rounded-lg text-sm'>
                                {filterParameter}
                            </div>
                        </div>
                        <div className='w-full flex'>
                            <div className='w-1/4 filter-box hidden md:flex'>
                                <div className='h-fit w-full shadow-lg p-5 rounded-lg' id='accordionPanelsStayOpenExample'>
                                    <p className='font-bold mb-4'>Filter</p>
                                    <div className='flex items-center justify-between'>
                                        <div className='flex items-center w-full font-medium text-gray-500' data-accordion-target='#accordion-collapse-body-2' aria-expanded='false' aria-controls='accordion-collapse-body-2'>
                                            <FontAwesomeIcon className='w-3 mr-3' icon={faDollarSign} />
                                            <span>Harga</span>
                                        </div>
                                        <FontAwesomeIcon icon={faChevronRight} className='w-3 text-gray-500'/>
                                    </div>
                                </div>
                            </div>
                            <div className='ml-4 w-full md:w-3/4'>
                                <div className='w-fit px-2 py-1 mb-2 cursor-pointer flex items-center border-2 border-slate-500 rounded-full' onClick={toggleFlightDetails}>
                                    <p>see all details ticket</p>
                                    <FontAwesomeIcon icon={faChevronDown} className='w-3 h-3 ml-2 text-gray-500' />
                                </div>
                                {searchFlightTickets.map((ticket: any, index) => (
                                    <div key={ticket.id} className='p-4 mb-3 border-2 border-slate-300 rounded-lg'>
                                        <div>
                                            <div className='flex justify-between items-center'>
                                                <div className='flex items-center'>
                                                    <FontAwesomeIcon icon={faGlobe} className='w-4 text-yellow-400 mr-2' />
                                                    <p className='font-semibold text-sm'><span>{ticket.flight.airline} - {ticket.classSeat}</span></p>
                                                </div>
                                            </div>
                                            <div className='flex justify-between items-center'>
                                                <div className='flex justify-between items-center w-3/5'>
                                                    <div>
                                                        <p className='font-semibold text-sm'>{ticket.flight.departureTime.slice(0,5)}</p>
                                                        <p className='font-semibold text-sm'>{ticket.flight.departureCity}</p>
                                                    </div>
                                                    <div className='flex items-center'>
                                                        <FontAwesomeIcon icon={faClock} className='w-3 text-gray-400 mr-1' />
                                                        <p className='text-xs text-gray-400'>{ticket.flight.duration.slice(0,5)} h</p>
                                                    </div>
                                                    <div>
                                                        <p className='font-semibold text-sm'>{ticket.flight.arrivalTime.slice(0,5)}</p>
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
                                                        <p className='font-semibold text-sm'>{ticket.flight.departureTime.slice(0,5)}</p>
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
                                                        <p className='font-semibold text-sm'>{ticket.flight.arrivalTime.slice(0,5)}</p>
                                                        <p className='font-extrabold text-xs text-blue-500'>keberangkatan</p>
                                                    </div>
                                                    <p className='font-medium text-sm'>{ticket.flight.arrivalDate}</p>
                                                    <p className='font-medium text-sm'>{ticket.flight.arrivalAirport}</p>
                                                </div>
                                            </div>
                                        )}
                                        
                                    </div>
                                    // <u key={ticket.id} className='border'>
                                    //     <li className='text-center'>maskapai : {ticket.flight.airline}
                                    //         <Link href={`/checkout/${ticket.id}`}>
                                    //             <button className='p-1 m-1 text-sm text-white bg-blue-700 rounded-lg'>
                                    //                 <span className='font-bold text-base text-white'>Pilih</span>
                                    //             </button>
                                    //         </Link>
                                    //     </li>
                                    //     <li className='w-40 text-center'>departure : {ticket.flight.departureCity}</li>
                                    //     <li className='w-40 text-center'>arrival : {ticket.flight.arrivalCity}</li>
                                    //     <li className='w-40 text-center'>seat : {ticket.classSeat}</li>
                                    //     <li className='w-40 text-center'>harga : {ticket.price}</li>
                                    // </u>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default dynamic(() => Promise.resolve(SearchFlight), { ssr: false })