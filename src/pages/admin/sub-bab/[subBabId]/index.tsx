import { createServerSideHelpers } from "@trpc/react-query/server";
import { GetServerSidePropsContext } from "next";
import React from "react";
import superjson from "superjson";

import { Button } from "@/common/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/card";
import DeleteSubBabButton from "@/modules/admin/components/sub-bab/DeleteButton";
import SubBabFormDialog from "@/modules/admin/components/sub-bab/FormDialog";
import LessonTable from "@/modules/admin/components/sub-bab/LessonTable";
import AdminMainLayout from "@/modules/admin/layouts/MainLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { appRouter } from "@/server/routers/_app";
import { trpc } from "@/utils/trpc";

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ subBabId: string }>
) {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {},
    transformer: superjson,
  });
  const id = context.params?.subBabId as string;
  /*
   * Prefetching the `post.byId` query.
   * `prefetch` does not return the result and never throws - if you need that behavior, use `fetch` instead.
   */
  await helpers.subBab.list.prefetch({
    id,
    with: ["bab"],
  });
  return {
    props: {
      trpcState: helpers.dehydrate(),
      id,
    },
  };
}

const SubBabPage: NextPageWithLayout<{
  id: string;
}> = ({ id }) => {
  const [subBabDialog, setSubBabDialog] = React.useState({
    open: false,
    mode: "create" as "create" | "update",
  });

  const { data: subBabResponse } = trpc.subBab.list.useQuery({
    id,
    with: ["bab"],
  });
  const subBab = subBabResponse?.items?.[0];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold">Sub Bab</h1>
        <div className="space-x-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              setSubBabDialog({ mode: "update", open: true });
            }}
          >
            Edit
          </Button>
          <DeleteSubBabButton />
        </div>
      </div>

      <div className="mb-8 flex gap-x-3">
        <Card className="w-auto">
          <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
            <CardTitle className="text-xs font-medium">Nomor Sub Bab</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-center">
              {subBab?.number}
            </div>
          </CardContent>
        </Card>
        <div>
          <div className="text-sm">Nama Bab</div>
          <div className="text-2xl mb-2">{subBab?.bab?.name}</div>

          <div className="text-sm">Nama Sub Bab</div>
          <div className="text-2xl">{subBab?.name}</div>
        </div>
      </div>

      <LessonTable subBabId={subBab?.id || ""} babId={subBab?.bab?.id || ""} />

      <SubBabFormDialog
        mode={subBabDialog.mode}
        open={subBabDialog.open}
        bab={
          subBab?.bab?.id
            ? {
                id: subBab?.bab?.id,
              }
            : undefined
        }
        subBab={
          subBab
            ? {
                id: subBab?.id,
                name: subBab?.name,
                number: subBab?.number,
              }
            : undefined
        }
        setOpen={(open) => {
          setSubBabDialog({ ...subBabDialog, open });
        }}
      />
    </div>
  );
};

SubBabPage.getLayout = (page) => {
  return <AdminMainLayout>{page}</AdminMainLayout>;
};

export default SubBabPage;
