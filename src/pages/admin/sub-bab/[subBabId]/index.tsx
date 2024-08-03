import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/common/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/common/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/common/components/ui/table";
import AdminMainLayout from "@/modules/admin/layouts/MainLayout";
import { NextPageWithLayout } from "@/pages/_app";

export type Data = {
  id: string;
  number: number;
  name: string;
  totalLesson: number;
};

const columnHelper = createColumnHelper<Data>();

const data: Data[] = [
  {
    id: "e785559d-6c50-4e51-b2a5-0e1c9da275d4",
    number: 1,
    name: "Kata kerja 1",
    totalLesson: 2,
  },
  {
    id: "e785559d-6c50-4e51-b2a5-0e1c9da275d4",
    number: 2,
    name: "Kata kerja 2",
    totalLesson: 3,
  },
];

export const columns = [
  columnHelper.accessor("number", {
    header: () => <div className="text-center">Nomor Pelajaran</div>,
    cell: (info) => <div className="text-center">{info.getValue()}</div>,
    size: 30,
  }),
  columnHelper.accessor("totalLesson", {
    header: () => <div className="text-center">Total Soal</div>,
    cell: (info) => <div className="text-center">{info.getValue()}</div>,
  }),
  // {
  //   id: "actions",
  //   header: "Aksi",
  //   size: 10,
  //   cell: () => {
  //     return <div>test</div>;
  //   },
  // },
];

const DeleteButton: React.FC = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="destructive">
          Hapus
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah anda yakin?</AlertDialogTitle>
          <AlertDialogDescription>
            Anda akan menghapus sub bab ini beserta seluruh pelajaran
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogPrimitive.Action
            className={buttonVariants({ variant: "ghost" })}
          >
            Yakin
          </AlertDialogPrimitive.Action>

          <AlertDialogPrimitive.Cancel
            className={buttonVariants({ variant: "default" })}
          >
            Batal
          </AlertDialogPrimitive.Cancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const SubBabPage: NextPageWithLayout = () => {
  const router = useRouter();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold">Sub Bab</h1>
        <div className="space-x-2">
          <Link
            href={{
              pathname: "/admin/sub-bab/edit",
              query: {
                subBabId: "e785559d-6c50-4e51-b2a5-0e1c9da275d4",
              },
            }}
          >
            <Button size="sm" variant="ghost">
              Edit
            </Button>
          </Link>
          <DeleteButton />
        </div>
      </div>

      <div className="mb-8 flex gap-x-3">
        <Card className="w-auto">
          <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
            <CardTitle className="text-xs font-medium">Nomor Sub Bab</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-center">1</div>
          </CardContent>
        </Card>
        <div>
          <div className="text-sm">Nama Bab</div>
          <div className="text-2xl mb-2">Kata kerja</div>

          <div className="text-sm">Nama Sub Bab</div>
          <div className="text-2xl">Kata kerja 1</div>
        </div>
      </div>

      <div className="text-xl mb-4 flex justify-between items-center">
        <h2>List Pelajaran</h2>
        <div>
          <Link
            href={{
              pathname: "/admin/lesson/tambah",
              query: { subBabId: "e785559d-6c50-4e51-b2a5-0e1c9da275d4" },
            }}
          >
            <Button size="sm">Tambah Pelajaran</Button>
          </Link>
        </div>
      </div>

      <div className="rounded-md border">
        <Table className="table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{ width: `${header.getSize()}px` }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="cursor-pointer"
                  onClick={() => {
                    router.push({
                      pathname: "/admin/lesson/[lessonId]",
                      query: { lessonId: row.original.id },
                    });
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{ width: `${cell.column.getSize()}px` }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

SubBabPage.getLayout = (page) => {
  return <AdminMainLayout>{page}</AdminMainLayout>;
};

export default SubBabPage;
