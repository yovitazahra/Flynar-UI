import { type ReactElement } from 'react'
import HomeBadge from '@/components/HomeBadge'

interface IMenuHeaderProps {
  pageTitle: string
}

const MenuHeader = ({ pageTitle }: IMenuHeaderProps): ReactElement => {
  return (
    <div className='flex mx-auto w-4/5 mb-8 pt-8 pb-4 gap-x-6 items-center'>
      <h1 className='text-xl font-bold'>{pageTitle}</h1>
      <HomeBadge />
    </div>
  )
}

export default MenuHeader
