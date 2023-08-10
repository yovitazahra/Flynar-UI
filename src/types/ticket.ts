export default interface ITicket {
  id: number
  flightId: number
  classSeat: string
  total: number
  price: number
  availableSeat: string
  label: string
  additionalInformation: string
  createdAt: string
  updatedAt: string
  flight: {
    flightCode: string
    airline: string
    departureAirport: string
    arrivalAirport: string
    departureCity: string
    arrivalCity: string
    departureDate: string
    arrivalDate: string
    departureTime: string
    arrivalTime: string
    duration: string
  }
}
