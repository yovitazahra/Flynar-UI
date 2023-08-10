import { type ReactElement } from 'react'
import Image from 'next/image'
import { FaLongArrowAltRight } from 'react-icons/fa'
import formatDate from '@/utils/formatDate'
import formatPrice from '@/utils/formatPrice'
import type ITicket from '@/types/ticket'

interface IHomeTicketPreview {
  ticket: ITicket
  createCheckout: any
}

const HomeTicketPreview = ({ ticket, createCheckout }: IHomeTicketPreview): ReactElement => {
  return (
    <div className='home-ticket-preview hover-zoom-image cursor-pointer flex flex-col gap-y-3' onClick={() => { createCheckout(`${ticket.id}`) }}>
      <div className='relative h-36 overflow-hidden rounded-xl'>
        <p className='absolute z-5 top-2 right-2 bg-blue-500 text-sm text-white py-1 pr-2 pl-3 rounded-xl class-seat tracking-wider'>{ticket.classSeat}</p>
        <Image src={`/images/destination/${ticket.flight.arrivalCity}.jpg`} width={200} height={200} priority={true} alt={ticket.flight.arrivalCity} className='w-full h-full'/>
      </div>
      <div>
        <div className='flex w-full justify-start items-center gap-x-2 font-bold'>
          <p>{ticket.flight.departureCity}</p>
          <FaLongArrowAltRight />
          <p>{ticket.flight.arrivalCity}</p>
        </div>
        <p className='font-bold text-cyan-600'>{ticket.flight.airline}</p>
        <p className='font-semibold'>{formatDate(ticket.flight.departureDate)}</p>
        <p>Mulai dari IDR <span className='font-bold text-blue-600'>{formatPrice(`${ticket.price}`)}</span></p>
      </div>
    </div>
  )
}

export default HomeTicketPreview
