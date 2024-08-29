import { signIn } from "next-auth/react";

import Button3D from "@/common/components/ui/3d-button";

import { NextPageWithLayout } from "./_app";

const HomePage: NextPageWithLayout = () => {
  return (
    <main className="mx-auto max-w-screen-2xl">
      <section className="flex items-center h-screen px-3 md:px-7">
        <div className="md:ml-24 w-full">
          <div className="text-5xl text-center md:text-left md:text-7xl font-bold text-primary mb-3">
            Belajar <br /> Bahasa Arab
          </div>
          <div className="flex justify-center md:justify-start">
            <Button3D
              onClick={() => {
                signIn(
                  "google",
                  { callbackUrl: "/create-student" },
                  {
                    prompt: "consent",
                  }
                );
              }}
            >
              Mulai Belajar
            </Button3D>
          </div>
        </div>
      </section>
    </main>
  );
};

HomePage.auth = false;

export default HomePage;
