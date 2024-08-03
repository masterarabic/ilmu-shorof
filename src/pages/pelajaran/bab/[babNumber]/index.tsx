import Head from "next/head";
import React from "react";

import ClientMainLayout from "@/common/layouts/MainLayout";
import Bab from "@/modules/lesson/components/bab";
import { NextPageWithLayout } from "@/pages/_app";

const LearnPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Hi</title>
      </Head>
      <Bab />
    </>
  );
};

LearnPage.getLayout = (page) => {
  return <ClientMainLayout>{page}</ClientMainLayout>;
};

export default LearnPage;
