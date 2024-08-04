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
        <h1 className="text-3xl font-semibold">Pelajaran</h1>
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
        <Card className="w-auto">
          <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
            <CardTitle className="text-xs font-medium">
              Nomor Pelajaran
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-center">
              {lesson?.number}
            </div>
          </CardContent>
        </Card>
        <div>
          <div className="text-sm">Nama Bab</div>
          <div className="text-2xl mb-2">{lesson?.bab?.name}</div>

          <div className="text-sm">Nama Sub Bab</div>
          <div className="text-2xl">{lesson?.subBab?.name}</div>
        </div>
      </div>

      <QuestionForm />

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
