/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { Nunito } from "next/font/google";
import { SessionProvider, useSession } from "next-auth/react";
import { ReactElement, ReactNode } from "react";

import "@/styles/globals.css";

import { Toaster as SonnerToaster } from "@/common/components/ui/sonner";
import { Toaster } from "@/common/components/ui/toaster";
import { trpc } from "@/utils/trpc";

const nunito = Nunito({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  auth?: boolean;
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const Content: React.FC<{
  Component: NextPageWithLayout;
  pageProps: any;
}> = ({ Component, pageProps }) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <main className={nunito.className}>
      {getLayout(<Component {...pageProps} />)}
      <Toaster />
      <SonnerToaster />
    </main>
  );
};

const App = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  const checkAuth = Component.auth === undefined ? true : Component.auth;

  return (
    <SessionProvider session={session}>
      {checkAuth ? (
        <Auth>
          <Content Component={Component} pageProps={pageProps} />
        </Auth>
      ) : (
        <Content Component={Component} pageProps={pageProps} />
      )}
    </SessionProvider>
  );
};

const Auth: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true });

  if (status === "loading") {
    return <div></div>;
  }

  return children;
};

export default trpc.withTRPC(App);
