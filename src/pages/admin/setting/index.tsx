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
import { Switch } from "@/common/components/ui/switch";
import { toast } from "@/common/components/ui/use-toast";
import AdminMainLayout from "@/modules/admin/layouts/MainLayout";
import { NextPageWithLayout } from "@/pages/_app";

const FormSchema = z.object({
  randomizeQuestion: z.boolean().default(false).optional(),
  randomizeAnswer: z.boolean().default(false).optional(),
  defaultScore: z.number().default(15).optional(),
});

type SettingFormValues = z.infer<typeof FormSchema>;

// This can come from your database or API.
const defaultValues: Partial<SettingFormValues> = {
  randomizeQuestion: false,
  randomizeAnswer: false,
  defaultScore: 15,
};

const SettingPage: NextPageWithLayout = () => {
  const form = useForm<SettingFormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  function onSubmit(data: SettingFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold">Pengaturan</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 lg:w-1/2"
        >
          <FormField
            control={form.control}
            name="randomizeQuestion"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Acak pertanyaan</FormLabel>
                  <FormDescription>
                    Aktifkan fitur ini untuk mengacak pertanyaan
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="randomizeAnswer"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Acak jawaban</FormLabel>
                  <FormDescription>
                    Aktifkan fitur ini untuk mengacak jawaban
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="defaultScore"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nilai default</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Isi dengan angka minimal 1"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Ini adalah nilai default yang akan diberikan kepada siswa jika
                  berhasil menjawab soal
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <div className="mt-4">
        <Button type="submit">Simpan</Button>
      </div>
    </div>
  );
};

SettingPage.getLayout = (page) => {
  return <AdminMainLayout>{page}</AdminMainLayout>;
};

export default SettingPage;
