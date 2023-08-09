import { type ReactElement } from 'react'
import { FaTimes, FaCheckCircle } from 'react-icons/fa'

interface IPassengersModal {
  classSeat: string
  selectClassSeat: (param: string) => void
  showClassSeat: boolean
  setShowClassSeat: (param: boolean) => void
}

const classSeatModal = ({ classSeat, selectClassSeat, showClassSeat, setShowClassSeat }: IPassengersModal): ReactElement => {
  return (
    <div className={`${!showClassSeat ? 'hidden ' : ''}absolute top-16 right-0 mt-3 z-20`}>
      <div className='bg-gray-600 fixed w-screen h-screen opacity-50 top-0 left-0' onClick={() => { setShowClassSeat(false) }}/>
      <div className='relative h-fit bg-white z-30 m-auto rounded-2xl flex flex-col w-96 pb-3'>
        <div className='flex flex-col'>
          <div className='flex border-b-2 p-2'>
            <button type='button' className='ml-auto'>
              <FaTimes onClick={() => { setShowClassSeat(false) }} className='w-6 h-6'/>
            </button>
          </div>
          <div className='flex flex-col'>
            <div onClick={() => { selectClassSeat('Economy') }} className={`mx-2 flex justify-between cursor-pointer items-center border-b p-2 ${classSeat === 'Economy' && 'text-white bg-blue-500'}`}>
              <span>Economy</span>
              {
                classSeat === 'Economy' && <FaCheckCircle/>
              }
            </div>
            <div onClick={() => { selectClassSeat('Premium Economy') }} className={`mx-2 flex justify-between cursor-pointer items-center border-b p-2 ${classSeat === 'Premium Economy' && 'text-white bg-blue-500'}`}>
              <span>Premium Economy</span>
              {
                classSeat === 'Premium Economy' && <FaCheckCircle/>
              }
            </div>
            <div onClick={() => { selectClassSeat('Business') }} className={`mx-2 flex justify-between cursor-pointer items-center border-b p-2 ${classSeat === 'Business' && 'text-white bg-blue-500'}`}>
              <span>Business</span>
              {
                classSeat === 'Business' && <FaCheckCircle/>
              }
            </div>
            <div onClick={() => { selectClassSeat('First Class') }} className={`mx-2 flex justify-between cursor-pointer items-center border-b p-2 ${classSeat === 'First Class' && 'text-white bg-blue-500'}`}>
              <span>First Class</span>
              {
                classSeat === 'First Class' && <FaCheckCircle/>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default classSeatModal
