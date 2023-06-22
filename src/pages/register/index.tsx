import React, { useState } from 'react'
import type { ReactElement, FormEvent } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

function Register (): ReactElement {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword)
  }

  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    if (name === '' || email === '' || password === '' || phoneNumber === '') {
      setErrorMessage('Mohon lengkapi semua data')
    }

    if (isNaN(parseInt(phoneNumber))) {
      setErrorMessage('Nomor Telepon Wajib Angka')
    }

    if (password.length < 8) {
      setErrorMessage('Password harus terdiri dari minimal 8 karakter')
    }

    try {
      const response = await axios.post('http://localhost:8000/api/v1/register', {
        name,
        email,
        password,
        phoneNumber
      })

      setSuccessMessage('Registrasi berhasil!')
      console.log(response.data)
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.message !== undefined && error.response?.data?.message !== null) {
          setErrorMessage(error.response.data.message)
        } else {
          setErrorMessage('Terjadi kesalahan pada proses registrasi')
        }
        console.error(error)
      } else {
        // Error bukan dari Axios
        console.error(error)
      }
    }
  }

  return (
    <div>
      <div className='d-flex'>
        <div className='kiri position-relative w-100 d-none w-md-50 d-lg-block' style={{ height: '100vh', backgroundImage: 'linear-gradient(to bottom, #D0B7E6, #E2D4F0)' }}>
          <Image src='/assets/logoFlynarbaru.png' width={264} height={146} alt='' className='position-absolute img-fluid' style={{ top: '11%', left: '7%' }} />
          <Image src='/assets/bgFlower.png' width={719} height={498} alt='' className='position-absolute img-fluid' style={{ bottom: '50px' }} />
        </div>
        <div className='kanan d-flex align-items-center justify-content-center w-100 w-md-50' style={{ height: '100vh' }}>
          <div className='w-100' style={{ padding: '0 20%' }}>
            <div className='d-flex justify-content-center'>
              <Image src='/assets/logoFlynarbaru.png' width={200} height={200} alt='' className='img-fluid d-block d-lg-none' />
            </div>
            <form action='' onSubmit={(e) => { void handleSubmit(e) } } style={{ width: '110%', height: 'fit-content' }}>
              <h5 style={{ fontWeight: '700', fontSize: '24px', lineHeight: '36px', marginBottom: '24px' }}>Daftar</h5>
              <div className='name' style={{ marginBottom: '16px' }}>
                <div className='mb-1'>
                  <label htmlFor='' style={{ fontWeight: '400', fontSize: '12px', lineHeight: '18px' }}>
                      Nama
                  </label>
                </div>
                <input
                  type='text'
                  placeholder='Nama lengkap'
                  id='name'
                  className='formNama'
                  onChange={(e) => { setName(e.target.value) }}
                  style={{
                    width: '100%',
                    height: '48px',
                    fontWeight: '400',
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#000',
                    padding: '12px 16px',
                    outline: 'none',
                    border: '1px solid #D0D0D0',
                    borderRadius: '16px'
                  }}
                />
              </div>
              <div className='email' style={{ marginBottom: '16px' }}>
                <div className='mb-1'>
                  <label htmlFor='' style={{ fontWeight: '400', fontSize: '12px', lineHeight: '18px' }}>
                      Email
                  </label>
                </div>
                <input
                  type='text'
                  placeholder='Contoh: johndoe@gmail.com'
                  id='email'
                  className='formEmail'
                  onChange={(e) => { setEmail(e.target.value) }}
                  style={{
                    width: '100%',
                    height: '48px',
                    fontWeight: '400',
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#000',
                    padding: '12px 16px',
                    outline: 'none',
                    border: '1px solid #D0D0D0',
                    borderRadius: '16px'
                  }}
                />
              </div>
              <div className='noTlp' style={{ marginBottom: '16px' }}>
                <div className='mb-1'>
                  <label htmlFor='' style={{ fontWeight: '400', fontSize: '12px', lineHeight: '18px' }}>
                      Nomor Telepon
                  </label>
                </div>
                <input
                  type='text'
                  placeholder='08...'
                  id='phoneNumber'
                  className='formNoTlp'
                  onChange={(e) => { setPhoneNumber(e.target.value) }}
                  style={{
                    width: '100%',
                    height: '48px',
                    fontWeight: '400',
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#000',
                    padding: '12px 16px',
                    outline: 'none',
                    border: '1px solid #D0D0D0',
                    borderRadius: '16px'
                  }}
                />
              </div>
              <div className='pass' style={{ marginBottom: '24px', position: 'relative' }}>
                <div className='d-flex mb-1 justify-content-between'>
                  <label htmlFor='' style={{ fontWeight: '400', fontSize: '12px', lineHeight: '18px' }}>
                    Password
                  </label>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Buat password'
                  id='password'
                  className='formPass'
                  onChange={(e) => { setPassword(e.target.value) }}
                  style={{
                    width: '100%',
                    height: '48px',
                    fontWeight: '400',
                    fontSize: '14px',
                    lineHeight: '20px',
                    padding: '12px 16px',
                    outline: 'none',
                    border: '1px solid #D0D0D0',
                    borderRadius: '16px'
                  }}
                />
                <button
                  className='bg-white ps-2 pe-2'
                  type='button'
                  onClick={togglePasswordVisibility}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    right: '10px',
                    border: 'none'
                  }}
                >
                  {showPassword
                    ? (<FontAwesomeIcon icon={faEye} />)
                    : (<FontAwesomeIcon icon={faEyeSlash} />
                    )}
                </button>
              </div>
              <button
                type='submit'
                style={{
                  padding: '12px 24px',
                  width: '100%',
                  height: '48px',
                  background: '#7126B5',
                  borderRadius: '16px',
                  color: '#fff',
                  fontWeight: '500',
                  fontSize: '14px',
                  lineHeight: '20px',
                  marginBottom: '40px',
                  border: 'none'
                }}
              >
                  Daftar
              </button>
              <p className='text-center' style={{ fontWeight: '400', fontSize: '14px', lineHeight: '20px', color: '#000' }}>
                  Sudah punya akun?{' '}
                <Link href='/auth/login' style={{ fontWeight: '700', fontSize: '14px', lineHeight: '20px', color: '#7126B5', textDecoration: 'none' }}>
                    Masuk di sini
                </Link>
              </p>
              {errorMessage !== '' && <p className='text-center text-white p-2 bg-danger rounded-4 w-100'>{errorMessage}</p>}
              {successMessage !== '' && <p className='text-center text-white p-2 bg-success rounded-4 w-100'>{successMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
