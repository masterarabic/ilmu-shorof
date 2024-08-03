import { useRouter } from "next/router";
import React from "react";
import { z } from "zod";

import { useToast } from "@/common/components/ui/use-toast";
import SubBabForm, {
  FormSchema,
} from "@/modules/admin/components/sub-bab/Form";
import AdminMainLayout from "@/modules/admin/layouts/MainLayout";
import { NextPageWithLayout } from "@/pages/_app";

export const getServerSideProps = async () => {
  return {
    props: {
      subBab: {
        id: "e785559d-6c50-4e51-b2a5-0e1c9da275d4",
        number: 1,
        name: "Kata kerja",
        babId: "e785559d-6c50-4e51-b2a5-0e1c9da275d4",
      },
    },
  };
};

const UpdateSubBabPage: NextPageWithLayout<{
  subBab: {
    id: string;
    number: number;
    name: string;
    babId: string;
  };
}> = ({ subBab }) => {
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    toast({
      title: "Berhasil",
      description: "Berhasil mengubah bab",
    });

    router.push({
      pathname: "/admin/sub-bab/[babId]",
      query: {
        babId: subBab?.babId,
      },
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold">Tambah Sub Bab</h1>
      </div>

      <div className="mb-5 mt-4">
        <div className="text-sm">Nama Bab</div>
        <div className="text-2xl">Kata kerja</div>
      </div>

      <SubBabForm
        defaultValues={{
          name: subBab?.name,
          number: subBab?.number,
        }}
        onSubmit={onSubmit}
      />
    </div>
  );
};

UpdateSubBabPage.getLayout = (page) => {
  return <AdminMainLayout>{page}</AdminMainLayout>;
};

export default UpdateSubBabPage;
