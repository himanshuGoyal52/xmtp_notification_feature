import XmtpProvider from './XmtpProvider'
import Layout from '../components/Layout'
import { WalletProvider } from './WalletProvider'
import { registerSW } from '../helpers/string'

type AppProps = {
  children?: React.ReactNode
}

function App({ children }: AppProps) {
  return (
    <WalletProvider>
      <XmtpProvider>
        <Layout>{children}</Layout>
      </XmtpProvider>
    </WalletProvider>
  )
}
registerSW()

export default App
