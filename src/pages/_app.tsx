import { Header, SideBar } from '@components/navigation/nav';
import '@styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet='UTF-8' />
        <meta content="width=device-width, initial-scale=1, maximum-scale=1" name="viewport" />
        <meta content="#0d1821" name="theme-color" />
        <title>Nökkvi</title>
      </Head>
      <main>
        <Header />
        <Component {...pageProps} />
        <SideBar />
      </main>
    </>
  );
}
