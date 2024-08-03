import React from "react";
import { z } from "zod";

import BabForm, { FormSchema } from "@/modules/admin/components/bab/Form";
import AdminMainLayout from "@/modules/admin/layouts/MainLayout";
import { NextPageWithLayout } from "@/pages/_app";

const CreateBabPage: NextPageWithLayout = () => {
  const onSubmit = (data: z.infer<typeof FormSchema>) => {};

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold">Tambah bab</h1>
      </div>
      <BabForm onSubmit={onSubmit} />
    </div>
  );
};

CreateBabPage.getLayout = (page) => {
  return <AdminMainLayout>{page}</AdminMainLayout>;
};

export default CreateBabPage;
