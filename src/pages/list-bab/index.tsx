import { CaretLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

import Button3D from "@/common/components/ui/3d-button";
import { Button } from "@/common/components/ui/button";
import { Progress } from "@/common/components/ui/progress";
import ClientMainLayout from "@/common/layouts/MainLayout";
import useBabList from "@/modules/client/hooks/useBabList";

import { NextPageWithLayout } from "../_app";

const ListBabPage: NextPageWithLayout = () => {
  const { babList } = useBabList();

  return (
    <div className="md:pt-4 md:mx-12 md:pb-4 mx-4">
      <div className="mb-3">
        <Link
          href={{
            pathname: "/belajar",
          }}
          className="-ml-6"
        >
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="hover:!bg-transparent"
          >
            <CaretLeftIcon /> Kembali
          </Button>
        </Link>
      </div>
      <h1 className="text-3xl font-semibold mb-8">List Bab</h1>

      <div className="w-full lg:w-[700px] space-y-4">
        {babList?.map((bab) => (
          <div key={bab.id} className="rounded-md border p-4">
            <div className="mb-2">
              Bab {bab.number}: {bab.name}
            </div>

            <Progress
              value={Math.round((bab.myLesson / bab.totalLesson) * 100)}
              className=""
            />

            <div className="text-sm flex items-center justify-between text-neutral-500 mb-3">
              <span>
                {bab.myLesson} dari {bab.totalLesson} pelajaran
              </span>
              <span>{Math.round((bab.myLesson / bab.totalLesson) * 100)}%</span>
            </div>

            <div>
              <Link
                href={{
                  pathname: "/belajar/[babNumber]",
                  query: { babNumber: bab.number },
                }}
              >
                <Button3D type="button" size="sm">
                  Lanjutan
                </Button3D>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

ListBabPage.getLayout = (page) => {
  return <ClientMainLayout>{page}</ClientMainLayout>;
};

export default ListBabPage;
