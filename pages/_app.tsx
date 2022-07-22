import type { AppProps } from "next/app";

import { DefaultSeo } from "next-seo";

import SeoConfig from "../next-seo.config";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...SeoConfig} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
