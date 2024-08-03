import { Bab } from "@prisma/client";
import { TypeOf } from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/common/components/ui/dialog";
import { useToast } from "@/common/components/ui/use-toast";
import { trpc } from "@/utils/trpc";

import BabForm, { FormSchema } from "./Form";

const BabFormDialog: React.FC<{
  mode: "create" | "update";
  open: boolean;
  setOpen: (open: boolean) => void;
  bab?: Bab;
}> = ({ mode, open, setOpen, bab }) => {
  const { toast } = useToast();
  const { mutateAsync: createBab } = trpc.bab.add.useMutation();
  const { mutateAsync: updateBab } = trpc.bab.update.useMutation();
  const trpcUtils = trpc.useUtils();

  const handleCreate = async (data: TypeOf<typeof FormSchema>) => {
    try {
      await createBab(data);
      setOpen(false);
    } catch (error) {
      toast({
        title: "Gagal menambah bab",
        description: "Terjadi kesalahan saat menambah bab. Silahkan coba lagi.",
      });
      console.error(error);
    }
  };

  const handleUpdate = async (data: TypeOf<typeof FormSchema>) => {
    try {
      if (!bab?.id) throw new Error("Bab ID is missing");

      await updateBab({
        id: bab?.id,
        ...data,
      });
      setOpen(false);
    } catch (error) {
      toast({
        title: "Gagal mengubah bab",
        description: "Terjadi kesalahan saat mengubah bab. Silahkan coba lagi.",
      });
      console.error(error);
    }
  };

  const handleSubmit = async (data: TypeOf<typeof FormSchema>) => {
    if (mode === "create") {
      await handleCreate(data);
    }
    if (mode === "update") {
      await handleUpdate(data);
    }

    trpcUtils.bab.invalidate();
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DialogContent className="max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Tambah" : "Edit"} Bab</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div>
          <BabForm
            defaultValues={
              bab
                ? {
                    name: bab?.name || "",
                    number: bab?.number || 1,
                  }
                : undefined
            }
            onSubmit={handleSubmit}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BabFormDialog;
