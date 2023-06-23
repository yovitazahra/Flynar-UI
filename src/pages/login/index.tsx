import { useState, type ReactElement } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const Login = (): ReactElement => {
  const [showPassword, setShowPassword] = useState(false)
  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword)
  }

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:8000/api/v1/login', { identifier: email, password })

      if (response.status === 200) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { accessToken } = response.data
      } else {
        const { message } = response.data
        setErrorMessage(message)
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.message !== undefined && error.response?.data?.message !== null) {
          setErrorMessage(error.response.data.message)
        } else {
          setErrorMessage('Terjadi kesalahan pada proses registrasi')
        }
        console.error(error)
      } else {
        console.error(error)
      }
    }
  }

  return (
    <>
      <Head>
        <title>Sign In</title>
        <meta name='description' content='Sign in to flynar website' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <div id='login-page' className='flex'>
        <div className='relative w-full h-[100vh] hidden md:w-50 lg:block bg-gradient-to-b from-[#D0B7E6] to-[#E2D4F0]'>
          <Image src='/assets/logoFlynarbaru.png' width={264} height={146} alt='' className='absolute object-contain top-[11%] left-[7%]' />
          <Image src='/assets/bgFlower.png' width={719} height={498} alt='' className='absolute object-contain bottom-[59px]' />
        </div>
        <div className='flex items-center justify-center w-full md:w-50 h-[100vh]'>
          <div className='w-full px-[20%]'>
            <div className='flex justify-center'>
              <Image src='/assets/logoFlynarbaru.png' width={200} height={200} alt='' className='object-contain block lg:hidden' />
            </div>
            <form onSubmit={(e) => { void handleSubmit(e) } } action='' className='w-[110%] h-auto'>
              <h5 className='font-bold text-2xl leading-9 mb-6'>Masuk</h5>
              <div className='email mb-4'>
                <div className='mb-1'>
                  <label htmlFor='' className='font-normal text-base leading-6'>Email/No Telepon</label>
                </div>
                <input type='text' value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='Contoh: johndoe@gmail.com' className='formEmail w-full h-12 font-normal text-base leading-6 text-gray-600 py-3 px-4 outline-none border border-gray-300 rounded-lg'/>
              </div>
              <div className='pass mb-6 relative'>
                <div className='flex items-center justify-between mb-1'>
                  <label htmlFor='' className='font-normal text-xs leading-6'>Password</label>
                  <a href='auth/ForgotPassword' className='font-medium text-xs leading-6 text-purple-600 no-underline'>Lupa Kata Sandi</a>
                </div>
                <input value={password} onChange={(e) => { setPassword(e.target.value) }} type={showPassword ? 'text' : 'password'} placeholder='Masukkan password' id='password' className='formPass relative w-full h-12 font-normal text-base leading-6 py-3 px-4 outline-none border border-gray-300 rounded-lg'/>
                <button
                  type='button' onClick={togglePasswordVisibility} className='bg-white px-2 pr-2 absolute top-1/2 right-2 border-none'
                >
                  {showPassword ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
                </button>
              </div>
              <button type='submit' className='w-full h-12 px-6 py-2 bg-purple-600 rounded-lg text-white font-medium text-base leading-6 mb-10 border-none'>Masuk</button>
              <p className='text-center font-normal text-base leading-6 text-black mb-3'>Belum punya akun?{' '}
                <Link href='/register' className='font-semibold text-base leading-6 text-purple-700 no-underline'>Daftar di sini</Link>
              </p>
              {errorMessage !== '' && <p className='text-center text-white p-3 bg-red-600 rounded-md w-[100%]'>{errorMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
