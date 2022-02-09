import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Promobit Front-end Challenge</title>
        <meta
          name="description"
          content="Gerado com NextJs e feito com amor por Guilherme Veiga"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
