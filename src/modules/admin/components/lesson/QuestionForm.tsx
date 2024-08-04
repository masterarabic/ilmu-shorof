import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Control, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/common/components/ui/button";
import { Checkbox } from "@/common/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/common/components/ui/form";
import { Input } from "@/common/components/ui/input";

const FormSchema = z.object({
  items: z.array(
    z.object({
      question: z
        .string({
          message: "Pertanyaan harus berupa teks",
        })
        .min(1, {
          message: "Pertanyaan tidak boleh kosong",
        }),
      answers: z.array(
        z.object({
          text: z.string().min(1, {
            message: "Jawaban tidak boleh kosong",
          }),
          correct: z.boolean(),
        })
      ),
    })
  ),
});

const QuestionItem = ({
  questionIndex,
  control,
  remove,
}: {
  questionIndex: number;
  control: Control<z.infer<typeof FormSchema>>;
  remove: (index: number) => void;
}) => {
  const {
    fields,
    append: appendAnswer,
    remove: removeAnswer,
  } = useFieldArray({
    control: control,
    name: `items.${questionIndex}.answers`,
  });

  return (
    <div className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all">
      <div className="flex items-center justify-between w-full">
        <div className="text-sm">Soal {questionIndex + 1}</div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => {
            remove(questionIndex);
          }}
        >
          Hapus
        </Button>
      </div>
      <div className="w-full">
        <FormField
          control={control}
          name={`items.${questionIndex}.question`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pertanyaan</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Isi dengan pertanyaan"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <hr className="my-4" />

        <div className="flex justify-between items-center mb-3">
          <div className="text-sm">Jawaban</div>
          <Button
            type="button"
            size="sm"
            onClick={() => {
              appendAnswer({
                text: "",
                correct: false,
              });
            }}
          >
            Tambah jawaban
          </Button>
        </div>

        <div className="space-y-2 w-full">
          {fields.map((_, index) => {
            return (
              <div key={index} className="flex gap-2 w-full">
                <Button
                  type="button"
                  asChild
                  variant="ghost"
                  className="space-x-3"
                >
                  <label
                    htmlFor={`items.${questionIndex}.answers.${index}.correct`}
                    className="flex items-center space-x-2"
                  >
                    <FormField
                      control={control}
                      name={`items.${questionIndex}.answers.${index}.correct`}
                      render={({ field }) => (
                        <Checkbox
                          id={`items.${questionIndex}.answers.${index}.correct`}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mr-2"
                        />
                      )}
                    />
                    Benar
                  </label>
                </Button>
                <FormField
                  control={control}
                  name={`items.${questionIndex}.answers.${index}.text`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Isi dengan jawaban"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    removeAnswer(index);
                  }}
                >
                  Hapus
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const QuestionForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });
  const {
    fields: itemsFields,
    append: appendItem,
    remove,
  } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="text-xl mb-4 flex justify-between items-center">
          <h2>List Soal</h2>
          <div>
            <Button
              type="button"
              size="sm"
              onClick={() => {
                appendItem({
                  question: "",
                  answers: [
                    {
                      text: "",
                      correct: true,
                    },
                    {
                      text: "",
                      correct: false,
                    },
                    {
                      text: "",
                      correct: false,
                    },
                    {
                      text: "",
                      correct: false,
                    },
                  ],
                });
              }}
            >
              Tambah Soal
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          {itemsFields.map((_, index) => {
            return (
              <QuestionItem
                key={index}
                control={form.control}
                questionIndex={index}
                remove={remove}
              />
            );
          })}
        </div>

        <div>
          <Button type="submit">Simpan</Button>
        </div>
      </form>
    </Form>
  );
};

export default QuestionForm;
