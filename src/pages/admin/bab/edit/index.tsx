import { useRouter } from "next/router";
import React from "react";
import { z } from "zod";

import { useToast } from "@/common/components/ui/use-toast";
import BabForm, { FormSchema } from "@/modules/admin/components/bab/Form";
import AdminMainLayout from "@/modules/admin/layouts/MainLayout";
import { NextPageWithLayout } from "@/pages/_app";

export const getServerSideProps = async () => {
  return {
    props: {
      bab: {
        id: "e785559d-6c50-4e51-b2a5-0e1c9da275d4",
        number: 1,
        name: "Kata kerja",
      },
    },
  };
};

const UpdateBabPage: NextPageWithLayout<{
  bab: {
    id: string;
    number: number;
    name: string;
  };
}> = ({ bab }) => {
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    toast({
      title: "Berhasil",
      description: "Berhasil mengubah bab",
    });

    router.push({
      pathname: "/admin/bab/[babId]",
      query: {
        babId: bab.id,
      },
    });
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold">Edit bab</h1>
      </div>
      <BabForm
        defaultValues={{
          name: bab?.name,
          number: bab?.number,
        }}
        onSubmit={onSubmit}
      />
    </div>
  );
};

UpdateBabPage.getLayout = (page) => {
  return <AdminMainLayout>{page}</AdminMainLayout>;
};

export default UpdateBabPage;
