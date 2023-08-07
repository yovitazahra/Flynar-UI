import { type ReactElement } from 'react'
import { FiSearch } from 'react-icons/fi'
import { FaTimes } from 'react-icons/fa'

interface ICitySearchModalProps {
  isSearchCityModalShowed: boolean
  onChangeSearchCityModalShowed: (param: boolean) => void
  cities: any[]
  cityInput: string
  onChangeCityInput: (param: string) => void
  selectCity: (value: string, isDeparture: boolean) => void
  isDepartureCity: boolean
}

const CitySearchModal = ({ isSearchCityModalShowed, onChangeSearchCityModalShowed, cities, cityInput, onChangeCityInput, selectCity, isDepartureCity }: ICitySearchModalProps): ReactElement => {
  return (
    <div className={`${!isSearchCityModalShowed ? 'hidden ' : ''}fixed z-20 top-0 left-0 w-screen h-screen flex`}>
      <div className='bg-gray-600 absolute w-full h-full opacity-50' onClick={() => { onChangeSearchCityModalShowed(false) }}></div>
      <div className='relative w-1/2 h-1/2 bg-white z-30 m-auto rounded-2xl p-6 flex flex-col'>
        <div className='flex mb-6 items-center gap-x-2'>
          <div className='flex w-full items-center gap-x-2 border-2 p-2 rounded-lg'>
            <label htmlFor='city'>
              <FiSearch className='w-5 h-5'/>
            </label>
            <input id='city' type='text' value={cityInput} onChange={(e) => { onChangeCityInput(e.target.value) }} className='w-full' placeholder='Masukan Kota'/>
          </div>
          <button type='button' onClick={() => { onChangeSearchCityModalShowed(false) }} className='w-5 h-5'>
            <FaTimes className='w-full h-full'/>
          </button>
        </div>
        <div className='flex overflow-y-auto h-auto flex-col gap-y-2 pr-4'>
          {
            cities.map((city, index) =>
              <p key={index} onClick={() => { selectCity(city, isDepartureCity) }} className='border-b-2 pb-2 mt-3 cursor-pointer'>{city}</p>
            )
          }
          {
            cities.length <= 0 && <p>Tidak ada hasil pencarian</p>
          }
        </div>
      </div>
    </div>
  )
}

export default CitySearchModal
