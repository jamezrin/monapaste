import '../styles/globals.css';
import { Provider } from 'next-auth/client';
import { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => (
  <Provider session={pageProps.session}>
    <Component {...pageProps} />
  </Provider>
);

export default App;
