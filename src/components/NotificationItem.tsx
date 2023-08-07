import { type ReactElement } from 'react'
import { IoNotificationsSharp } from 'react-icons/io5'

interface INotificationItemProps {
  id: number
  title: string
  label: string
  text: string
  isRead: boolean
  createdAt: string
  readNotification: (id: number) => Promise<void>
}

const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

const NotificationItem = ({ id, title, label, text, isRead, createdAt, readNotification }: INotificationItemProps): ReactElement => {
  const date = new Date(createdAt)
  return (
    <div className='flex w-full items-center gap-x-4'>
      <div className='w-8'>
        <IoNotificationsSharp className='w-full h-full' />
      </div>
      <div className='w-full flex flex-col gap-y-3 md:gap-y-1'>
        <div className='flex flex-col md:flex-row justify-between text-base text-gray-400'>
          <span>{label}</span>
          <span>{`${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}`}</span>
        </div>
        <p className='text-lg'>{title}</p>
        <div className='flex flex-col md:flex-row justify-between text-base'>
          <p className='text-gray-800'>{text}</p>
          {
            isRead
              ? <span className='text-gray-400'>Sudah Dibaca</span>
              : <button className='text-sm text-blue-500' onClick={() => { void readNotification(id) }}>Tandai Sudah Dibaca</button>
          }
        </div>
      </div>
    </div>
  )
}

export default NotificationItem
