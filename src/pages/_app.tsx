import type { AppProps } from 'next/app'
import type { ReactElement } from 'react'
import { Provider } from 'react-redux'
import { Fragment } from 'react'
import type { Page } from '../types/page'
import store from '@/store'
import '@/styles/globals.css'

type Props = AppProps & {
  Component: Page
}

const App = ({ Component, pageProps }: Props): ReactElement => {
  const getLayout = Component.getLayout ?? (page => page)
  const Layout = Component.layout ?? Fragment
  return (
    <Provider store={store}>
      <Layout>
        {getLayout(<Component {...pageProps} />)}
      </Layout>
    </Provider>
  )
}

export default App
