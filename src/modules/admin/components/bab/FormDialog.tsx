import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/common/components/ui/dialog";

import BabForm from "./Form";

const BabFormDialog: React.FC<{
  mode: "create" | "update";
  open: boolean;
  setOpen: (open: boolean) => void;
}> = ({ mode, open, setOpen }) => {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DialogContent className="max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Tambah" : "Edit"} Bab</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div>
          <BabForm onSubmit={() => {}} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BabFormDialog;
