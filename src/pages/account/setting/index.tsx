import type { ReactElement } from 'react'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import Notification from '../../../components/Notification'
import BadgeBeranda from '../../../components/BadgeBeranda'
import React from 'react'
import Link from 'next/Link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faDollarSign, faArrowLeft, faArrowUp, faArrowDown, faCube, faCubes, faEdit, faUserEdit, faGear, faSignOut } from '@fortawesome/free-solid-svg-icons'

const Akun = (): ReactElement => {
  return (
    <div>
      <Header/>
      <div className='container flex justify-center pt-[30px] pb-[20px] border-b-2 border-abu shadow-lg'>
        <div className='badge w-[980px]'>
          <div className='akun text-medium font-bold leading-short'>
            Akun
          </div>
          <BadgeBeranda/>
        </div>
      </div>
    </div>
  )
}