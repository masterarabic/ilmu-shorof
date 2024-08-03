import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/common/components/ui/dialog";

import SubBabForm from "./Form";

const SubBabFormDialog: React.FC<{
  mode: "create" | "update";
  open: boolean;
  setOpen: (open: boolean) => void;
}> = ({ mode, open, setOpen }) => {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DialogContent className="max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Tambah" : "Edit"} Sub Bab
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div>
          <SubBabForm onSubmit={() => {}} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubBabFormDialog;
