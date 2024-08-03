import React from "react";
import { z } from "zod";

import SubBabForm, {
  FormSchema,
} from "@/modules/admin/components/sub-bab/Form";
import AdminMainLayout from "@/modules/admin/layouts/MainLayout";
import { NextPageWithLayout } from "@/pages/_app";

const CreateSubBabPage: NextPageWithLayout = () => {
  const onSubmit = (data: z.infer<typeof FormSchema>) => {};

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold">Tambah Sub Bab</h1>
      </div>

      <div className="mb-5 mt-4">
        <div className="text-sm">Nama Bab</div>
        <div className="text-2xl">Kata kerja</div>
      </div>

      <SubBabForm onSubmit={onSubmit} />
    </div>
  );
};

CreateSubBabPage.getLayout = (page) => {
  return <AdminMainLayout>{page}</AdminMainLayout>;
};

export default CreateSubBabPage;
