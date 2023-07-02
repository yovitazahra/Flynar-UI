import { type ReactElement } from 'react'
import HomeBadge from '@/components/HomeBadge'

interface IMenuHeaderProps {
  pageTitle: string
}

const MenuHeader = ({ pageTitle }: IMenuHeaderProps): ReactElement => {
  return (
    <div className='w-full border-b-2 mb-8'>
      <div className='flex mx-auto w-4/5 pt-8 pb-4 gap-x-6 items-center'>
        <h1 className='text-xl font-bold'>{pageTitle}</h1>
        <HomeBadge />
      </div>
    </div>
  )
}

export default MenuHeader
