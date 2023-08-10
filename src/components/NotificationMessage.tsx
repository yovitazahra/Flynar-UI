import { type ReactElement } from 'react'

interface IShortMessageProps {
  message: Record<string, any> | null
  isNotificationMessageShowed: boolean
}

const NotificationMessage = ({ message, isNotificationMessageShowed }: IShortMessageProps): ReactElement => {
  return (
    <div className={`${isNotificationMessageShowed ? 'bottom-4 bg-red-600' : '-bottom-12'} z-50 p-3 flex notification-message rounded-xl fixed right-4 ease-in-out duration-700 text-white`}>
      <span className='m-auto'>
        {message?.text}
      </span>
    </div>
  )
}

export default NotificationMessage
