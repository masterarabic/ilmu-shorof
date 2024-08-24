import React from "react";

import ClientMainLayout from "@/common/layouts/MainLayout";
import SettingForm from "@/modules/client/components/setting/Form";

import { NextPageWithLayout } from "../_app";

const SettingPage: NextPageWithLayout = () => {
  return (
    <div className="flex justify-center py-12 px-4">
      <SettingForm />
    </div>
  );
};

SettingPage.getLayout = (page) => {
  return <ClientMainLayout>{page}</ClientMainLayout>;
};

export default SettingPage;
