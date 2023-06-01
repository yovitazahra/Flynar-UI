import type { ReactElement } from 'react'

const Header = (): ReactElement => {
  return (
    <>
      <header className='w-full p-4 bg-brown flex flex-col'>
        <h1 className='text-2xl text-center mt-4'>This is header</h1>
      </header>
    </>
  )
}

export default Header
