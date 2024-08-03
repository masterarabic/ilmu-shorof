import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { useRouter } from "next/router";

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
import { useToast } from "@/common/components/ui/use-toast";
import { trpc } from "@/utils/trpc";

const DeleteBabButton: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { mutateAsync: deleteBab } = trpc.bab.delete.useMutation();
  const trpcUtils = trpc.useUtils();

  const handleDelete = async () => {
    const id = router.query.babId as string;
    try {
      if (!id) throw new Error("Bab ID is missing");
      await deleteBab({
        id,
      });
      toast({
        title: "Berhasil menghapus bab",
        description: "Bab berhasil dihapus",
      });
      await router.push("/admin/bab");
    } catch (error) {
      toast({
        title: "Gagal menghapus bab",
        description:
          "Terjadi kesalahan saat menghapus bab. Silahkan coba lagi.",
      });
      console.error(error);
    }
    trpcUtils.bab.invalidate();
  };

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
            Anda akan menghapus bab ini beserta seluruh sub bab dan pelajaran
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogPrimitive.Action
            className={buttonVariants({ variant: "ghost" })}
            onClick={handleDelete}
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

export default DeleteBabButton;
