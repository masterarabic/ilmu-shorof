import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { getSession } from "next-auth/react";
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
import { createContextInner } from "@/server/context";
import { appRouter } from "@/server/routers/_app";
import { trpc } from "@/utils/trpc";

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ subBabId: string }>
) {
  const session = await getSession(context);

  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: await createContextInner({ session }),
    transformer: superjson,
  });
  const id = context.params?.subBabId as string;
  /*
   * Prefetching the `post.byId` query.
   * `prefetch` does not return the result and never throws - if you need that behavior, use `fetch` instead.
   */
  await helpers.admin.subBab.list.prefetch({
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

  const { data: subBabResponse } = trpc.admin.subBab.list.useQuery({
    id,
    with: ["bab"],
  });
  const subBab = subBabResponse?.items?.[0];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center relative">
          <Link
            href={{
              pathname: "/admin/bab/[babId]",
              query: { babId: subBab?.bab?.id },
            }}
            className="left-0 translate-x-[-100%] absolute"
          >
            <Button type="button" size="sm" variant="ghost">
              <ArrowLeftIcon />
            </Button>
          </Link>
          <h1 className="text-3xl font-semibold">Detail Sub Bab</h1>
        </div>
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
