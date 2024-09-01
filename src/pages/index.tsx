import { signIn } from "next-auth/react";

import Button3D from "@/common/components/ui/3d-button";
import { Button } from "@/common/components/ui/button";

import { NextPageWithLayout } from "./_app";

const HomePage: NextPageWithLayout = () => {
  return (
    <main className="mx-auto max-w-screen-2xl">
      <section className="flex items-center h-screen px-3 md:px-7">
        <div className="fixed flex justify-end top-1 inset-x-1">
          <Button
            variant="ghost"
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
            Masuk dengan akun lain
          </Button>
        </div>
        <div className="md:ml-24 w-full">
          <div className="text-5xl text-center md:text-left md:text-7xl font-bold text-primary mb-3">
            Mudah Belajar <br /> Ilmu Shorof
          </div>
          <div className="mb-4 text-center md:text-left">
            <div>Disusun oleh:</div>
            <div>
              <span className="block md:inline-block">
                Abdul Ghofur, S.Pd.I., M.Pd.
              </span>{" "}
              <span className="hidden md:inline">{" | "}</span>
              <span className="block md:inline-block">
                Siti Durotun Naseha, M.Pd.
              </span>
              <span className="hidden md:inline">{" | "}</span>
              <span className="block md:inline-block">
                Sri Widoyonongrum, ST., M.Pd.
              </span>
            </div>
          </div>
          <div className="flex justify-center md:justify-start">
            <Button3D
              onClick={() => {
                signIn("google", { callbackUrl: "/create-student" });
              }}
            >
              Mulai Belajar
            </Button3D>
          </div>
        </div>

        <div className="absolute bottom-2 right-2 text-sm flex justify-end bg-white">
          <span className="opacity-20 hover:opacity-100 transition-all duration-300">
            Created with ❤️ by{" "}
            <a href="https://github.com/Rizki36" target="_blank">
              fitra36_
            </a>
          </span>
        </div>
      </section>
    </main>
  );
};

HomePage.auth = false;

export default HomePage;
