import { zodResolver } from "@hookform/resolvers/zod";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React, { FC, useId, useState } from "react";
import { useForm, UseFormReturn, useWatch } from "react-hook-form";
import { z } from "zod";

import Button3D from "@/common/components/ui/3d-button";
import { Button } from "@/common/components/ui/button";
import { Form } from "@/common/components/ui/form";
import { Progress } from "@/common/components/ui/progress";
import { cn } from "@/common/utils";
import ShareSection from "@/modules/client/components/belajar/ShareSection";
import { NextPageWithLayout } from "@/pages/_app";

const lesson = {
  text: "Kalimat bahasa Arab yang tepat untuk menyatakan 'Dia pergi ke sekolah' adalah...",
  score: 10,
  answers: [
    {
      id: "c1",
      text: "ذَهَبَ إِلَى المَدْرَسَةِ (dhahaba ilaa l-madrasati)",
      isCorrect: true,
    },
    {
      id: "c2",
      text: "ذَهَبَتْ إِلَى المَدْرَسَةِ (dhahabat ilaa l-madrasati)",
      isCorrect: false,
    },
    {
      id: "c3",
      text: "ذَهَبْتُ إِلَى المَدْرَسَةِ (dhahabtu ilaa l-madrasati)",
      isCorrect: false,
    },
    {
      id: "c4",
      text: "ذَهَبُوا إِلَى المَدْرَسَةِ (dhahabuu ilaa l-madrasati)",
      isCorrect: false,
    },
  ],
};

export const FormSchema = z.object({
  answer: z.string(),
  isIncorrect: z.boolean().optional(),
});

type Form = UseFormReturn<z.infer<typeof FormSchema>>;

const LessonPage: NextPageWithLayout = () => {
  const [heartCount, setHeartCount] = useState(3);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const answer = lesson.answers.find((a) => a.id === data.answer);

    if (!answer) return;

    if (answer.isCorrect) {
      // reset form
      form.reset();
    } else {
      setHeartCount((prev) => prev - 1);
      form.setValue("isIncorrect", true);
    }
  };

  return (
    <div className="bg-primary min-h-screen overflow-y-auto px-11">
      <div className="mt-6 mb-3 flex items-center justify-between">
        <Link href="/belajar">
          <Button variant="ghost" className="text-white">
            Keluar
          </Button>
        </Link>
        <div className="flex items-center text-white gap-x-2 text-lg">
          {heartCount} <HeartFilledIcon className="text-white size-6" />
        </div>
      </div>
      <div className="grid grid-cols-[700px,1fr] gap-x-12">
        <div>
          <div className="bg-white pt-6 rounded-xl">
            <div className="flex select-none p-8 text-lg font-semibold items-center justify-center w-full min-h-[400px] text-center mb-3">
              {lesson.text}
            </div>
            <ShareSection
              url={window.location.href ?? ""}
              variant="ghost"
              className="border-none"
            />
          </div>
          <div className="group flex-col items-center flex justify-center">
            <Progress
              value={70}
              variant="white"
              className="w-full transition duration-300 group-hover:opacity-100 opacity-50 mb-2"
            />
            <div className="flex justify-between w-full transition duration-300 text-white/50 group-hover:text-white">
              <div>Bab 1 - Unit 2</div>
              <div>1 dari 5 soal</div>
            </div>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-6">
              {lesson.answers.map((answer) => (
                <Answer key={answer.id} answer={answer} form={form} />
              ))}
            </div>
            <hr className="my-5" />
            <div>
              <AnswerButton form={form} />
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

const AnswerButton: FC<{
  form: Form;
}> = ({ form }) => {
  const answer = useWatch({
    control: form.control,
    name: "answer",
  });
  const isIncorrect = useWatch({
    control: form.control,
    name: "isIncorrect",
  });

  return (
    <>
      {isIncorrect ? (
        <>
          <Button3D
            type="button"
            variant="destructive"
            className="w-full"
            frontClassName="!py-8 text-lg font-semibold"
            onClick={() => {
              form.reset();
            }}
          >
            Lanjut
          </Button3D>
          <div className="text-white text-center mt-3">Jawaban Anda salah.</div>
        </>
      ) : (
        <Button3D
          type="submit"
          variant="white"
          className="w-full"
          frontClassName="!py-8 text-lg font-semibold"
          disabled={!answer}
        >
          Jawab
        </Button3D>
      )}
    </>
  );
};

const Answer: FC<{
  answer: (typeof lesson.answers)[number];
  form: Form;
}> = ({ answer, form }) => {
  const id = useId();
  const isIncorrect = useWatch({
    control: form.control,
    name: "isIncorrect",
  });

  return (
    <div className="relative">
      <input
        {...form.register("answer")}
        type="radio"
        className="peer hidden"
        id={id}
        value={answer.id}
        disabled={isIncorrect}
      />
      <label
        htmlFor={id}
        className={cn(
          "flex select-none text-lg text-white font-semibold transition duration-200 bg-primary shadow-lg items-center justify-center cursor-pointer min-h-24 flex-col rounded-lg border-2 border-white p-4 hover:shadow-lg",
          "peer-checked:border-2 peer-checked:bg-white peer-checked:text-black peer-disabled:cursor-not-allowed"
        )}
      >
        {answer.text}
      </label>
    </div>
  );
};

LessonPage.getLayout = (page) => {
  return page;
};

export default LessonPage;
