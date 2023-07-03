import { type ReactElement } from 'react'
import Link from 'next/link'
import { FiArrowLeft } from 'react-icons/fi'

const HomeBadge = (): ReactElement => {
  return (
    <Link href={'/'} className='w-full flex items-center p-2 rounded-md text-base bg-purple-600 text-white font-medium'>
      <FiArrowLeft />
      <span className='ml-3'>Beranda</span>
    </Link>
  )
}

export default HomeBadge
