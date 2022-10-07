import Head from 'next/head';
import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';
import NextNProgress from 'nextjs-progressbar';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import { store } from '../redux/store';
import Loading from '../components/Loading';

function MyApp({ Component, pageProps }) {
  const persistor = persistStore(store);
  return (
    <Provider store={store}>
      <Head>
        <title>URL Shortener - Short URLs & Custom Free Link Shortener | Cuidly</title>
      </Head>
      <NextNProgress color="#02A3fA" options={{ showSpinner: false }} />
      <Toaster position="bottom-right" reverseOrder={false} toastOptions={{ duration: 5000 }} />
      <PersistGate loading={<Loading />} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
