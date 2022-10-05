import Head from 'next/head';
import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>URL Shortener - Short URLs & Custom Free Link Shortener | Cuidly</title>
      </Head>
      <Toaster position="bottom-right" reverseOrder={false} toastOptions={{ duration: 5000 }} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
