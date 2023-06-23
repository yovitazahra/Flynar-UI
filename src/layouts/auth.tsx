import type { ReactElement } from 'react'
import { Poppins } from 'next/font/google'

interface IAuthPageLayoutProps {
  children: React.ReactNode
}

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['devanagari']
})

const AuthPageLayout = ({ children }: IAuthPageLayoutProps): ReactElement => {
  return (
    <>
      <div className={poppins.className}>
        {children}
      </div>
    </>
  )
}

export default AuthPageLayout
