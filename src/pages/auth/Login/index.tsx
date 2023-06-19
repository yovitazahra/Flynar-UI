import { useState, type ReactElement } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const Login = (): ReactElement => {
  const [showPassword, setShowPassword] = useState(false)
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  
  return (
    <div>
      <div className='d-flex'>
        <div className='position-relative w-100 d-none w-md-50 d-lg-block' style={{ height: '100vh', backgroundImage: 'linear-gradient(to bottom, #D0B7E6, #E2D4F0)' }}>
          <Image src='/assets/logoFlynarbaru.png' width={264} height={146} alt='' className='position-absolute img-fluid' style={{ top: '11%', left: '7%' }} />
          <Image src='/assets/bgFlower.png' width={719} height={498} alt='' className='position-absolute img-fluid' style={{ bottom: '50px' }} />
        </div>
        <div className='d-flex align-items-center justify-content-center w-100 w-md-50' style={{ height: '100vh' }}>
          <div className='w-100' style={{ padding: '0 20%' }}>
            <div className='d-flex justify-content-center'>
              <Image src='/assets/logoFlynarbaru.png' width={200} height={200} alt='' className='img-fluid d-block d-lg-none' />
            </div>
            <form action='' style={{ width: '110%', height: 'fit-content' }}>
              <h5 style={{ fontWeight: '700', fontSize: '24px', lineHeight: '36px', marginBottom: '24px' }}>Masuk</h5>
              <div className='email' style={{ marginBottom: '16px' }}>
                <div className='mb-1'>
                  <label htmlFor='' style={{ fontWeight: '400', fontSize: '12px', lineHeight: '18px' }}>
                    Email/No Telepon
                  </label>
                </div>
                <input
                  type='text'
                  placeholder='Contoh: johndoe@gmail.com'
                  className='formEmail'
                  style={{
                    width: '100%',
                    height: '48px',
                    fontWeight: '400',
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#8A8A8A',
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
                  <a href='auth/ForgotPassword' style={{ fontWeight: '500', fontSize: '12px', lineHeight: '18px', color: '#7126B5', textDecoration: 'none' }}>
                      Lupa Kata Sandi
                  </a>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Masukkan password'
                  id='password'
                  className='formPass'
                  style={{
                    width: '100%',
                    height: '48px',
                    fontWeight: '400',
                    fontSize: '14px',
                    lineHeight: '20px',
                    padding: '12px 16px',
                    outline: 'none',
                    border: '1px solid #D0D0D0',
                    borderRadius: '16px',
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
                    border: 'none',
                  }}
                >
                  {showPassword ? (
                    <FontAwesomeIcon icon={faEye} />
                  ) : (
                    <FontAwesomeIcon icon={faEyeSlash} />
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
                Masuk
              </button>
              <p className='text-center' style={{ fontWeight: '400', fontSize: '14px', lineHeight: '20px', color: '#000' }}>
                Belum punya akun?{' '}
                <Link href='/auth/register' style={{ fontWeight: '700', fontSize: '14px', lineHeight: '20px', color: '#7126B5', textDecoration: 'none' }}>
                  Daftar di sini
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
