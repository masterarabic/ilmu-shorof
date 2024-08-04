import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import React from "react";
import superjson from "superjson";

import { Button } from "@/common/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/card";
import DeleteBabButton from "@/modules/admin/components/bab/DeleteButton";
import BabFormDialog from "@/modules/admin/components/bab/FormDialog";
import SubBabListTable from "@/modules/admin/components/bab/SubBabTable";
import AdminMainLayout from "@/modules/admin/layouts/MainLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { appRouter } from "@/server/routers/_app";
import { trpc } from "@/utils/trpc";

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ babId: string }>
) {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {},
    transformer: superjson,
  });
  const id = context.params?.babId as string;
  /*
   * Prefetching the `post.byId` query.
   * `prefetch` does not return the result and never throws - if you need that behavior, use `fetch` instead.
   */
  await helpers.bab.list.prefetch({
    id,
  });
  return {
    props: {
      trpcState: helpers.dehydrate(),
      id,
    },
  };
}

const BabDetailPage: NextPageWithLayout<{
  id: string;
}> = ({ id }) => {
  const [babDialog, setBabDialog] = React.useState({
    open: false,
    mode: "create" as "create" | "update",
  });

  const { data: babListResponse } = trpc.bab.list.useQuery({
    id,
  });

  const bab = babListResponse?.items?.[0];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center relative">
          <Link
            href="/admin/bab"
            className="left-0 translate-x-[-100%] absolute"
          >
            <Button type="button" size="sm" variant="ghost">
              <ArrowLeftIcon />
            </Button>
          </Link>
          <h1 className="text-3xl font-semibold">Detail Bab</h1>
        </div>
        <div className="space-x-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              setBabDialog({ open: true, mode: "update" });
            }}
          >
            Edit
          </Button>
          <DeleteBabButton />
        </div>
      </div>

      <div className="mb-8 flex gap-x-3">
        <Card className="w-auto">
          <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
            <CardTitle className="text-xs font-medium">Nomor Bab</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-center">{bab?.number}</div>
          </CardContent>
        </Card>
        <div className="mt-6">
          <div className="text-sm">Nama Bab</div>
          <div className="text-2xl">{bab?.name}</div>
        </div>
      </div>

      <SubBabListTable id={id} />

      <BabFormDialog
        mode={babDialog.mode}
        open={babDialog.open}
        bab={bab}
        setOpen={(open) => {
          setBabDialog({ ...babDialog, open });
        }}
      />
    </div>
  );
};

BabDetailPage.getLayout = (page) => {
  return <AdminMainLayout>{page}</AdminMainLayout>;
};

export default BabDetailPage;
