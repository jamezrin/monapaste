import { Provider } from 'next-auth/client';
import { AppProps } from 'next/app';
import Head from 'next/head';

import '../styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => (
  <Provider session={pageProps.session}>
    <Head>
      <meta name="darkreader" content="594276ed-edc7-419b-86a7-c1e18fffcfa9" />
    </Head>
    <Component {...pageProps} />
  </Provider>
);

export default App;
