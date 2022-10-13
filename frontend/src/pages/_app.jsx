import Head from 'next/head';
import '../styles/globals.css';
import { toast, Toaster, useToasterStore } from 'react-hot-toast';
import NextNProgress from 'nextjs-progressbar';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import { store } from '../redux/store';
import Loading from '../components/screen/Loading';
import { useResponseInterceptor } from '../hooks/useResponseInterceptor';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  // https://github.com/timolins/react-hot-toast/issues/31#issuecomment-803359550
  const MAX_TOAST_LIMIT = 1;
  const { toasts } = useToasterStore();
  useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= MAX_TOAST_LIMIT) // Is toast index over limit?
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [toasts]);
  const persistor = persistStore(store);
  useResponseInterceptor();
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
