import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/common/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/common/components/ui/form";
import { Input } from "@/common/components/ui/input";
import AdminMainLayout from "@/modules/admin/layouts/MainLayout";
import { NextPageWithLayout } from "@/pages/_app";

const FormSchema = z.object({
  number: z
    .number({
      message: "Nomor pelajaran harus berupa angka",
    })
    .min(1, {
      message: "Nomor pelajaran minimal 1",
    }),
});

const CreateLessonPage: NextPageWithLayout = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {};

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold">Tambah Pelajaran</h1>
      </div>

      <div className="mb-5 mt-4">
        <div className="text-sm">Nama Bab</div>
        <div className="text-2xl mb-3">Kata kerja</div>
        <div className="text-sm">Nama Sub Bab</div>
        <div className="text-2xl">Kata kerja 1</div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* TODO: cek uniq bab number */}
          <FormField
            control={form.control}
            name="number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nomor</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Isi dengan angka minimal 1"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Ini adalah nomor pelajaran yang nanatinya akan digunakan untuk
                  urutan pelajaran
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

CreateLessonPage.getLayout = (page) => {
  return <AdminMainLayout>{page}</AdminMainLayout>;
};

export default CreateLessonPage;
