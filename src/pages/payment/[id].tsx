import { useEffect, useState, type ReactElement } from 'react'
import DefaultLayout from '@/layouts/default'
import MenuHeader from '@/components/MenuHeader'
import { FiEdit3, FiSettings, FiLogOut } from 'react-icons/fi'
import Head from 'next/head'
import axios from 'axios'
import Header from '@/components/Header'
import { useRouter } from 'next/router'

const Payment = (): ReactElement => {
  useEffect(() => {
    const status = false
    setIsLoggedIn(status)
  }, [])

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  return (
    <>
      <Head>
        <title>Payment</title>
      </Head>
      <div id='payment-page'>
        <Header isLoggedIn={isLoggedIn} login={async () => {}}/>
        <main className='mx-auto'>
          <h2>Payment Page</h2>
        </main>
      </div>
    </>
  )
}

Payment.getLayout = function getLayout (page: ReactElement) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  )
}

export default Payment
