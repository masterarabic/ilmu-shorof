import { zodResolver } from "@hookform/resolvers/zod";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import React, { FC, useId } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Button3D from "@/common/components/ui/3d-button";
import { Button } from "@/common/components/ui/button";
import { Form } from "@/common/components/ui/form";
import { Progress } from "@/common/components/ui/progress";
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

const colors = [
  "bg-[#FFA500]",
  "bg-[#FFD700]",
  "bg-[#50C878]",
  "bg-[#FFC107]",
  "bg-[#FF4500]",
  "bg-[#32CD32]",
  "bg-[#FF00FF]",
  "bg-[#FF6347]",
  "bg-[#00FFFF]",
  "bg-[#20B2AA]",
  "bg-[#FF7F50]",
  "bg-[#ADFF2F]",
];

export const FormSchema = z.object({});

const LessonPage: NextPageWithLayout = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const onSubmit = () => {};

  return (
    <div className="bg-primary h-screen overflow-y-auto">
      <div className="bg-primary-dark2 flex items-center justify-between py-3 px-5">
        <Button variant="ghost" className="text-white">
          Keluar
        </Button>
        <div className="group flex-col items-center flex justify-center">
          <div className="flex justify-between w-full text-white/50">
            <div>Bab 1 - Unit 2</div>
            <div>1 dari 5 soal</div>
          </div>
          <Progress
            value={70}
            variant="white"
            className="w-[700px] transition duration-300 group-hover:opacity-100 opacity-50 mb-2"
          />
        </div>
        <div className="flex items-center text-white gap-x-2 text-lg">
          3 <HeartFilledIcon className="text-white size-6" />
        </div>
      </div>

      <div className="mt-20 flex justify-center mb-[100px]">
        <div className="bg-white duration-300 ease-out overflow-hidden transition transform relative group py-8 w-[800px] p-5 rounded-md hover:scale-105">
          <div className="text-center mb-2">Pertanyaan</div>
          <p className="text-lg text-center font-semibold">
            Kalimat bahasa Arab yang tepat untuk menyatakan &apos;Saya makan
            nasi&apos; adalah...
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-8 px-32">
            {lesson.answers.map((answer, index) => (
              <AnswerCard key={index} answer={answer} />
            ))}
          </div>
          <div className="flex justify-center">
            <Button3D type="submit" variant="white" className="w-[300px]">
              Jawab
            </Button3D>
          </div>
        </form>
      </Form>
    </div>
  );
};

const AnswerCard: FC<{
  answer: (typeof lesson.answers)[number];
}> = ({ answer }) => {
  const id = useId();
  return (
    <div className="relative">
      <input className="peer hidden" id={id} type="radio" name="radio" />
      <label
        htmlFor={id}
        className="flex hover:shadow-lg bg-white items-center justify-center cursor-pointer min-h-24 flex-col rounded-lg border-2 border-gray-300 p-4 peer-checked:border-2 peer-checked:border-primary-dark1"
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
