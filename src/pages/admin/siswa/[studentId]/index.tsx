import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/common/components/ui/dialog";
import { Progress } from "@/common/components/ui/progress";
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

export type BabData = {
  id: string;
  number: number;
  name: string;
  score: number;
  progress: number;
};

const columnHelper = createColumnHelper<BabData>();

const babListData: BabData[] = [
  {
    id: "e785559d-6c50-4e51-b2a5-0e1c9da275d4",
    number: 1,
    name: "Kata kerja",
    score: 120,
    progress: 85,
  },
  {
    id: "e785559d-6c50-4e51-b2a5-0e1c9da275d4",
    number: 2,
    name: "Kata benda",
    score: 100,
    progress: 80,
  },
];

export const babColumns = [
  columnHelper.accessor("number", {
    header: () => <div className="text-center">Nomor Bab</div>,
    cell: (info) => <div className="text-center">{info.getValue()}</div>,
    size: 20,
  }),
  columnHelper.accessor("name", {
    header: "Nama Bab",
    size: 50,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("score", {
    header: () => <div className="text-center">Score Per Bab</div>,
    size: 30,
    cell: (info) => <div className="text-center">{info.getValue()}</div>,
  }),
  columnHelper.accessor("progress", {
    header: () => <div className="text-center">Progress Belajar</div>,
    size: 100,
    cell: (info) => (
      <div className="flex items-center gap-x-2">
        <span className="text-xs text-muted-foreground">
          {info.getValue()}/100
        </span>
        <Progress value={info.getValue()} />
      </div>
    ),
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

const StudentDetailPage: NextPageWithLayout = () => {
  const [open, setOpen] = React.useState(false);
  const table = useReactTable({
    data: babListData,
    columns: babColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold">Detail Siswa</h1>
      </div>

      <div className="mb-8 flex gap-x-3">
        <Card className="w-auto">
          <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
            <CardTitle className="text-xs font-medium">Total Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-center">220</div>
          </CardContent>
        </Card>
        <div className="mt-6">
          <div className="text-sm">Nama Siswa</div>
          <div className="text-2xl">Rizki Fitra Rahman</div>
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
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => setOpen(true)}
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
                  colSpan={babColumns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DetailBabDialog open={open} setOpen={setOpen} />
    </div>
  );
};

const subBabListData: BabData[] = [
  {
    id: "e785559d-6c50-4e51-b2a5-0e1c9da275d4",
    number: 1,
    name: "Kata kerja",
    score: 120,
    progress: 85,
  },
  {
    id: "e785559d-6c50-4e51-b2a5-0e1c9da275d4",
    number: 2,
    name: "Kata benda",
    score: 100,
    progress: 80,
  },
];

const subBabColumns = [
  columnHelper.accessor("number", {
    header: () => <div className="text-center">Nomor</div>,
    cell: (info) => <div className="text-center">{info.getValue()}</div>,
    size: 20,
  }),
  columnHelper.accessor("name", {
    header: "Nama Sub Bab",
    size: 45,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("score", {
    header: () => <div className="text-center">Score Per Sub Bab</div>,
    size: 35,
    cell: (info) => <div className="text-center">{info.getValue()}</div>,
  }),
  columnHelper.accessor("progress", {
    header: () => <div className="text-center">Progress Belajar</div>,
    size: 100,
    cell: (info) => (
      <div className="flex items-center gap-x-2">
        <span className="text-xs text-muted-foreground">
          {info.getValue()}/100
        </span>
        <Progress value={info.getValue()} />
      </div>
    ),
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

const DetailBabDialog: React.FC<{
  open: boolean;
  setOpen: (open: boolean) => void;
}> = ({ open, setOpen }) => {
  const table = useReactTable({
    data: subBabListData,
    columns: subBabColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DialogContent className="max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>Detail Bab</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
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
                    <TableRow key={row.id}>
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
                      colSpan={babColumns.length}
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
      </DialogContent>
    </Dialog>
  );
};

StudentDetailPage.getLayout = (page) => {
  return <AdminMainLayout>{page}</AdminMainLayout>;
};

export default StudentDetailPage;
