import React, { useState } from 'react'
import type { ReactElement, FormEvent } from 'react'
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

  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    if (name === '' || email === '' || password === '' || phoneNumber === '') {
      setErrorMessage('Mohon lengkapi data')
    }

    if (isNaN(parseInt(phoneNumber))) {
      setErrorMessage('Nomor Telepon Wajib Angka')
    }

    if (password.length < 8) {
      setErrorMessage('Password harus terdiri dari minimal 8 karakter')
    }

    setIsLoading(true)
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
    setIsLoading(false)
  }

  return (
    <div>
      <div>
        <div style={{ backgroundImage: 'linear-gradient(to bottom, #D0B7E6, #E2D4F0)' }}>
          <Image src='/assets/logoFlynarbaru.png' width={264} height={146} alt=''/>
          <Image src='/assets/bgFlower.png' width={719} height={498} alt=''/>
        </div>
        <div>
          <div>
            <div>
              <Image src='/assets/logoFlynarbaru.png' width={200} height={200} alt='Flynar Logo'/>
            </div>
            <form action='' onSubmit={(e) => { void handleSubmit(e) } }>
              <h5>Daftar</h5>
              <div>
                <div>
                  <label htmlFor='name'>Nama</label>
                </div>
                <input
                  type='text'
                  placeholder='Nama Lengkap'
                  id='name'
                  onChange={(e) => { setName(e.target.value) }}
                />
              </div>
              <div>
                <div>
                  <label htmlFor='email'>Email</label>
                </div>
                <input
                  type='email'
                  placeholder='Contoh: johndoe@gmail.com'
                  id='email'
                  onChange={(e) => { setEmail(e.target.value) }}
                />
              </div>
              <div>
                <div>
                  <label htmlFor='phoneNumber'>Nomor Telepon</label>
                </div>
                <input
                  type='text'
                  placeholder='08...'
                  id='phoneNumber'
                  onChange={(e) => { setPhoneNumber(e.target.value) }}
                />
              </div>
              <div>
                <div>
                  <label htmlFor=''>Password</label>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Buat password'
                  id='password'
                  onChange={(e) => { setPassword(e.target.value) }}
                />
                <button
                  type='button'
                  onClick={togglePasswordVisibility}
                  disabled={isLoading}
                >
                  {showPassword
                    ? (<FontAwesomeIcon icon={faEye} />)
                    : (<FontAwesomeIcon icon={faEyeSlash} />
                    )}
                </button>
              </div>
              <button type='submit'>Daftar</button>
              <p>Sudah punya akun?{' '}
                <Link href='/auth/login'>Masuk di sini</Link>
              </p>
              {errorMessage !== '' && <p>{errorMessage}</p>}
              {successMessage !== '' && <p>{successMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
