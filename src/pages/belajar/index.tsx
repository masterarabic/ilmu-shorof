import { createServerSideHelpers } from "@trpc/react-query/server";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import React from "react";
import SuperJSON from "superjson";

import ClientMainLayout from "@/common/layouts/MainLayout";
import { createContextInner } from "@/server/context";
import { appRouter } from "@/server/routers/_app";

import { NextPageWithLayout } from "../_app";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: await createContextInner({ session }),
    transformer: SuperJSON,
  });

  /*
   * Prefetching the `post.byId` query.
   * `prefetch` does not return the result and never throws - if you need that behavior, use `fetch` instead.
   */
  const student = await helpers.client.self.student
    .fetch()
    .then((data) => data.student)
    .catch(() => null);

  const latestBab = student?.latestBab;
  const babNumber = latestBab?.number ?? 1;

  return {
    redirect: {
      destination: `/belajar/${babNumber}`,
      permanent: false,
    },
  };
}

const LearnPage: NextPageWithLayout = () => {
  return <></>;
};

LearnPage.getLayout = (page) => {
  return <ClientMainLayout>{page}</ClientMainLayout>;
};

export default LearnPage;
