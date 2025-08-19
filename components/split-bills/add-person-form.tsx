import { useEffect, useState } from "react";
import { ResponsiveDrawer } from "../common/responsive-drawer";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { BillGroupDetail } from "@/api/baseAppBackendAPI.schemas";
import { useSplitBillsBillGroupMembersCreate } from "@/api/split-bills/split-bills";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { QUERYKEYS } from "@/queries/queryKeys";
import Spinner from "../common/spinner";

interface AddPersonFormProps {
  billGroup: BillGroupDetail;
}

export const AddPersonForm = ({ billGroup }: AddPersonFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState<string>("");
  const queryClient = useQueryClient();
  const { mutate: addPerson, isPending: isAddingPerson } =
    useSplitBillsBillGroupMembersCreate({
      mutation: {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [QUERYKEYS.billGroupsList],
          });
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
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleAddPerson();
        }}
      >
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          variant="default"
          size="sm"
          className="w-full"
          disabled={!name || isAddingPerson}
          type="submit"
        >
          {isAddingPerson ? <Spinner /> : "Add"}
        </Button>
      </form>
    </ResponsiveDrawer>
  );
};
