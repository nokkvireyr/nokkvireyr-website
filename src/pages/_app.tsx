import { Header, SideBar } from '@components/navigation/nav';
import { Inter } from '@next/font/google';
import '@styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { RouterContext, useCRouter } from 'src/lib/router';

const inter = Inter({display: 'swap', weight: ['200','400']});

export default function App({ Component, pageProps }: AppProps) {

  const cRouter = useCRouter();

  return (
    <>
      <Head>
        <meta charSet='UTF-8' />
        <meta content="width=device-width, initial-scale=1, maximum-scale=5" name="viewport" />
        <meta content="#0d1821" name="theme-color" />
        <meta name="title" content="Nökkvi.is | Freelancer" />
        <meta name="description" content="This is my portfolio website, made with love with NextJS. Here you can see all the projects I have worked on." />
        <meta name="keywords" content="Nokkvi,nokkvi,Nökkvi,nokkvi,portfolios,portfolio,resume,nextjs,iceland,freelancer,front-end-developer,frontend,programming,html,css,scss" />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="30 days" />
        <meta name="author" content="Nökkvi Reyr Guðfinnsson"></meta>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#4088b7" />
        <meta name="msapplication-TileColor" content="#4088b7" />
        <meta name="theme-color" content="#4088b7"></meta>
        <title>Nökkvi.is | Freelancer</title>
      </Head>
      <main className={inter.className}>
        <RouterContext.Provider value={cRouter}>
          <Header />
          <Component {...pageProps} />
          <SideBar />
        </RouterContext.Provider>
      </main>
    </>
  );
}
