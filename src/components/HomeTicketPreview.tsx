import { type ReactElement } from 'react'
import Image from 'next/image'
import type ITicket from '@/types/ticket'

interface IHomeTicketPreview {
  ticket: ITicket
  createCheckout: any
}

const HomeTicketPreview = ({ ticket, createCheckout }: IHomeTicketPreview): ReactElement => {
  return (
    <div className='cursor-pointer' onClick={() => { createCheckout(`${ticket.id}`) }}>
      <div>
        <Image src={`/images/destination/${ticket.flight.arrivalCity}.jpg`} width={200} height={200} priority={true} alt={ticket.flight.arrivalCity} className='w-auto h-auto'/>
        <div className=''>
          <p>{ticket.flight.departureCity}</p>
          <p>{ticket.flight.arrivalCity}</p>
        </div>
        <p className=''>{ticket.flight.departureDate}</p>
        <p>{ticket.classSeat}</p>
        <p className=''>IDR {ticket.price}</p>
      </div>
      <div>{ticket.label}</div>
    </div>
  )
}

export default HomeTicketPreview
