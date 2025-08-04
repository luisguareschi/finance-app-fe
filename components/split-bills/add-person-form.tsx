import { useEffect, useState } from "react";
import { ResponsiveDrawer } from "../common/responsive-drawer";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { BillGroupDetail } from "@/api/baseAppBackendAPI.schemas";
import { useSplitBillsBillGroupMembersCreate } from "@/api/split-bills/split-bills";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { QUERYKEYS } from "@/queries/queryKeys";

interface AddPersonFormProps {
  billGroup: BillGroupDetail;
}

export const AddPersonForm = ({ billGroup }: AddPersonFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState<string>("");
  const queryClient = useQueryClient();
  const { mutate: addPerson } = useSplitBillsBillGroupMembersCreate({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERYKEYS.billGroupDetail],
        });
        toast.success("Person added successfully");
        setIsOpen(false);
      },
    },
  });

  const handleAddPerson = () => {
    addPerson({ data: { name, bill_group: billGroup.id } });
  };

  useEffect(() => {
    if (!isOpen) {
      setName("");
    }
  }, [isOpen]);

  return (
    <ResponsiveDrawer
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Add person"
      trigger={
        <Button variant="default" size="sm" onClick={() => setIsOpen(true)}>
          Add person
        </Button>
      }
    >
      <div className="flex flex-col gap-4">
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          variant="default"
          size="sm"
          className="w-full"
          disabled={!name}
          onClick={handleAddPerson}
        >
          Add
        </Button>
      </div>
    </ResponsiveDrawer>
  );
};
