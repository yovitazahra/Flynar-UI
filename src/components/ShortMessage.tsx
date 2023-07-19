import { type ReactElement } from 'react'

interface IShortMessageProps {
  message: Record<string, any> | null
}

const ShortMessage = ({ message }: IShortMessageProps): ReactElement => {
  return (
    <div className='flex mt-6'>
      <span className={`${message === null ? 'h-0 w-0 opacity-0' : 'h-fit w-fit opacity-100 px-6 py-2'} ${message?.error === true ? 'bg-red-600' : 'bg-green-400'} duration-300 text-sm mx-auto text-white rounded-2xl text-center`}>
        {message?.text}
      </span>
    </div>
  )
}

export default ShortMessage
