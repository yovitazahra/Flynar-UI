import type { ReactElement } from 'react'
import 'bootstrap/dist/css/bootstrap.css'

function Login (): ReactElement {
  return (
    <div>
      <div className='d-flex'>
        <div className='position-position-relative' style={{ width: '50%', height: '100vh', backgroundImage: 'url("/Assets/bgLogin.png")' }}>
          <img src='/Assets/logoTiketku.png' alt='' className='position-absolute' style={{ width: '264px', height: '146px', top: '130px', left: '85px' }} />
          <img src='/Assets/bgFlower.png' alt='' className='position-absolute' style={{ width: '719px', height: '498px', bottom: '50px' }} />
        </div>
        <div className='d-flex align-items-center justify-content-center' style={{ width: '50%', height: '100vh' }}>
          <div>
            <form action='' style={{ width: '452px', height: 'fit-content' }}>
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
                    width: '452px',
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
              <div className='pass' style={{ marginBottom: '24px' }}>
                <div className='d-flex mb-1 justify-content-between'>
                  <label htmlFor='' style={{ fontWeight: '400', fontSize: '12px', lineHeight: '18px' }}>
                      Password
                  </label>
                  <a href='auth/ForgotPassword' style={{ fontWeight: '500', fontSize: '12px', lineHeight: '18px', color: '#7126B5', textDecoration: 'none' }}>
                      Lupa Kata Sandi
                  </a>
                </div>
                <input
                  type='password'
                  placeholder='Masukkan password'
                  className='formPass'
                  style={{ width: '452px', height: '48px', fontWeight: '400', fontSize: '14px', lineHeight: '20px', padding: '12px 16px', outline: 'none', border: '1px solid #D0D0D0', borderRadius: '16px' }}
                />
              </div>
              <button
                type='submit'
                style={{
                  padding: '12px 24px',
                  width: '452px',
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
                <a href='/auth/Signup' style={{ fontWeight: '700', fontSize: '14px', lineHeight: '20px', color: '#7126B5', textDecoration: 'none' }}>
                    Daftar di sini
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
