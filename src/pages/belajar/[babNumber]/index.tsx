import { createServerSideHelpers } from "@trpc/react-query/server";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { getSession } from "next-auth/react";
import { useEffect } from "react";
import SuperJSON from "superjson";

import ClientMainLayout from "@/common/layouts/MainLayout";
import Bab from "@/modules/client/components/belajar";
import { NextPageWithLayout } from "@/pages/_app";
import { createContextInner } from "@/server/context";
import { appRouter } from "@/server/routers/_app";
import { trpc } from "@/utils/trpc";

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ babNumber: string }>
) {
  const babNumber = Number(context.params?.babNumber ?? "1");
  const session = await getSession(context);

  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: await createContextInner({ session }),
    transformer: SuperJSON,
  });

  const { isExist } = await helpers.student.learn.isBabExist
    .fetch({ babNumber }, {})
    .catch(() => ({ isExist: false }));

  if (!isExist) {
    return {
      redirect: {
        destination: "/belajar/1",
        permanent: false,
      },
    };
  }

  return {
    props: {
      babNumber: Number.isInteger(babNumber) ? babNumber : 1,
    },
  };
}

const SpecificBabPage: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ babNumber }) => {
  const { mutateAsync } = trpc.student.learn.updateLastBab.useMutation();

  useEffect(() => {
    if (!babNumber) return;
    mutateAsync({
      babNumber,
    }).catch((error) => {
      console.error(error);
    });
  }, [babNumber]);

  return (
    <>
      <Head>
        <title>Mudah belajar ilmu shorof</title>
      </Head>
      <Bab babNumber={babNumber} />
    </>
  );
};

SpecificBabPage.getLayout = (page) => {
  return <ClientMainLayout>{page}</ClientMainLayout>;
};

export default SpecificBabPage;
