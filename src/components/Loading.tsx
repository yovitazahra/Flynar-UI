import { type ReactElement } from 'react'

const Loading = (): ReactElement => {
  return (
    <div className='fixed w-screen h-screen flex justify-center items-center bg-transparent z-10 inset-0'>
      <span className='loader'></span>
    </div>
  )
}

export default Loading
