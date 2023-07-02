import type { ReactElement } from 'react'
import Image from 'next/image'
import { FiLogIn, FiUser, FiList, FiBell } from 'react-icons/fi'
import Link from 'next/link'

interface IHeaderProps {
  isLoggedIn: boolean
  login: () => Promise<void>
}

const Header = ({ isLoggedIn, login }: IHeaderProps): ReactElement => {
  return (
    <>
      <header className='flex w-full h-fit border-b-2 py-4'>
        <div className='container mx-auto flex justify-between h-12 items-center'>
          <Image src='/images/flynar-logo.png' width={100} height={100} loading='lazy' alt='Flynar Logo' className='h-full w-auto'/>
          {
            isLoggedIn
              ? <div className='flex gap-x-4 h-full py-3'>
                <Link href='/history' className='h-full'>
                  <FiList className='h-full w-full' />
                </Link>
                <Link href='/notification' className='h-full'>
                  <FiBell className='h-full w-full' />
                </Link>
                <Link href='/account' className='h-full'>
                  <FiUser className='h-full w-full' />
                </Link>
              </div>
              : <button onClick={() => { void login() }} className='bg-blue-600 flex items-center gap-x-2 text-white p-2 px-4 rounded-lg'>
                <FiLogIn className='h-full'/>
                <span>Masuk</span>
              </button>
          }
        </div>
      </header>
    </>
  )
}

export default Header
