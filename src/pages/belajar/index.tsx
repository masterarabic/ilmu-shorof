import Head from "next/head";
import React from "react";

import MainLayout from "@/common/layouts/MainLayout";
import Bab from "@/modules/lesson/components/bab";

import { NextPageWithLayout } from "../_app";

const LearnPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Belajar bahasa arab</title>
      </Head>
      <Bab />
    </>
  );
};

// TODO: get current bab

LearnPage.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};

export default LearnPage;
