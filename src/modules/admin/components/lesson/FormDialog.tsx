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

import LessonForm, { FormSchema } from "./Form";

const LessonFormDialog: React.FC<{
  mode: "create" | "update";
  open: boolean;
  bab?: { id: string };
  subBab?: { id: string };
  lesson?: { id: string; number: number };
  setOpen: (open: boolean) => void;
}> = ({ mode, bab, subBab, lesson, open, setOpen }) => {
  const { toast } = useToast();
  const { mutateAsync: createLesson } = trpc.lesson.add.useMutation();
  const { mutateAsync: updateLesson } = trpc.lesson.update.useMutation();
  const trpcUtils = trpc.useUtils();

  const handleCreate = async (data: TypeOf<typeof FormSchema>) => {
    try {
      if (!bab?.id) throw new Error("Bab ID is missing");
      if (!subBab?.id) throw new Error("Sub Bab ID is missing");

      await createLesson({
        babId: bab?.id,
        subBabId: subBab?.id,
        ...data,
      });
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
      if (!lesson?.id) throw new Error("Sub Bab ID is missing");

      await updateLesson({
        id: lesson?.id,
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

    trpcUtils.lesson.invalidate();
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DialogContent className="max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Tambah" : "Edit"} Pelajaran
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div>
          <LessonForm
            defaultValues={lesson ? { number: lesson.number } : undefined}
            onSubmit={handleSubmit}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LessonFormDialog;
