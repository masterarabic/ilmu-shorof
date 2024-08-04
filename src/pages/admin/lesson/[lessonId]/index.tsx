import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import React from "react";
import superjson from "superjson";

import { Button } from "@/common/components/ui/button";
import { Card } from "@/common/components/ui/card";
import useSystemSetting from "@/common/hooks/useSystemSetting";
import DeleteLessonButton from "@/modules/admin/components/lesson/DeleteButton";
import LessonFormDialog from "@/modules/admin/components/lesson/FormDialog";
import QuestionForm from "@/modules/admin/components/lesson/QuestionForm";
import AdminMainLayout from "@/modules/admin/layouts/MainLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { appRouter } from "@/server/routers/_app";
import { trpc } from "@/utils/trpc";

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ lessonId: string }>
) {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {},
    transformer: superjson,
  });
  const id = context.params?.lessonId as string;
  /*
   * Prefetching the `post.byId` query.
   * `prefetch` does not return the result and never throws - if you need that behavior, use `fetch` instead.
   */
  await helpers.lesson.list.prefetch({
    id,
    with: ["bab", "subBab"],
  });
  return {
    props: {
      trpcState: helpers.dehydrate(),
      id,
    },
  };
}

const LessonDetailPage: NextPageWithLayout<{
  id: string;
}> = ({ id }) => {
  const { config } = useSystemSetting();
  const [lessonDialog, setLessonDialog] = React.useState({
    open: false,
    mode: "create" as "create" | "update",
  });

  const { data: lessonData, isLoading } = trpc.lesson.list.useQuery({
    id,
    with: ["bab", "subBab"],
  });
  const lesson = lessonData?.items?.[0];

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center relative">
          <Link
            href={{
              pathname: "/admin/sub-bab/[subBabId]",
              query: { subBabId: lesson?.subBab.id },
            }}
            className="left-0 translate-x-[-100%] absolute"
          >
            <Button type="button" size="sm" variant="ghost">
              <ArrowLeftIcon />
            </Button>
          </Link>
          <h1 className="text-3xl font-semibold">Detail Pelajaran</h1>
        </div>
        <div className="space-x-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              setLessonDialog({ mode: "update", open: true });
            }}
          >
            Edit
          </Button>
          <DeleteLessonButton />
        </div>
      </div>

      <div className="mb-8 flex gap-x-3">
        <Card className="w-auto p-6 flex-col">
          <div className="text-xs font-medium">Nomor Pelajaran</div>
          <div className="text-3xl font-bold text-center">{lesson?.number}</div>
        </Card>

        <div>
          <div className="text-sm">Nama Bab</div>
          <div className="text-2xl mb-2">{lesson?.bab?.name}</div>

          <div className="text-sm">Nama Sub Bab</div>
          <div className="text-2xl">{lesson?.subBab?.name}</div>
        </div>
      </div>

      <div className="flex items-center gap-x-7 mb-8">
        <div>Acak Soal : {config.randomizeQuestion ? "Ya" : "Tidak"}</div>
        <div>Acak Pertanyaan : {config.randomizeAnswer ? "Ya" : "Tidak"}</div>
        <div>
          <Link href="/admin/setting">
            <Button size="sm" variant="ghost">
              Ubah Pengaturan
            </Button>
          </Link>
        </div>
      </div>

      <QuestionForm lessonId={id} />

      <LessonFormDialog
        mode={lessonDialog.mode}
        open={lessonDialog.open}
        setOpen={(isOpen) =>
          setLessonDialog((prev) => ({ ...prev, open: isOpen }))
        }
        bab={{
          id: lesson?.bab.id || "",
        }}
        subBab={{
          id: lesson?.subBab.id || "",
        }}
        lesson={{
          id: lesson?.id || "",
          number: lesson?.number || 0,
        }}
      />
    </div>
  );
};

LessonDetailPage.getLayout = (page) => {
  return <AdminMainLayout>{page}</AdminMainLayout>;
};

export default LessonDetailPage;
