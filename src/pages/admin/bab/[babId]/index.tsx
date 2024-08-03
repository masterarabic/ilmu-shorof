import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import React from "react";
import superjson from "superjson";

import { Button } from "@/common/components/ui/button";
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
import DeleteBabButton from "@/modules/admin/components/bab/DeleteButton";
import BabFormDialog from "@/modules/admin/components/bab/FormDialog";
import SubBabFormDialog from "@/modules/admin/components/sub-bab/FormDialog";
import AdminMainLayout from "@/modules/admin/layouts/MainLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { appRouter } from "@/server/routers/_app";
import { trpc } from "@/utils/trpc";

export type Data = {
  id: string;
  number: number;
  name: string;
  totalLesson: number;
};

const columnHelper = createColumnHelper<Data>();

const subBabListData: Data[] = [
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
    header: () => <div className="text-center">Nomor</div>,
    cell: (info) => <div className="text-center">{info.getValue()}</div>,
    size: 10,
  }),
  columnHelper.accessor("name", {
    header: "Nama Sub Bab",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("totalLesson", {
    header: () => <div className="text-center">Total Pelajaran</div>,
    size: 40,
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

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ babId: string }>
) {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {},
    transformer: superjson,
  });
  const id = context.params?.babId as string;
  /*
   * Prefetching the `post.byId` query.
   * `prefetch` does not return the result and never throws - if you need that behavior, use `fetch` instead.
   */
  await helpers.bab.list.prefetch({
    id,
  });
  return {
    props: {
      trpcState: helpers.dehydrate(),
      id,
    },
  };
}

const BabDetailPage: NextPageWithLayout<{
  id: string;
}> = ({ id }) => {
  const [babDialog, setBabDialog] = React.useState({
    open: false,
    mode: "create" as "create" | "update",
  });
  const [subBabDialog, setSubBabDialog] = React.useState({
    open: false,
    mode: "create" as "create" | "update",
  });

  const router = useRouter();

  const { data: babListResponse } = trpc.bab.list.useQuery({
    id,
  });

  const bab = babListResponse?.items?.[0];

  const table = useReactTable({
    data: subBabListData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold">Detail Bab</h1>
        <div className="space-x-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              setBabDialog({ open: true, mode: "update" });
            }}
          >
            Edit
          </Button>
          <DeleteBabButton />
        </div>
      </div>

      <div className="mb-8 flex gap-x-3">
        <Card className="w-auto">
          <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
            <CardTitle className="text-xs font-medium">Nomor Bab</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-center">{bab?.number}</div>
          </CardContent>
        </Card>
        <div className="mt-6">
          <div className="text-sm">Nama Bab</div>
          <div className="text-2xl">{bab?.name}</div>
        </div>
      </div>

      <div className="text-xl mb-4 flex justify-between items-center">
        <h2>List Sub Bab</h2>
        <div>
          <Button
            size="sm"
            onClick={() => {
              setSubBabDialog({ open: true, mode: "create" });
            }}
          >
            Tambah Sub Bab
          </Button>
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
                      pathname: "/admin/sub-bab/[subBabId]",
                      query: { subBabId: row.original.id },
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

      <BabFormDialog
        mode={babDialog.mode}
        open={babDialog.open}
        bab={bab}
        setOpen={(open) => {
          setBabDialog({ ...babDialog, open });
        }}
      />
      <SubBabFormDialog
        mode={subBabDialog.mode}
        open={subBabDialog.open}
        setOpen={(open) => {
          setSubBabDialog({ ...subBabDialog, open });
        }}
      />
    </div>
  );
};

BabDetailPage.getLayout = (page) => {
  return <AdminMainLayout>{page}</AdminMainLayout>;
};

export default BabDetailPage;
