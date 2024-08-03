import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

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

const DeleteBabButton: React.FC = () => {
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
