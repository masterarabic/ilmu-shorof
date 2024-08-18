import React from "react";

import ClientMainLayout from "@/common/layouts/MainLayout";

import { NextPageWithLayout } from "../_app";

const SettingPage: NextPageWithLayout = () => {
  return <div className="md:mx-12 md:my-4">SettingPage</div>;
};

SettingPage.getLayout = (page) => {
  return <ClientMainLayout>{page}</ClientMainLayout>;
};

export default SettingPage;
