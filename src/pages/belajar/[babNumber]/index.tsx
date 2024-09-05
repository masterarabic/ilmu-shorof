import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "sonner";

import { Spinner } from "@/common/components/ui/spinner";
import { useLocalStorage } from "@/common/hooks/useLocalStorage";
import ClientMainLayout from "@/common/layouts/MainLayout";
import Bab from "@/modules/client/components/belajar";
import { CLIENT_LOCAL_STORAGE_KEYS } from "@/modules/client/constants";
import useCheckBabExist from "@/modules/client/hooks/useCheckBabExist";
import useStudent from "@/modules/client/hooks/useStudent";
import { NextPageWithLayout } from "@/pages/_app";

// jika bab unlocked, check apakah bab tersebut ada di database, jika tidak ada, redirect ke halaman sebelumnya
// jika tidak unlocked, redirect ke halaman sebelumnya

const SpecificBabPage: NextPageWithLayout = () => {
  const router = useRouter();
  const babNumber = Number(router.query.babNumber as string);
  const { student, loadingStudent } = useStudent();
  const [previousOpenedBabNumber, setPreviousOpenedBabNumber] = useLocalStorage(
    CLIENT_LOCAL_STORAGE_KEYS["previousOpenedBabNumber"],
    1
  );

  const latestBabNumber = student?.latestBab?.number ?? 1;

  const babIsUnlocked = babNumber <= latestBabNumber;

  const { isExist, checkingExist } = useCheckBabExist({
    babNumber,
    enabled: babIsUnlocked,
  });

  const shouldRedirect =
    (!babIsUnlocked && !loadingStudent) || (!isExist && !checkingExist);

  const loading = loadingStudent || (!babIsUnlocked && checkingExist);

  useEffect(() => {
    if (loading) return;

    if (shouldRedirect) {
      toast.warning("Selesaikan bab sebelumnya untuk membuka bab ini");
      router.push(`/belajar/${previousOpenedBabNumber}`);
    }
  }, [shouldRedirect, loading]);

  useEffect(() => {
    if (isExist) setPreviousOpenedBabNumber(babNumber);
  }, [isExist, babNumber]);

  if (loading || shouldRedirect) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spinner size="large" />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Mudah belajar ilmu shorof</title>
      </Head>
      <Bab babNumber={babNumber} />
    </>
  );
};

SpecificBabPage.getLayout = (page) => {
  return <ClientMainLayout>{page}</ClientMainLayout>;
};

export default SpecificBabPage;
