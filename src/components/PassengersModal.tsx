import { type ReactElement } from 'react'
import { FaTimes, FaWalking, FaChild, FaBaby } from 'react-icons/fa'

interface IPassengersModal {
  togglePassenger: () => void
  totalPassenger: number
  showPassenger: boolean
  handleClosePassenger: () => void
  adult: number
  setAdult: (param: number) => void
  child: number
  setChild: (param: number) => void
  baby: number
  setBaby: (param: number) => void
  handleSave: () => void
}

const PassengersModal = ({ togglePassenger, totalPassenger, showPassenger, handleClosePassenger, adult, setAdult, child, setChild, baby, setBaby, handleSave }: IPassengersModal): ReactElement => {
  return (
    <div className={`${!showPassenger ? 'hidden ' : ''}absolute top-16 mt-3 z-20`}>
      <div className='bg-gray-600 fixed w-screen h-screen opacity-50 top-0 left-0' onClick={() => { handleClosePassenger() }}/>
      <div className='relative h-fit bg-white z-30 m-auto rounded-2xl flex flex-col w-96'>
        <div className='flex flex-col gap-y-2'>
          <div className='flex border-b-2 p-2'>
            <button type='button' className='ml-auto'>
              <FaTimes onClick={handleClosePassenger} className='w-6 h-6'/>
            </button>
          </div>
          <div className='p-3 flex flex-col gap-y-3'>
            <div className='flex'>
              <label htmlFor='adult' className='flex w-1/2 items-center gap-x-3'>
                <FaWalking className='h-1/2 w-auto' />
                <div className='flex flex-col gap-y-1'>
                  <span>Dewasa</span>
                  <span className='text-xs text-gray-500'>(12 tahun ke atas)</span>
                </div>
              </label>
              <div className='flex w-1/2 gap-x-2'>
                <button type='button' className='w-3/12 aspect-square rounded border-blue-500 border' onClick={() => { setAdult(adult - 1) }}>-</button>
                <input className='w-1/2 rounded text-center border-gray-700 border' type='number' id='adult' value={adult} onChange={(e) => { setAdult(parseInt(e.target.value)) }}/>
                <button type='button' className='w-3/12 aspect-square rounded border-blue-500 border' onClick={() => { setAdult(adult + 1) }}>+</button>
              </div>
            </div>
            <div className='flex'>
              <label htmlFor='child' className='flex w-1/2 items-center gap-x-3'>
                <FaChild className='h-1/2 w-auto' />
                <div className='flex flex-col gap-y-1'>
                  <span>Anak</span>
                  <span className='text-xs text-gray-500'>(2 - 11 tahun)</span>
                </div>
              </label>
              <div className='flex w-1/2 gap-x-2'>
                <button type='button' className='w-3/12 aspect-square rounded border-blue-500 border' onClick={() => { setChild(child - 1) }}>-</button>
                <input className='w-1/2 rounded text-center border-gray-700 border' type='number' id='child' value={child} onChange={(e) => { setChild(parseInt(e.target.value)) }}/>
                <button type='button' className='w-3/12 aspect-square rounded border-blue-500 border' onClick={() => { setChild(child + 1) }}>+</button>
              </div>
            </div>
            <div className='flex'>
              <label htmlFor='baby' className='flex w-1/2 items-center gap-x-3'>
                <FaBaby className='h-1/2 w-auto' />
                <div className='flex flex-col gap-y-1'>
                  <span>Bayi</span>
                  <span className='text-xs text-gray-500'>(Di bawah 2 tahun)</span>
                </div>
              </label>
              <div className='flex w-1/2 gap-x-2'>
                <button type='button' className='w-3/12 aspect-square rounded border-blue-500 border' onClick={() => { setBaby(baby - 1) }}>-</button>
                <input className='w-1/2 rounded text-center border-gray-700 border' type='number' id='baby' value={baby} onChange={(e) => { setBaby(parseInt(e.target.value)) }}/>
                <button type='button' className='w-3/12 aspect-square rounded border-blue-500 border' onClick={() => { setBaby(baby + 1) }}>+</button>
              </div>
            </div>
            <div className='flex'>
              <button type='button' className='ml-auto w-1/2 rounded-lg py-2 text-base font-semibold tracking-wider text-white bg-blue-500' onClick={handleSave}>Simpan</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PassengersModal
