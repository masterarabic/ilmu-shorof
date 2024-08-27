import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/router";
import React from "react";

import { Progress } from "@/common/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/common/components/ui/table";
import useStudentList, {
  StudentDataType,
} from "@/modules/admin/hooks/useStudentList";
import AdminMainLayout from "@/modules/admin/layouts/MainLayout";
import { NextPageWithLayout } from "@/pages/_app";

const columnHelper = createColumnHelper<StudentDataType>();

export const columns = [
  columnHelper.display({
    id: "number",
    header: () => <div className="text-center">Nomor</div>,
    cell: (info) => <div className="text-center">{info.row.index + 1}</div>,
    size: 20,
  }),
  columnHelper.accessor("name", {
    header: "Nama Siswa",
    size: 50,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("score", {
    header: () => <div className="text-center">Nilai</div>,
    size: 30,
    cell: (info) => <div className="text-center">{info.getValue()}</div>,
  }),
  columnHelper.display({
    id: "progress",
    header: () => <div className="text-center">Progress Belajar</div>,
    size: 100,
    cell: (info) => (
      <div className="flex items-center gap-x-2">
        <span className="text-xs text-muted-foreground">
          {info.row.original.myLesson}/{info.row.original.totalLesson}
        </span>
        <Progress
          value={
            (info.row.original.myLesson / info.row.original.totalLesson) * 100
          }
        />
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

const StudentPage: NextPageWithLayout = () => {
  const { studentList } = useStudentList();

  const router = useRouter();
  const table = useReactTable({
    data: studentList,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold">List Siswa</h1>
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
                      pathname: "/admin/siswa/[studentId]",
                      query: { studentId: row.original.id },
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

StudentPage.getLayout = (page) => {
  return <AdminMainLayout>{page}</AdminMainLayout>;
};

export default StudentPage;
